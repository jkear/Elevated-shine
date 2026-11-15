import {lazy, Suspense, type CSSProperties} from 'react';
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
import {Item} from '@astryxdesign/core/Item';
import {List, ListItem} from '@astryxdesign/core/List';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {Theme} from '@astryxdesign/core/theme';
import {
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SwatchIcon,
} from '@heroicons/react/20/solid';
import {themes, defaultThemeSlug} from '../astryx-themes';
import {ADDONS, DROPOFF, EMAIL, PHONE_DISPLAY, PHONE_HREF, TIERS, type Tier} from '../content';
import {Skeleton} from '@astryxdesign/core/Skeleton';

// The form carries the heaviest controls (date picker, selectors); load it after first paint.
const QuoteForm = lazy(() => import('../QuoteForm'));

const theme = themes[defaultThemeSlug];

const TIER_ICONS = [SparklesIcon, SwatchIcon, ShieldCheckIcon];

// The badge logo is used exactly as supplied; only its gentle bob is applied here.
const badge: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  height: 'auto',
  display: 'block',
  animation: 'nvd-bob 6s ease-in-out infinite',
};

function TierCard({tier, index}: {tier: Tier; index: number}) {
  return (
    <Card padding={6} height="100%" elevation={tier.isFeatured ? 'high' : 'low'}>
      <VStack gap={5} height="100%" justify="between">
        <VStack gap={4}>
          <HStack justify="between" align="start">
            <Card variant="blue" padding={3}>
              <Icon icon={TIER_ICONS[index]} size="lg" color="accent" />
            </Card>
            {tier.isFeatured && <Token label="Most popular" color="orange" size="sm" />}
          </HStack>
          <VStack gap={1}>
            <Heading level={3}>{tier.name}</Heading>
            <Text color="secondary">{tier.blurb}</Text>
          </VStack>
          <List
            density="compact"
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
        </VStack>
        <VStack gap={4}>
          <Divider />
          <VStack gap={1} hAlign="center">
            <Text type="supporting">{tier.priceLabel}</Text>
            <Text type="display-3" color={tier.isFeatured ? 'primary' : 'accent'} hasTabularNumbers>
              {tier.price}
            </Text>
          </VStack>
          <Button
            label="Request a quote"
            href="#a-book"
            variant={tier.isFeatured ? 'primary' : 'secondary'}
            width="100%"
          />
        </VStack>
      </VStack>
    </Card>
  );
}

