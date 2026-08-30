// Southern California county hub pages, drives src/pages/locations/counties/[county].astro
// Each county page is a substantial, unique hub that serves and links the cities within it.

export interface County {
  slug: string; // 'los-angeles'
  name: string; // 'Los Angeles County'
  metroName: string; // 'Greater Los Angeles'
  intro: string; // unique 2-3 sentence intro
  marketNote: string; // unique paragraph on the county's economy and building stock
  secondNote: string; // second unique paragraph, why as-builts matter here
  citiesServed: string[]; // significant incorporated cities served (text list)
  featured: { slug: string; name: string }[]; // cities with their own dedicated pages
  landmarksContext: string; // sentence on the building types we scan here
}

export const COUNTIES: County[] = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles County',
    metroName: 'Greater Los Angeles',
    intro:
      'Los Angeles County is the most populous county in the United States, and its building stock is just as vast and varied. We deliver survey-grade 3D laser scanning and as-built documentation across all 88 cities, from Downtown high-rises to Antelope Valley industrial parks.',
    marketNote:
      'No county in the country has a more layered built environment. Pre-war masonry in the historic core, mid-century commercial along the boulevards, entertainment and studio facilities on the Westside, and dense modern infill everywhere in between. Decades of tenant improvements mean original drawings are usually missing or wrong, which is why measured, current as-builts are the starting point for almost any renovation, seismic retrofit, or lease here.',
    secondNote:
      'LA County also carries some of the strictest seismic and accessibility requirements in the state. Soft-story retrofits, ADA upgrades, and adaptive reuse of aging commercial buildings all depend on accurate existing conditions before a single sheet of design is drawn. We capture that reality with mobile mapping and deliver it in whatever format your team builds from.',
    citiesServed: [
      'Los Angeles', 'Long Beach', 'Glendale', 'Santa Clarita', 'Pasadena', 'Torrance',
      'Burbank', 'Santa Monica', 'Pomona', 'El Monte', 'Downey', 'West Covina',
      'Inglewood', 'Norwalk', 'Compton', 'Carson', 'Whittier', 'Alhambra',
      'Lakewood', 'Redondo Beach', 'Culver City', 'Beverly Hills', 'Arcadia', 'Diamond Bar',
    ],
    featured: [
      { slug: 'los-angeles', name: 'Los Angeles' },
      { slug: 'long-beach', name: 'Long Beach' },
      { slug: 'pasadena', name: 'Pasadena' },
      { slug: 'glendale', name: 'Glendale' },
      { slug: 'santa-monica', name: 'Santa Monica' },
      { slug: 'burbank', name: 'Burbank' },
      { slug: 'torrance', name: 'Torrance' },
    ],
    landmarksContext:
      'We regularly scan office towers, medical and studio facilities, restaurants, retail, historic structures, and multifamily residential across the basin.',
  },
  {
    slug: 'orange',
    name: 'Orange County',
    metroName: 'Orange County',
    intro:
      'Orange County pairs master-planned commercial development with some of the most valuable coastal residential in California. We provide 3D laser scanning and as-built documentation across all 34 cities, from Irvine corporate campuses to Newport Beach estates.',
    marketNote:
      'The county runs on two engines: dense, professionally managed commercial and healthcare development inland, and high-value custom residential along the coast. Tenant improvements in Irvine, Costa Mesa, and Anaheim office and medical parks demand tight MEP coordination, while renovation of luxury homes in Newport, Laguna, and the hills demands precise capture of complex, non-orthogonal geometry.',
    secondNote:
      'Orange County also has a mature life-science and outpatient healthcare sector where existing-conditions accuracy directly affects clash detection and prefabrication. Whether the deliverable is a Revit model for a surgery center or a dimensioned plan for a coastal remodel, the scan comes first.',
    citiesServed: [
      'Anaheim', 'Santa Ana', 'Irvine', 'Huntington Beach', 'Garden Grove', 'Fullerton',
      'Costa Mesa', 'Mission Viejo', 'Newport Beach', 'Orange', 'Tustin', 'Lake Forest',
      'Yorba Linda', 'San Clemente', 'Laguna Niguel', 'Fountain Valley', 'Brea', 'Aliso Viejo',
    ],
    featured: [
      { slug: 'anaheim', name: 'Anaheim' },
      { slug: 'santa-ana', name: 'Santa Ana' },
      { slug: 'irvine', name: 'Irvine' },
      { slug: 'huntington-beach', name: 'Huntington Beach' },
      { slug: 'newport-beach', name: 'Newport Beach' },
      { slug: 'costa-mesa', name: 'Costa Mesa' },
    ],
    landmarksContext:
      'Our Orange County work spans outpatient clinics, corporate offices, industrial flex space, retail, and custom coastal residences.',
  },
  {
    slug: 'san-diego',
    name: 'San Diego County',
    metroName: 'the San Diego metro',
    intro:
      'San Diego County spans dense coastal cities, a booming life-science corridor, and major defense and hospitality construction. We deliver survey-grade scanning and as-built drawings across all 18 cities, from Downtown towers to Carlsbad and the Torrey Pines mesa.',
    marketNote:
      "San Diego's building market is driven by life-science and biotech, defense, hospitality, and steady coastal residential renovation. Lab and cleanroom tenant improvements in Sorrento Valley and Torrey Pines are especially demanding, requiring MEP-grade accuracy that only starts with a clean existing-conditions scan.",
    secondNote:
      'The county also carries significant military and institutional construction where documentation standards are strict and defensible records matter. We deliver point clouds and Revit models built to survive clash detection and audit alike, throughout the metro and North County.',
    citiesServed: [
      'San Diego', 'Chula Vista', 'Oceanside', 'Escondido', 'Carlsbad', 'El Cajon',
      'Vista', 'San Marcos', 'Encinitas', 'National City', 'La Mesa', 'Santee',
      'Poway', 'Coronado', 'Imperial Beach',
    ],
    featured: [
      { slug: 'san-diego', name: 'San Diego' },
      { slug: 'carlsbad', name: 'Carlsbad' },
      { slug: 'chula-vista', name: 'Chula Vista' },
      { slug: 'oceanside', name: 'Oceanside' },
      { slug: 'escondido', name: 'Escondido' },
    ],
    landmarksContext:
      'We scan lab and cleanroom space, hospitality interiors, commercial offices, institutional buildings, and coastal residential across the county.',
  },
  {
    slug: 'riverside',
    name: 'Riverside County',
    metroName: 'the Inland Empire and Coachella Valley',
    intro:
      'Riverside County stretches from the Inland Empire logistics belt to the resorts of the Coachella Valley. We provide 3D laser scanning and as-built documentation across all 28 cities, supporting warehouse, commercial, and hospitality construction alike.',
    marketNote:
      "Western Riverside County is one of the busiest logistics and distribution markets in the nation, with enormous warehouse and industrial build-outs around Riverside, Corona, and Moreno Valley. Accurate existing conditions are critical when new racking, MEP, and fire-suppression systems have to fit large, fast-tracked shells.",
    secondNote:
      'East, in the Coachella Valley, the economy shifts to hospitality and high-end residential around Palm Springs and Palm Desert, where mid-century architecture and resort renovations demand careful, non-disruptive capture. We handle both ends of the county with the same survey-grade accuracy.',
    citiesServed: [
      'Riverside', 'Moreno Valley', 'Corona', 'Murrieta', 'Temecula', 'Jurupa Valley',
      'Menifee', 'Hemet', 'Indio', 'Perris', 'Eastvale', 'Cathedral City',
      'Palm Springs', 'Palm Desert', 'Lake Elsinore', 'Wildomar',
    ],
    featured: [
      { slug: 'riverside', name: 'Riverside' },
      { slug: 'corona', name: 'Corona' },
      { slug: 'temecula', name: 'Temecula' },
      { slug: 'palm-springs', name: 'Palm Springs' },
    ],
    landmarksContext:
      'We document warehouse and distribution facilities, commercial offices, retail, hospitality interiors, and residential across the county.',
  },
  {
    slug: 'san-bernardino',
    name: 'San Bernardino County',
    metroName: 'the Inland Empire',
    intro:
      'San Bernardino County is the largest county in the contiguous United States by area and a national hub for logistics and industrial construction. We deliver 3D laser scanning and as-built documentation across all 24 cities, from the valley floor to the high desert.',
    marketNote:
      'The Inland Empire cities of Ontario, Fontana, and Rancho Cucamonga anchor one of the densest concentrations of distribution and manufacturing space in the country. These massive facilities live or die on accurate as-builts, where a few inches of clearance in the plenum determines whether new conveyor, racking, or MEP fits as designed.',
    secondNote:
      'Beyond logistics, the county includes established civic and commercial cores and growing high-desert communities around Victorville and Hesperia. Adaptive reuse, tenant improvements, and public-works documentation all benefit from a precise existing-conditions scan before design begins.',
    citiesServed: [
      'San Bernardino', 'Fontana', 'Rancho Cucamonga', 'Ontario', 'Victorville', 'Rialto',
      'Hesperia', 'Chino', 'Chino Hills', 'Upland', 'Redlands', 'Colton',
      'Yucaipa', 'Montclair', 'Apple Valley', 'Highland',
    ],
    featured: [
      { slug: 'san-bernardino', name: 'San Bernardino' },
      { slug: 'ontario', name: 'Ontario' },
      { slug: 'rancho-cucamonga', name: 'Rancho Cucamonga' },
      { slug: 'fontana', name: 'Fontana' },
    ],
    landmarksContext:
      'We scan distribution centers, manufacturing plants, commercial offices, retail, and residential throughout the valley and high desert.',
  },
  {
    slug: 'ventura',
    name: 'Ventura County',
    metroName: 'Ventura County',
    intro:
      'Ventura County combines a strong biotech and healthcare corridor with agriculture, coastal cities, and a major naval presence. We provide 3D laser scanning and as-built documentation across all 10 cities, from Thousand Oaks labs to the Oxnard plain.',
    marketNote:
      'The Conejo Valley around Thousand Oaks and Newbury Park anchors a significant life-science and corporate sector, where lab and office tenant improvements demand MEP-grade existing conditions. Along the coast, Oxnard and Ventura balance agriculture, industrial, and civic construction with ongoing commercial renovation.',
    secondNote:
      'The county also has a substantial inventory of older civic, educational, and agricultural-industrial buildings where original drawings are long gone. Accurate as-builts turn those unknowns into a reliable basis for renovation, expansion, and code upgrades.',
    citiesServed: [
      'Oxnard', 'Thousand Oaks', 'Simi Valley', 'Ventura', 'Camarillo', 'Moorpark',
      'Santa Paula', 'Fillmore', 'Port Hueneme', 'Ojai',
    ],
    featured: [
      { slug: 'oxnard', name: 'Oxnard' },
      { slug: 'thousand-oaks', name: 'Thousand Oaks' },
      { slug: 'simi-valley', name: 'Simi Valley' },
      { slug: 'ventura', name: 'Ventura' },
    ],
    landmarksContext:
      'We document life-science and lab space, corporate offices, civic buildings, agricultural-industrial facilities, and residential across the county.',
  },
  {
    slug: 'santa-barbara',
    name: 'Santa Barbara County',
    metroName: 'the Santa Barbara and Central Coast region',
    intro:
      'Santa Barbara County blends protected Spanish Colonial architecture, coastal hospitality, aerospace, and Santa Maria Valley agriculture. We deliver 3D laser scanning and as-built documentation across all eight cities, from the historic waterfront to the North County.',
    marketNote:
      'Santa Barbara and Montecito carry some of the strictest architectural-review and historic-preservation requirements in the state, where renovations of Spanish Colonial and Mission Revival buildings demand careful, non-contact documentation of ornament and irregular geometry. Accurate as-builts are essential for approvals here.',
    secondNote:
      'To the north, Santa Maria and Lompoc support agriculture, aerospace around Vandenberg, and steady commercial construction. Across the county, current existing-conditions data underpins everything from historic rehabilitation to institutional and hospitality projects.',
    citiesServed: [
      'Santa Barbara', 'Santa Maria', 'Lompoc', 'Goleta', 'Carpinteria', 'Guadalupe',
      'Buellton', 'Solvang', 'Montecito', 'Isla Vista',
    ],
    featured: [
      { slug: 'santa-barbara', name: 'Santa Barbara' },
      { slug: 'santa-maria', name: 'Santa Maria' },
    ],
    landmarksContext:
      'We scan historic and Spanish Colonial structures, hospitality interiors, institutional buildings, and agricultural and aerospace facilities.',
  },
  {
    slug: 'san-luis-obispo',
    name: 'San Luis Obispo County',
    metroName: 'the San Luis Obispo and Central Coast region',
    intro:
      'San Luis Obispo County is Central Coast wine country, anchored by a university town and the Paso Robles wine region. We provide 3D laser scanning and as-built documentation across all seven cities, supporting hospitality, education, and agricultural construction.',
    marketNote:
      'The Paso Robles and Templeton wine region drives ongoing winery, tasting-room, and hospitality construction, where large clear-span production buildings and guest-facing spaces both need accurate documentation. In San Luis Obispo, Cal Poly and a historic downtown add steady institutional and commercial renovation.',
    secondNote:
      'Coastal communities from Pismo Beach to Morro Bay round out a tourism-driven economy where renovation and adaptive reuse are constant. A precise existing-conditions scan keeps these projects moving without repeated site visits.',
    citiesServed: [
      'San Luis Obispo', 'Paso Robles', 'Atascadero', 'Arroyo Grande', 'Pismo Beach',
      'Morro Bay', 'Grover Beach', 'Templeton',
    ],
    featured: [
      { slug: 'san-luis-obispo', name: 'San Luis Obispo' },
      { slug: 'paso-robles', name: 'Paso Robles' },
    ],
    landmarksContext:
      'We document wineries and tasting rooms, hospitality interiors, institutional buildings, and commercial and residential renovation.',
  },
  {
    slug: 'kern',
    name: 'Kern County',
    metroName: 'the Bakersfield area and southern Central Valley',
    intro:
      'Kern County is a center of energy, agriculture, and logistics at the southern end of the Central Valley. We deliver 3D laser scanning and as-built documentation across all 11 cities, from Bakersfield civic and commercial cores to industrial and energy facilities.',
    marketNote:
      'Kern County produces more oil and more renewable energy than almost anywhere in California, alongside vast agricultural processing. Industrial, energy, and ag-processing facilities all benefit from accurate as-builts before retrofits, expansions, or equipment installations that hinge on exact clearances.',
    secondNote:
      'Bakersfield anchors the county with a growing commercial, healthcare, and civic building stock, much of it older and poorly documented. Measured existing conditions turn aging drawings into a reliable basis for renovation and code compliance.',
    citiesServed: [
      'Bakersfield', 'Delano', 'Ridgecrest', 'Wasco', 'Shafter', 'Arvin',
      'Tehachapi', 'California City', 'Taft', 'McFarland', 'Maricopa',
    ],
    featured: [
      { slug: 'bakersfield', name: 'Bakersfield' },
    ],
    landmarksContext:
      'We scan energy and industrial facilities, agricultural processing plants, commercial offices, healthcare, and civic buildings.',
  },
  {
    slug: 'imperial',
    name: 'Imperial County',
    metroName: 'the Imperial Valley',
    intro:
      'Imperial County is an agricultural and renewable-energy powerhouse on the California–Mexico border. We provide 3D laser scanning and as-built documentation across all seven cities, supporting agriculture, energy, and cross-border commercial construction.',
    marketNote:
      'The Imperial Valley combines large-scale agriculture with rapidly expanding solar and geothermal energy development and significant cross-border trade at Calexico. Energy and industrial facilities in particular depend on accurate existing conditions for equipment layout, retrofits, and expansion.',
    secondNote:
      'El Centro and the surrounding cities carry an older civic and commercial building stock where original drawings are often unavailable. A current, measured scan provides the defensible basis these projects need for renovation, permitting, and code upgrades.',
    citiesServed: [
      'El Centro', 'Calexico', 'Brawley', 'Imperial', 'Holtville', 'Westmorland', 'Calipatria',
    ],
    featured: [
      { slug: 'el-centro', name: 'El Centro' },
    ],
    landmarksContext:
      'We document energy and industrial facilities, agricultural buildings, commercial and civic structures, and border-area construction.',
  },
];
