import {lazy, Suspense, useState, type CSSProperties} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Layout, LayoutContent} from '@astryxdesign/core/Layout';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Center} from '@astryxdesign/core/Center';
import {Section} from '@astryxdesign/core/Section';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {Divider} from '@astryxdesign/core/Divider';
import {Link} from '@astryxdesign/core/Link';
import {Token} from '@astryxdesign/core/Token';
import {List, ListItem} from '@astryxdesign/core/List';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {Theme} from '@astryxdesign/core/theme';
import {
  ArrowRightIcon,
  CheckIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
} from '@heroicons/react/20/solid';
import {themes, defaultThemeSlug} from '../astryx-themes';
import {ADDONS, DROPOFF, EMAIL, PHONE_DISPLAY, PHONE_HREF, TIERS} from '../content';

const QuoteForm = lazy(() => import('../QuoteForm'));

const theme = themes[defaultThemeSlug];

// The badge logo is used exactly as supplied; only its gentle bob is applied here.
const badge: CSSProperties = {
  width: '100%',
  maxWidth: 340,
  height: 'auto',
  display: 'block',
  animation: 'nvd-bob 6s ease-in-out infinite',
};

const HERO_POINTS = ['We come to you', 'No deposit', 'Alachua & surrounding counties'];

export default function Option2() {
  const featured = TIERS.find(t => t.isFeatured) ?? TIERS[0];
  const [tierName, setTierName] = useState(featured.name);
  const [presetService, setPresetService] = useState<string | undefined>();
  const tier = TIERS.find(t => t.name === tierName) ?? featured;

  return (
    <AppShell
      height="auto"
      variant="wash"
      topNav={
        <TopNav
          label="Main navigation"
          heading={
            <TopNavHeading
              heading="UpShine Detailing"
              subheading="CLEAN · CORRECT · PROTECT"
              headingHref="#top"
            />
          }
          centerContent={
            <>
              <TopNavItem label="Services" href="#a-services" />
              <TopNavItem label="Add-ons" href="#a-addons" />
              <TopNavItem label="Service area" href="#a-area" />
            </>
          }
          endContent={<Button label="Request a quote" variant="primary" href="#a-book" />}
        />
      }>
      <VStack gap={0}>
        {/* HERO — full-bleed navy band */}
        <Theme theme={theme} mode="dark">
          <Section variant="muted" padding={10} id="top">
            <VStack gap={6} hAlign="center">
              <img
                style={badge}
                src="/assets/UpShineBadge.png"
                alt="UpShine Detailing — clean, correct, protect badge logo"
              />
              <VStack gap={3} hAlign="center" maxWidth={720}>
                <Heading level={1} type="display-1" justify="center" textWrap="balance">
                  We bring the shine to your driveway.
                </Heading>
                <Text type="large" color="secondary" justify="center" textWrap="balance">
                  Mobile auto detailing serving Alachua and surrounding counties.
                </Text>
              </VStack>
              <HStack gap={3} wrap="wrap" justify="center">
                <Button
                  label="Request a quote"
                  variant="primary"
                  size="lg"
                  href="#a-book"
                  endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
                />
                <Button label="See packages" variant="secondary" size="lg" href="#a-services" />
              </HStack>
              <HStack gap={2} wrap="wrap" justify="center">
                {HERO_POINTS.map(point => (
                  <Token key={point} label={point} color="blue" />
                ))}
              </HStack>
            </VStack>
          </Section>
        </Theme>

        <Layout
          height="auto"
          contentWidth={1120}
          content={
            <LayoutContent padding={6} isScrollable={false}>
              <VStack gap={10} paddingBlock={6}>
                {/* PRICING — one package at a time */}
                <VStack gap={5} id="a-services">
                  <VStack gap={4} hAlign="center">
                    <Heading level={2} justify="center">
                      Pricing
                    </Heading>
                    <SegmentedControl
                      label="Package"
                      size="lg"
                      value={tier.name}
                      onChange={setTierName}>
                      {TIERS.map(t => (
                        <SegmentedControlItem key={t.name} value={t.name} label={t.short} />
                      ))}
                    </SegmentedControl>
                  </VStack>
                  <Card padding={8} elevation="med">
                    <Grid columns={{minWidth: 280, max: 2}} gap={8} align="center">
                      <VStack gap={5}>
                        <VStack gap={2} hAlign="start">
                          {tier.isFeatured && <Token label="Most popular" color="orange" size="sm" />}
                          <Heading level={3} type="display-3">
                            {tier.name}
                          </Heading>
                          <Text type="large" color="secondary">
                            {tier.blurb}
                          </Text>
                        </VStack>
                        <VStack gap={1}>
                          <Text type="supporting">{tier.priceLabel}</Text>
                          <Text type="display-1" color="accent" hasTabularNumbers>
                            {tier.price}
                          </Text>
                        </VStack>
                        <HStack>
                          <Button
                            label="Request a quote"
                            variant="primary"
                            size="lg"
                            href="#a-book"
                            onClick={() => setPresetService(tier.name)}
                            endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
                          />
                        </HStack>
                      </VStack>
                      <Card variant="muted" padding={6}>
                        <List
                          edge="flush"
                          header={
                            <Text type="supporting" weight="semibold">
                              {tier.lead ?? 'Includes'}
                            </Text>
                          }>
                          {tier.includes.map(line => (
                            <ListItem
                              key={line.label}
                              label={<Text>{line.label}</Text>}
                              description={line.note && <Text type="supporting">{line.note}</Text>}
                              startContent={<Icon icon={CheckIcon} size="sm" color="accent" />}
                            />
                          ))}
                        </List>
                      </Card>
                    </Grid>
                  </Card>
                  <Text type="supporting" justify="center" display="block">
                    *Set by package and vehicle size. We'll confirm your exact quote.
                  </Text>
                </VStack>

                {/* ADD-ONS — tile grid */}
                <VStack gap={5} id="a-addons">
                  <VStack gap={2}>
                    <Heading level={2}>Add-ons</Heading>
                    <Text color="secondary">
                      Let us know if special attention is needed in these areas:
                    </Text>
                  </VStack>
                  <Grid columns={{minWidth: 150, max: 4}} gap={4}>
                    {ADDONS.map(addon => (
                      <Card key={addon.label} variant="muted" padding={5} height="100%">
                        <VStack gap={1}>
                          <Text type="label">{addon.label}</Text>
                          <Text type="supporting">{addon.description}</Text>
                        </VStack>
                      </Card>
                    ))}
                  </Grid>
                </VStack>

                <Divider />

                {/* QUOTE REQUEST — contact details beside the form */}
                <Grid columns={{minWidth: 320, max: 2}} gap={8} align="start" id="a-book">
                  <VStack gap={5} id="a-area">
                    <VStack gap={2}>
                      <Heading level={2} type="display-3">
                        Request a quote
                      </Heading>
                      <Text type="large" color="secondary">
                        No deposit. Tell us about the car and we'll text you a quote.
                      </Text>
                    </VStack>
                    <List hasDividers edge="flush">
                      <ListItem
                        label={PHONE_DISPLAY}
                        description="Call or text"
                        href={PHONE_HREF}
                        startContent={<Icon icon={PhoneIcon} color="accent" />}
                      />
                      <ListItem
                        label={EMAIL}
                        description="Email"
                        href={`mailto:${EMAIL}`}
                        startContent={<Icon icon={EnvelopeIcon} color="accent" />}
                      />
                      <ListItem
                        label={<Text>Alachua and surrounding counties</Text>}
                        description={
                          <Text type="supporting">
                            Service area — home, office, anywhere with a bit of room to work
                          </Text>
                        }
                        startContent={<Icon icon={TruckIcon} color="accent" />}
                      />
                      <ListItem
                        label={<Text>{DROPOFF.full}</Text>}
                        description={
                          <Text type="supporting">
                            Rather drop it off? Just put “drop-off” in the address box.
                          </Text>
                        }
                        href={DROPOFF.mapsHref}
                        target="_blank"
                        startContent={<Icon icon={MapPinIcon} color="accent" />}
                      />
                    </List>
                  </VStack>
                  <Card padding={6} elevation="med">
                    <Suspense fallback={<Skeleton height={480} />}>
                      <QuoteForm frameId="a-sunny" presetService={presetService} />
                    </Suspense>
                  </Card>
                </Grid>
              </VStack>
            </LayoutContent>
          }
        />

        {/* FOOTER — slim navy strip */}
        <Theme theme={theme} mode="dark">
          <Section variant="muted" padding={6}>
            <Center axis="horizontal">
              <VStack gap={3} width="100%" maxWidth={1120}>
                <HStack justify="between" align="center" wrap="wrap" gap={4}>
                  <Heading level={3}>UpShine Detailing</Heading>
                  <HStack gap={5} wrap="wrap">
                    <Link href={PHONE_HREF} color="primary">
                      {PHONE_DISPLAY}
                    </Link>
                    <Link href={`mailto:${EMAIL}`} color="primary">
                      {EMAIL}
                    </Link>
                    <Link href={DROPOFF.mapsHref} target="_blank" color="primary">
                      {DROPOFF.line1}, {DROPOFF.line2}
                    </Link>
                  </HStack>
                </HStack>
                <Divider />
                <Text type="supporting">
                  © 2026 UpShine Detailing · Clean · Correct · Protect. UpShine Detailing is a DBA
                  of Elevated Vector Automation LLC.
                </Text>
              </VStack>
            </Center>
          </Section>
        </Theme>
      </VStack>
    </AppShell>
  );
}