export default function Option1() {
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
          startContent={
            <>
              <TopNavItem label="Services" href="#a-services" />
              <TopNavItem label="Add-ons" href="#a-addons" />
              <TopNavItem label="Service area" href="#a-area" />
            </>
          }
          endContent={<Button label="Request a quote" variant="primary" href="#a-book" />}
        />
      }>
      <VStack gap={8}>
      <Layout
        height="auto"
        contentWidth={1120}
      content={
        <LayoutContent padding={6} isScrollable={false}>
          <VStack gap={10}>
            {/* HERO */}
            <Card variant="muted" padding={8} id="top">
              <Grid columns={{minWidth: 300, max: 2}} gap={8} align="center">
                <VStack gap={6}>
                  <VStack gap={3}>
                    <Heading level={1} type="display-1" textWrap="balance">
                      We bring the shine to your driveway.
                    </Heading>
                    <Text type="large" color="secondary">
                      Mobile auto detailing serving Alachua and surrounding counties.
                    </Text>
                  </VStack>
                  <HStack gap={3} wrap="wrap">
                    <Button
                      label="Request a quote"
                      variant="primary"
                      size="lg"
                      href="#a-book"
                      endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
                    />
                    <Button label="See packages" variant="secondary" size="lg" href="#a-services" />
                  </HStack>
                </VStack>
                <Center>
                  <img
                    style={badge}
                    src="/assets/UpShineBadge.png"
                    alt="UpShine Detailing — clean, correct, protect badge logo"
                  />
                </Center>
              </Grid>
            </Card>

            {/* PRICING */}
            <VStack gap={6} id="a-services">
                <Heading level={2} justify="center">
                  Pricing
                </Heading>
                <Grid columns={{minWidth: 280, max: 3}} gap={5}>
                  {TIERS.map((tier, i) =>
                    tier.isFeatured ? (
                      <Theme key={tier.name} theme={theme} mode="dark">
                        <TierCard tier={tier} index={i} />
                      </Theme>
                    ) : (
                      <TierCard key={tier.name} tier={tier} index={i} />
                    ),
                  )}
                </Grid>
                <Text type="supporting" justify="center" display="block">
                  *Set by package and vehicle size. We'll confirm your exact quote.
                </Text>
            </VStack>

            {/* ADD-ONS */}
            <Card variant="muted" padding={8} id="a-addons">
              <VStack gap={5}>
                <VStack gap={2}>
                  <Heading level={2}>Add-ons</Heading>
                  <Text color="secondary">
                    Let us know if special attention is needed in these areas:
                  </Text>
                </VStack>
                <Card padding={4}>
                  <Grid columns={{minWidth: 280, max: 2}} columnGap={6} rowGap={1}>
                    {ADDONS.map(addon => (
                      <Item
                        key={addon.label}
                        label={addon.label}
                        description={addon.description}
                        descriptionLines={3}
                        startContent={<Icon icon={PlusIcon} size="sm" color="accent" />}
                      />
                    ))}
                  </Grid>
                </Card>
              </VStack>
            </Card>

            {/* SERVICE AREA */}
            <VStack gap={2} hAlign="center" id="a-area">
                <Heading level={2} justify="center">
                  Service area
                </Heading>
                <Text color="secondary" justify="center" textWrap="balance">
                  Home, office, anywhere with a bit of room to work. Serving Alachua and
                  surrounding counties.
                </Text>
                <Text color="secondary" justify="center">
                  Rather drop it off? Leave your car with us at{' '}
                  <Link href={DROPOFF.mapsHref} target="_blank" hasUnderline>
                    {DROPOFF.full}
                  </Link>
                  . Just put “drop-off” in the address box when you request a quote.
                </Text>
            </VStack>

            {/* QUOTE REQUEST */}
            <Center axis="horizontal" id="a-book">
                <Card padding={8} elevation="med" width="100%" maxWidth={820}>
                  <VStack gap={6}>
                    <VStack gap={1}>
                      <Heading level={2}>Request a quote</Heading>
                      <Text color="secondary">
                        No deposit. Tell us about the car and we'll text you a quote.
                      </Text>
                    </VStack>
                    <Suspense fallback={<Skeleton height={480} />}>
                      <QuoteForm frameId="a-sunny" />
                    </Suspense>
                  </VStack>
                </Card>
            </Center>
          </VStack>
        </LayoutContent>
      }
      />
      <Theme theme={theme} mode="dark">
        <Section variant="muted" padding={8}>
          <Center axis="horizontal">
            <VStack gap={6} width="100%" maxWidth={1120}>
              <Grid columns={{minWidth: 200, max: 4}} gap={6}>
                <VStack gap={2}>
                  <Heading level={3}>UpShine Detailing</Heading>
                  <Text color="secondary">
                    Mobile detailing done with care. We bring the shine to your driveway.
                  </Text>
                </VStack>
                <VStack gap={2}>
                  <Text type="supporting" weight="semibold">
                    Get in touch
                  </Text>
                  <Link href={PHONE_HREF} color="primary">
                    {PHONE_DISPLAY}
                  </Link>
                  <Link href={`mailto:${EMAIL}`} color="primary">
                    {EMAIL}
                  </Link>
                </VStack>
                <VStack gap={2}>
                  <Text type="supporting" weight="semibold">
                    Service area
                  </Text>
                  <Text>Alachua &amp; surrounding counties</Text>
                </VStack>
                <VStack gap={2}>
                  <Text type="supporting" weight="semibold">
                    Drop-off
                  </Text>
                  <Link href={DROPOFF.mapsHref} target="_blank" color="primary">
                    {DROPOFF.line1}
                  </Link>
                  <Text>{DROPOFF.line2}</Text>
                </VStack>
              </Grid>
              <Divider />
              <Text type="supporting">
                © 2026 UpShine Detailing · Clean · Correct · Protect. UpShine Detailing is a DBA of
                Elevated Vector Automation LLC.
              </Text>
            </VStack>
          </Center>
        </Section>
      </Theme>
      </VStack>
    </AppShell>
  );
}
