// City landing page data — drives src/pages/locations/[city].astro
// Each entry generates a dedicated, SEO-optimized local page.

export interface City {
  slug: string;
  name: string; // "Los Angeles"
  region: string; // "CA"
  fullName: string; // "Los Angeles, CA"
  metroName: string; // "the Greater Los Angeles area"
  intro: string; // unique 2-3 sentence local intro
  marketNote: string; // unique paragraph about local building stock / market
  neighborhoods: string[]; // nearby areas served, for local relevance
  landmarksContext: string; // sentence referencing local building types
}

export const CITIES: City[] = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    region: 'CA',
    fullName: 'Los Angeles, CA',
    metroName: 'the Greater Los Angeles area',
    intro:
      'From Downtown high-rises to Westside tenant improvements, we deliver survey-grade 3D laser scanning and as-built drawings across Los Angeles County. Whether you are renovating a Mid-City medical office or documenting a historic Art Deco facade, we capture existing conditions accurately the first time.',
    marketNote:
      'Los Angeles has one of the most varied building stocks in the country — pre-war masonry, mid-century commercial, and dense modern infill sitting side by side. Original drawings are often missing or decades out of date after successive tenant fit-outs. Accurate as-builts are essential before any renovation, seismic retrofit, or lease documentation in this market.',
    neighborhoods: ['Downtown LA', 'Hollywood', 'Santa Monica', 'Pasadena', 'Long Beach', 'the San Fernando Valley'],
    landmarksContext:
      'We regularly scan office buildings, medical facilities, restaurants, retail spaces, and multifamily residential across the LA basin.',
  },
  {
    slug: 'orange-county',
    name: 'Orange County',
    region: 'CA',
    fullName: 'Orange County, CA',
    metroName: 'Orange County',
    intro:
      'We provide 3D laser scanning and as-built documentation throughout Orange County — from Irvine corporate campuses to coastal Newport Beach estates. Fast turnaround, in-house processing, and deliverables ready for your design team.',
    marketNote:
      'Orange County pairs master-planned commercial development with high-value coastal residential. Both demand precise existing-conditions documentation: tenant improvements in Irvine and Costa Mesa office parks, and renovation-driven scans of luxury homes in Newport, Laguna, and the Nellie Gail area. We handle both with the same survey-grade accuracy.',
    neighborhoods: ['Irvine', 'Anaheim', 'Santa Ana', 'Costa Mesa', 'Newport Beach', 'Laguna Hills'],
    landmarksContext:
      'Our recent Orange County work spans outpatient clinics, industrial flex space, and multi-room custom residences.',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    region: 'CA',
    fullName: 'San Diego, CA',
    metroName: 'the San Diego metro',
    intro:
      'Survey-grade 3D scanning and as-built drawings across San Diego County — from Downtown mixed-use towers to biotech and life-science facilities in the Torrey Pines corridor. We document existing conditions your architects and GCs can build from immediately.',
    marketNote:
      "San Diego's building market is driven by life-science, defense, and hospitality construction, alongside steady residential renovation. Life-science tenant improvements in particular demand tight MEP coordination — which starts with an accurate existing-conditions scan. We deliver point clouds and Revit models that hold up to clash detection.",
    neighborhoods: ['Downtown San Diego', 'La Jolla', 'Carlsbad', 'Chula Vista', 'Escondido', 'Sorrento Valley'],
    landmarksContext:
      'We scan lab and cleanroom spaces, hospitality interiors, commercial offices, and coastal residential throughout the county.',
  },
  {
    slug: 'san-francisco-bay-area',
    name: 'San Francisco Bay Area',
    region: 'CA',
    fullName: 'San Francisco Bay Area, CA',
    metroName: 'the San Francisco Bay Area',
    intro:
      'We deliver 3D laser scanning and as-built documentation across the Bay Area — San Francisco, the Peninsula, the East Bay, and Silicon Valley. Tech tenant improvements, historic renovations, and seismic retrofits all start with accurate existing conditions.',
    marketNote:
      "The Bay Area combines aggressive tech-driven office reconfiguration with one of the oldest and most seismically regulated building stocks on the West Coast. Soft-story retrofits, historic renovations, and rapid tenant improvements all require precise as-builts. We provide the point clouds and models that make that work go smoothly.",
    neighborhoods: ['San Francisco', 'Oakland', 'San Jose', 'Palo Alto', 'Berkeley', 'the Peninsula'],
    landmarksContext:
      'Our Bay Area scanning covers office towers, tech campuses, historic masonry, and multifamily residential.',
  },
  {
    slug: 'sacramento',
    name: 'Sacramento',
    region: 'CA',
    fullName: 'Sacramento, CA',
    metroName: 'the Sacramento region',
    intro:
      'Survey-grade 3D scanning and as-built drawings across the Sacramento region — government facilities, healthcare, and steady commercial and residential renovation throughout the Central Valley capital.',
    marketNote:
      "As California's capital, Sacramento has a large inventory of government and institutional buildings alongside fast-growing suburban commercial development. Public-works projects here carry prevailing-wage and documentation requirements that make accurate, defensible as-builts especially valuable.",
    neighborhoods: ['Downtown Sacramento', 'Roseville', 'Folsom', 'Elk Grove', 'Davis', 'Rancho Cordova'],
    landmarksContext:
      'We document institutional buildings, healthcare facilities, offices, and residential renovations across the region.',
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    region: 'AZ',
    fullName: 'Phoenix, AZ',
    metroName: 'the Phoenix metro',
    intro:
      'We bring survey-grade 3D laser scanning and as-built documentation to the Phoenix metro — one of the fastest-growing construction markets in the country. Industrial, commercial, and residential existing-conditions capture with fast turnaround.',
    marketNote:
      "Phoenix is in the middle of a construction boom — massive industrial and data-center development, rapid commercial growth, and heavy residential expansion across the Valley of the Sun. Adaptive reuse and tenant improvements on older stock are just as common. All of it benefits from precise as-built documentation before design begins.",
    neighborhoods: ['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert'],
    landmarksContext:
      'We scan industrial and warehouse facilities, commercial offices, retail, and residential across the Valley.',
  },
  {
    slug: 'las-vegas',
    name: 'Las Vegas',
    region: 'NV',
    fullName: 'Las Vegas, NV',
    metroName: 'the Las Vegas valley',
    intro:
      'Survey-grade 3D scanning and as-built drawings across Las Vegas — hospitality, gaming, commercial, and industrial. When downtime costs money, our fast mobile-mapping capture keeps disruption to a minimum.',
    marketNote:
      "Las Vegas construction is dominated by hospitality and gaming renovation, where every hour a space is offline has a cost. Fast, non-disruptive capture matters here more than almost anywhere. Our mobile-mapping approach documents large casino floors, hotels, and convention spaces quickly and accurately.",
    neighborhoods: ['The Strip', 'Downtown Las Vegas', 'Henderson', 'Summerlin', 'North Las Vegas', 'Paradise'],
    landmarksContext:
      'We document hospitality interiors, gaming floors, convention space, commercial offices, and industrial facilities.',
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    region: 'WA',
    fullName: 'Seattle, WA',
    metroName: 'the Puget Sound region',
    intro:
      'We deliver 3D laser scanning and as-built documentation across the Seattle and Puget Sound region — tech campuses, historic renovations, and dense urban infill. Accurate existing conditions for a market that builds vertically.',
    marketNote:
      "Seattle combines aggressive tech-sector office construction with a historic core and strict energy and seismic codes. Renovations of older mid-rise stock and rapid tenant improvements both demand accurate as-builts. We provide point clouds and models suited to a market where precision and code compliance are non-negotiable.",
    neighborhoods: ['Downtown Seattle', 'Bellevue', 'Redmond', 'Tacoma', 'Kirkland', 'Everett'],
    landmarksContext:
      'Our Puget Sound scanning covers office buildings, tech campuses, historic structures, and multifamily residential.',
  },
  {
    slug: 'dallas-fort-worth',
    name: 'Dallas–Fort Worth',
    region: 'TX',
    fullName: 'Dallas–Fort Worth, TX',
    metroName: 'the Dallas–Fort Worth metroplex',
    intro:
      'Survey-grade 3D scanning and as-built drawings across the Dallas–Fort Worth metroplex — one of the largest and fastest-growing construction markets in the U.S. Corporate relocations, industrial development, and commercial renovation all covered.',
    marketNote:
      "DFW is a magnet for corporate relocations and one of the most active industrial and commercial construction markets in the country. Large-scale tenant improvements, warehouse and distribution build-outs, and adaptive reuse are constant. Accurate as-built documentation keeps these fast-moving projects on schedule.",
    neighborhoods: ['Dallas', 'Fort Worth', 'Plano', 'Arlington', 'Frisco', 'Irving'],
    landmarksContext:
      'We scan corporate offices, industrial and distribution facilities, retail, and residential across the metroplex.',
  },
];
