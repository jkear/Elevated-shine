import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid, GridSpan} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {Divider} from '@astryxdesign/core/Divider';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {DateInput} from '@astryxdesign/core/DateInput';
import type {ComponentProps} from 'react';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {insertBooking} from './supabase';
import {FORM_ADDONS, PACKAGES} from './content';
import mascotSvg from './assets/mascot-confirmed.svg?raw';

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  timePref: string;
  vehicle: string;
  notes: string;
  addons: string[];
};
type ISODate = NonNullable<ComponentProps<typeof DateInput>['value']>;
type Errors = Partial<Record<keyof Data, string>>;

const NO_TIME_PREF = 'none';

const blankData = (): Data => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  service: '',
  date: '',
  timePref: NO_TIME_PREF,
  vehicle: '',
  notes: '',
  addons: [],
});

function today(): ISODate {
  const t = new Date();
  t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  return t.toISOString().slice(0, 10) as ISODate;
}

function validate(d: Data): Errors {
  const e: Errors = {};
  if (!d.firstName.trim()) e.firstName = 'First name, please.';
  if (!d.lastName.trim()) e.lastName = 'Last name, please.';
  if (!d.email.trim()) e.email = 'We need an email to confirm.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) e.email = 'That email looks off.';
  if (!d.phone.trim()) e.phone = 'A phone lets us text you.';
  else if (d.phone.replace(/\D/g, '').length < 10) e.phone = 'Add a full phone number.';
  if (!d.address.trim()) e.address = 'Where should we come? An address or neighborhood works.';
  if (!d.service) e.service = 'Choose a package.';
  if (!d.vehicle.trim()) e.vehicle = 'What do you drive? Make & model, please.';
  if (!d.date) e.date = 'Pick a day.';
  else if (d.date < today()) e.date = 'Choose a future date.';
  return e;
}

const err = (message?: string) => (message ? ({type: 'error', message} as const) : undefined);

export default function QuoteForm({frameId}: {frameId: string}) {
  const [data, setData] = useState<Data>(blankData);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<Data | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof Data>(field: K, value: Data[K]) => {
    setData(d => ({...d, [field]: value}));
    setErrors(e => ({...e, [field]: undefined}));
  };

  const submit = async () => {
    const e = validate(data);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitError(null);
    const timePref = data.timePref === NO_TIME_PREF ? '' : data.timePref;
    // Same order as the list on screen, regardless of the order they were ticked.
    const addons = FORM_ADDONS.filter(a => data.addons.includes(a));
    // Record the quote request (the insert fires the owner notification email).
    const error = await insertBooking({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      service: data.service,
      addons: addons.length ? addons : null,
      vehicle: data.vehicle,
      date: data.date,
      time_slot: timePref || null,
      notes: data.notes || null,
      mode: 'guest',
      user_id: null,
      frame_id: frameId || null,
    });
    if (error) {
      setSubmitError(error);
      return;
    }
    setConfirmed({...data, timePref});
    // The confirmation is much shorter than the form; bring it back into view.
    document.getElementById('a-book')?.scrollIntoView({block: 'start'});
  };

  const reset = () => {
    setData(blankData());
    setErrors({});
    setConfirmed(null);
    setSubmitError(null);
  };

  if (confirmed) {
    return (
      <VStack gap={5} hAlign="center">
        {/* Mascot artwork, carried over byte-for-byte from the original site. */}
        <figure
          style={{margin: 0, width: '100%'}}
          dangerouslySetInnerHTML={{__html: mascotSvg}}
        />
        <VStack gap={2} hAlign="center">
          <Heading level={3} justify="center">
            Quote request sent!
          </Heading>
          <Text color="secondary" justify="center" textWrap="balance">
            Thanks, {confirmed.firstName}. We'll text you with your quote and to confirm a time —
            usually within the hour. Your preferred time isn't reserved until we confirm.
          </Text>
        </VStack>
        <Card variant="muted" width="100%" maxWidth={420}>
          <VStack gap={3}>
            <HStack justify="between" gap={4}>
              <Text type="supporting">Package</Text>
              <Text type="label" justify="end">
                {confirmed.service}
              </Text>
            </HStack>
            <Divider />
            <HStack justify="between" gap={4}>
              <Text type="supporting">Preferred day</Text>
              <Text type="label" hasTabularNumbers justify="end">
                {confirmed.date}
                {confirmed.timePref ? ` · ${confirmed.timePref}` : ''}
              </Text>
            </HStack>
          </VStack>
        </Card>
        <Button label="Request another quote" variant="ghost" onClick={reset} />
      </VStack>
    );
  }

  return (
    <VStack gap={6}>
      <Grid columns={{minWidth: 240, max: 2}} gap={4} align="end">
        <TextInput
          label="First name"
          placeholder="Jamie"
          value={data.firstName}
          onChange={v => set('firstName', v)}
          status={err(errors.firstName)}
        />
        <TextInput
          label="Last name"
          placeholder="Rivera"
          value={data.lastName}
          onChange={v => set('lastName', v)}
          status={err(errors.lastName)}
        />
        <TextInput
          label="Phone"
          type="tel"
          placeholder="(352) 271-2888"
          value={data.phone}
          onChange={v => set('phone', v)}
          status={err(errors.phone)}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={data.email}
          onChange={v => set('email', v)}
          status={err(errors.email)}
        />
        <GridSpan columns="full">
          <TextInput
            label="Where's the car?"
            description="Address or neighborhood & city"
            placeholder="123 NW 5th Ave, Gainesville"
            value={data.address}
            onChange={v => set('address', v)}
            status={err(errors.address)}
          />
        </GridSpan>
        <GridSpan columns="full">
          <Selector
            label="Which package?"
            placeholder="Pick a package…"
            options={PACKAGES}
            value={data.service}
            onChange={v => set('service', v)}
            status={err(errors.service)}
          />
        </GridSpan>
        <TextInput
          label="Vehicle"
          description="Make & model"
          placeholder="2021 Lexus RX"
          value={data.vehicle}
          onChange={v => set('vehicle', v)}
          status={err(errors.vehicle)}
        />
        <DateInput
          label="Preferred day"
                    min={today()}
          value={(data.date || undefined) as ISODate | undefined}
          onChange={v => set('date', v ?? '')}
          status={err(errors.date)}
        />
        <GridSpan columns="full">
          <Selector
            label="Preferred time of day"
            options={[
              {label: 'No preference', value: NO_TIME_PREF},
              {label: 'Morning', value: 'Morning'},
              {label: 'Evening', value: 'Evening'},
            ]}
            value={data.timePref}
            onChange={v => set('timePref', v)}
          />
        </GridSpan>
        <GridSpan columns="full">
          <Text type="supporting">
            Your preferred day and time help us plan — they aren't a confirmed appointment. We'll
            text you to lock in a time that works.
          </Text>
        </GridSpan>
      </Grid>

      <CheckboxList
        label="Add-ons"
        isOptional
        density="compact"
        value={data.addons}
        onChange={v => set('addons', v)}>
        {FORM_ADDONS.map(a => (
          <CheckboxListItem key={a} value={a} label={a} />
        ))}
      </CheckboxList>

      <TextArea
        label="Anything we should know?"
        isOptional
        rows={2}
        placeholder="Pet hair in the back, a coffee spill on the console — tell us."
        value={data.notes}
        onChange={v => set('notes', v)}
      />

      <VStack gap={3}>
        <Button
          label="Request my quote"
          variant="primary"
          size="lg"
          width="100%"
          clickAction={submit}
        />
        {submitError && <Banner status="error" title={submitError} />}
      </VStack>
    </VStack>
  );
}
