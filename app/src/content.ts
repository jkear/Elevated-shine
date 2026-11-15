// All site copy and option lists live here so wording changes never touch layout.

export const PHONE_DISPLAY = '(352) 271-2888';
export const PHONE_HREF = 'tel:+13522712888';
export const EMAIL = 'jordan@upshinedetail.com';

export type Tier = {
  name: string;
  blurb: string;
  lead?: string;
  includes: {label: string; note?: string}[];
  priceLabel: string;
  price: string;
  isFeatured?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: 'Interior Detail',
    blurb: 'Inside only, done properly — shampooed, steamed and sanitized.',
    includes: [
      {label: 'Full vacuum — seats, carpets & trunk'},
      {label: 'Seats & carpets shampooed and steam cleaned'},
      {label: 'Dash, console, vents & door panels'},
      {label: 'Floor mats shampooed'},
      {label: 'Leather & vinyl conditioned'},
      {label: 'Door jambs cleaned'},
      {label: 'Interior windows'},
    ],
    priceLabel: 'Starting at',
    price: '$189*',
  },
  {
    name: 'UpShine Deluxe Detail',
    blurb: 'The full job — deep-cleaned inside, protected and shining outside.',
    lead: 'Everything in Interior Detail, plus:',
    includes: [
      {label: 'Hand wash & dry'},
      {label: 'Exterior windows'},
      {label: 'Machine wax (1–3 mo protection)'},
      {label: 'Bug removal'},
      {label: 'UV trim & plastic protection'},
      {label: 'Wheel deep-clean & polish'},
      {label: 'Tires cleaned & dressed'},
    ],
    priceLabel: 'Starting at',
    price: '$275*',
    isFeatured: true,
  },
  {
    name: 'Premium Care Service',
    blurb:
      "A monthly membership that keeps your car detailed year-round — and covers life's little accidents.",
    includes: [
      {label: 'One full detail every month'},
      {
        label: 'One Emergency UpShine call per month',
        note: 'Buff a scuff, undo a spill — we come to you',
      },
    ],
    priceLabel: 'Membership',
    price: '$200/mo',
  },
];

export const ADDONS: {label: string; description: string}[] = [
  {label: 'Pet hair removal', description: 'Thorough extraction from seats & carpet'},
  {label: 'Headlight restoration', description: 'Both lenses, polished & sealed'},
  {
    label: 'Vinyl & leather repair',
    description: 'Tears, cracks & scuffs · one spot or a whole van full of seats',
  },
  {label: 'Ozone / odour treatment', description: 'Eliminates smoke, mildew & pet odour'},
  {label: 'Engine bay detail', description: 'Degreased, rinsed & dressed'},
  {label: 'Clay bar treatment', description: 'Lifts bonded contaminants from paint'},
  {label: 'Machine wax', description: 'Hand-finished shine, 1–3 months of protection'},
  {label: 'Ceramic coating', description: 'Multi-year protection · includes polish prep'},
];

// Values inserted into bookings.service — must match the tier names exactly.
export const PACKAGES = ['Interior Detail', 'UpShine Deluxe Detail', 'Premium Care Service'];

// Optional add-on checkboxes on the quote form; the label is what gets stored in bookings.addons.
export const FORM_ADDONS = ADDONS.map(a => a.label);

export const DROPOFF = {
  line1: '1801 NE 23rd Ave, B-9',
  line2: 'Gainesville, FL 32609',
  full: '1801 NE 23rd Ave, Unit B-9, Gainesville, FL 32609',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=1801+NE+23rd+Ave+B-9+Gainesville+FL+32609',
};
