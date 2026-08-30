// City landing page data, drives src/pages/locations/[city].astro
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
  county?: string; // county slug for internal linking, e.g. 'los-angeles'
  countyName?: string; // display name, e.g. 'Los Angeles County'
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
      'Los Angeles has one of the most varied building stocks in the country, pre-war masonry, mid-century commercial, and dense modern infill sitting side by side. Original drawings are often missing or decades out of date after successive tenant fit-outs. Accurate as-builts are essential before any renovation, seismic retrofit, or lease documentation in this market.',
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
      'We provide 3D laser scanning and as-built documentation throughout Orange County, from Irvine corporate campuses to coastal Newport Beach estates. Fast turnaround, in-house processing, and deliverables ready for your design team.',
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
      'Survey-grade 3D scanning and as-built drawings across San Diego County, from Downtown mixed-use towers to biotech and life-science facilities in the Torrey Pines corridor. We document existing conditions your architects and GCs can build from immediately.',
    marketNote:
      "San Diego's building market is driven by life-science, defense, and hospitality construction, alongside steady residential renovation. Life-science tenant improvements in particular demand tight MEP coordination, which starts with an accurate existing-conditions scan. We deliver point clouds and Revit models that hold up to clash detection.",
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
      'We deliver 3D laser scanning and as-built documentation across the Bay Area, San Francisco, the Peninsula, the East Bay, and Silicon Valley. Tech tenant improvements, historic renovations, and seismic retrofits all start with accurate existing conditions.',
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
      'Survey-grade 3D scanning and as-built drawings across the Sacramento region, government facilities, healthcare, and steady commercial and residential renovation throughout the Central Valley capital.',
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
      'We bring survey-grade 3D laser scanning and as-built documentation to the Phoenix metro, one of the fastest-growing construction markets in the country. Industrial, commercial, and residential existing-conditions capture with fast turnaround.',
    marketNote:
      "Phoenix is in the middle of a construction boom, massive industrial and data-center development, rapid commercial growth, and heavy residential expansion across the Valley of the Sun. Adaptive reuse and tenant improvements on older stock are just as common. All of it benefits from precise as-built documentation before design begins.",
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
      'Survey-grade 3D scanning and as-built drawings across Las Vegas, hospitality, gaming, commercial, and industrial. When downtime costs money, our fast mobile-mapping capture keeps disruption to a minimum.',
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
      'We deliver 3D laser scanning and as-built documentation across the Seattle and Puget Sound region, tech campuses, historic renovations, and dense urban infill. Accurate existing conditions for a market that builds vertically.',
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
      'Survey-grade 3D scanning and as-built drawings across the Dallas–Fort Worth metroplex, one of the largest and fastest-growing construction markets in the U.S. Corporate relocations, industrial development, and commercial renovation all covered.',
    marketNote:
      "DFW is a magnet for corporate relocations and one of the most active industrial and commercial construction markets in the country. Large-scale tenant improvements, warehouse and distribution build-outs, and adaptive reuse are constant. Accurate as-built documentation keeps these fast-moving projects on schedule.",
    neighborhoods: ['Dallas', 'Fort Worth', 'Plano', 'Arlington', 'Frisco', 'Irving'],
    landmarksContext:
      'We scan corporate offices, industrial and distribution facilities, retail, and residential across the metroplex.',
  },

  // ===== Los Angeles County =====
  {
    slug: 'long-beach', name: 'Long Beach', region: 'CA', fullName: 'Long Beach, CA',
    metroName: 'the Long Beach area', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'We provide 3D laser scanning and as-built documentation across Long Beach, from Downtown high-rises and the convention district to the port and older industrial stock. Fast mobile-mapping capture keeps disruption low on active sites.',
    marketNote:
      'Long Beach blends a dense downtown, a working port, and aerospace and industrial facilities with a large inventory of older commercial and multifamily buildings. Renovations and tenant improvements here almost always run into original drawings that no longer match the space, which is exactly where a measured scan pays for itself.',
    neighborhoods: ['Downtown Long Beach', 'Belmont Shore', 'Bixby Knolls', 'the Port of Long Beach', 'Signal Hill', 'Lakewood'],
    landmarksContext: 'We scan office and civic buildings, port and industrial facilities, hospitality, and multifamily residential across the city.',
  },
  {
    slug: 'pasadena', name: 'Pasadena', region: 'CA', fullName: 'Pasadena, CA',
    metroName: 'the Pasadena area', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'Pasadena pairs one of the richest historic building stocks in Southern California with major research and medical institutions. We deliver survey-grade scanning and as-built drawings for both, from Craftsman landmarks to modern lab and office space.',
    marketNote:
      'Between Old Pasadena, the Playhouse District, and the streets around Caltech, Pasadena has an unusual concentration of historic Craftsman, Beaux-Arts, and Mission Revival buildings under strict preservation review, alongside research, healthcare, and civic construction. Non-contact laser scanning documents ornate, irregular historic fabric without touching it, and gives modern projects the accuracy they need.',
    neighborhoods: ['Old Pasadena', 'the Playhouse District', 'South Lake', 'Altadena', 'San Marino', 'Arcadia'],
    landmarksContext: 'We scan historic and Craftsman structures, research and medical facilities, civic buildings, and commercial offices.',
  },
  {
    slug: 'glendale', name: 'Glendale', region: 'CA', fullName: 'Glendale, CA',
    metroName: 'the Glendale area', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'We provide 3D laser scanning and as-built documentation throughout Glendale, from the dense downtown retail and office core to the animation and media studios that call the city home.',
    marketNote:
      'Glendale has one of the busiest commercial downtowns in the region, anchored by the Americana and Brand Boulevard, plus a significant creative and media-production sector and established healthcare campuses. Tenant improvements and studio build-outs move quickly here and depend on accurate existing conditions to stay on schedule.',
    neighborhoods: ['Downtown Glendale', 'Montrose', 'La Cañada Flintridge', 'Eagle Rock', 'Burbank', 'La Crescenta'],
    landmarksContext: 'We scan commercial offices, retail, studio and media facilities, healthcare, and multifamily residential.',
  },
  {
    slug: 'santa-monica', name: 'Santa Monica', region: 'CA', fullName: 'Santa Monica, CA',
    metroName: 'the Santa Monica and Westside area', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'Santa Monica combines a coastal setting with a dense creative-tech economy. We deliver 3D laser scanning and as-built drawings for the office, mixed-use, and residential renovations that define this Westside market.',
    marketNote:
      'As the heart of "Silicon Beach," Santa Monica sees constant creative-office and tech tenant improvements, layered onto an older mixed-use and multifamily stock near the coast. Reconfigurations happen fast and often, and each one starts with knowing exactly what is already there.',
    neighborhoods: ['Downtown Santa Monica', 'Ocean Park', 'Mid-City', 'Venice', 'Brentwood', 'Pacific Palisades'],
    landmarksContext: 'We scan creative and tech offices, mixed-use and retail, hospitality, and coastal residential.',
  },
  {
    slug: 'burbank', name: 'Burbank', region: 'CA', fullName: 'Burbank, CA',
    metroName: 'the Burbank area', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'Burbank is the "Media Capital of the World," and we scan the studios, post-production facilities, and supporting commercial space that fill it, along with the city’s older residential and industrial stock.',
    marketNote:
      'Burbank’s economy is built on entertainment production, from major studio lots to independent post and sound facilities, alongside aerospace history and a walkable downtown. Studio and stage build-outs demand precise existing conditions for rigging, MEP, and equipment, which is where laser scanning earns its place on the project.',
    neighborhoods: ['Downtown Burbank', 'the Media District', 'Magnolia Park', 'Toluca Lake', 'North Hollywood', 'Glendale'],
    landmarksContext: 'We scan studio and production facilities, commercial offices, retail, and residential across the city.',
  },
  {
    slug: 'torrance', name: 'Torrance', region: 'CA', fullName: 'Torrance, CA',
    metroName: 'the South Bay', county: 'los-angeles', countyName: 'Los Angeles County',
    intro:
      'We provide 3D laser scanning and as-built documentation across Torrance and the wider South Bay, a center of manufacturing, corporate offices, and large-format retail.',
    marketNote:
      'Torrance anchors the South Bay’s industrial and corporate economy, with a deep inventory of manufacturing plants, distribution space, and office campuses alongside major retail. Facility retrofits and equipment installations here hinge on accurate clearances, exactly what a point cloud captures that a tape measure misses.',
    neighborhoods: ['Old Torrance', 'the Del Amo area', 'Redondo Beach', 'Gardena', 'Carson', 'Lomita'],
    landmarksContext: 'We scan manufacturing and industrial facilities, corporate offices, retail, and residential across the South Bay.',
  },

  // ===== Orange County =====
  {
    slug: 'anaheim', name: 'Anaheim', region: 'CA', fullName: 'Anaheim, CA',
    metroName: 'the Anaheim area', county: 'orange', countyName: 'Orange County',
    intro:
      'Anaheim runs on tourism, sports, and a large industrial base. We deliver 3D laser scanning and as-built drawings for its hospitality, convention, stadium, and Anaheim Canyon industrial properties.',
    marketNote:
      'Between the resort and convention district, the Platinum Triangle, and the sprawling Anaheim Canyon business park, Anaheim has one of the most varied commercial and industrial footprints in Orange County. Hospitality renovations need fast, low-disruption capture; industrial build-outs need accurate clearances. We handle both.',
    neighborhoods: ['the Anaheim Resort District', 'the Platinum Triangle', 'Anaheim Canyon', 'Anaheim Hills', 'Orange', 'Fullerton'],
    landmarksContext: 'We scan hospitality and convention interiors, industrial and flex space, retail, and commercial offices.',
  },
  {
    slug: 'santa-ana', name: 'Santa Ana', region: 'CA', fullName: 'Santa Ana, CA',
    metroName: 'the Santa Ana area', county: 'orange', countyName: 'Orange County',
    intro:
      'As the Orange County seat, Santa Ana is dense with civic, government, and commercial buildings. We provide survey-grade scanning and as-built documentation for its historic downtown and the South Coast Metro business district.',
    marketNote:
      'Santa Ana combines a historic downtown and a large concentration of government and civic buildings with the high-rise offices of South Coast Metro. Older civic stock frequently lacks reliable drawings, and defensible, measured as-builts are essential for renovation, code upgrades, and public-works documentation.',
    neighborhoods: ['Downtown Santa Ana', 'the Civic Center', 'South Coast Metro', 'Tustin', 'Garden Grove', 'Orange'],
    landmarksContext: 'We scan civic and government buildings, historic downtown structures, commercial offices, and multifamily residential.',
  },
  {
    slug: 'irvine', name: 'Irvine', region: 'CA', fullName: 'Irvine, CA',
    metroName: 'the Irvine area', county: 'orange', countyName: 'Orange County',
    intro:
      'Irvine is one of the most successful master-planned cities in the country, dense with corporate campuses, tech, and healthcare. We deliver 3D laser scanning and as-built drawings for its office, lab, and R&D tenant improvements.',
    marketNote:
      'Irvine’s professionally managed office and R&D parks see constant tenant improvements, and its growing life-science and healthcare sector demands MEP-grade existing conditions for coordination and prefabrication. Clean, well-registered scan data is what keeps those fast-tracked build-outs from running into surprises above the ceiling.',
    neighborhoods: ['Irvine Spectrum', 'University Town Center', 'the Great Park', 'Tustin', 'Lake Forest', 'Newport Beach'],
    landmarksContext: 'We scan corporate offices, R&D and lab space, healthcare, and multifamily residential across the city.',
  },
  {
    slug: 'huntington-beach', name: 'Huntington Beach', region: 'CA', fullName: 'Huntington Beach, CA',
    metroName: 'the Huntington Beach area', county: 'orange', countyName: 'Orange County',
    intro:
      'We provide 3D laser scanning and as-built documentation across Huntington Beach, from the downtown and pier district to commercial corridors and coastal residential.',
    marketNote:
      'Surf City pairs tourism and hospitality along the coast with retail centers like Bella Terra and a substantial older residential and light-industrial base. Renovations of aging commercial and mixed-use buildings here consistently benefit from a current, measured scan before design begins.',
    neighborhoods: ['Downtown Huntington Beach', 'Huntington Harbour', 'Bella Terra', 'Fountain Valley', 'Westminster', 'Seal Beach'],
    landmarksContext: 'We scan hospitality and retail, commercial offices, light-industrial space, and coastal residential.',
  },
  {
    slug: 'newport-beach', name: 'Newport Beach', region: 'CA', fullName: 'Newport Beach, CA',
    metroName: 'the Newport Beach area', county: 'orange', countyName: 'Orange County',
    intro:
      'Newport Beach is among the highest-value residential and commercial markets in California. We deliver precise 3D laser scanning and as-built drawings for its luxury homes, harbor properties, and Fashion Island offices.',
    marketNote:
      'Custom coastal homes in Newport Coast, Corona del Mar, and on Balboa Island present exactly the complex, non-orthogonal geometry that defeats tape measures, while the offices and retail around Fashion Island demand professional tenant-improvement documentation. Both call for survey-grade capture and clean deliverables.',
    neighborhoods: ['Balboa Island', 'Corona del Mar', 'Newport Coast', 'Fashion Island', 'Costa Mesa', 'Laguna Beach'],
    landmarksContext: 'We scan luxury custom residences, harbor and waterfront properties, commercial offices, and retail.',
  },
  {
    slug: 'costa-mesa', name: 'Costa Mesa', region: 'CA', fullName: 'Costa Mesa, CA',
    metroName: 'the Costa Mesa area', county: 'orange', countyName: 'Orange County',
    intro:
      'Costa Mesa is Orange County’s retail and design hub, home to South Coast Plaza and a dense creative district. We provide 3D laser scanning and as-built documentation for its retail, office, and mixed-use projects.',
    marketNote:
      'Anchored by South Coast Plaza and the SoBeCa arts and design district, Costa Mesa sees continuous retail, restaurant, and creative-office renovation. Fast-moving tenant improvements in high-traffic retail environments need accurate existing conditions and quick turnaround, which is where mobile-mapping capture fits well.',
    neighborhoods: ['South Coast Metro', 'the SoBeCa District', 'Eastside Costa Mesa', 'Newport Beach', 'Santa Ana', 'Fountain Valley'],
    landmarksContext: 'We scan retail and restaurant interiors, creative offices, mixed-use, and residential.',
  },

  // ===== San Diego County =====
  {
    slug: 'carlsbad', name: 'Carlsbad', region: 'CA', fullName: 'Carlsbad, CA',
    metroName: 'the North County coast', county: 'san-diego', countyName: 'San Diego County',
    intro:
      'Carlsbad blends a coastal village with a strong life-science and technology cluster. We deliver 3D laser scanning and as-built drawings for its labs, corporate campuses, and resort and residential renovations.',
    marketNote:
      'Carlsbad has become a North County center for life-science, medical-device, and technology companies, alongside golf resorts and coastal residential. Lab and manufacturing tenant improvements demand tight MEP coordination, and it all starts with an accurate existing-conditions scan.',
    neighborhoods: ['Carlsbad Village', 'La Costa', 'Bressi Ranch', 'Oceanside', 'Encinitas', 'Vista'],
    landmarksContext: 'We scan lab and life-science facilities, corporate offices, hospitality, and coastal residential.',
  },
  {
    slug: 'chula-vista', name: 'Chula Vista', region: 'CA', fullName: 'Chula Vista, CA',
    metroName: 'the South Bay of San Diego', county: 'san-diego', countyName: 'San Diego County',
    intro:
      'Chula Vista is one of the fastest-growing cities in San Diego County. We provide 3D laser scanning and as-built documentation for its expanding commercial, civic, and master-planned residential development.',
    marketNote:
      'Between the master-planned communities of Otay Ranch and Eastlake and a revitalizing bayfront and downtown, Chula Vista is adding commercial, civic, and residential space quickly. New development and renovation of older South Bay stock alike benefit from measured, current documentation.',
    neighborhoods: ['Downtown Chula Vista', 'Eastlake', 'Otay Ranch', 'the Bayfront', 'National City', 'Bonita'],
    landmarksContext: 'We scan commercial and retail, civic buildings, and master-planned and multifamily residential.',
  },
  {
    slug: 'oceanside', name: 'Oceanside', region: 'CA', fullName: 'Oceanside, CA',
    metroName: 'the North County coast', county: 'san-diego', countyName: 'San Diego County',
    intro:
      'Oceanside pairs a revitalizing coastal downtown with the influence of Camp Pendleton and steady residential growth. We deliver 3D laser scanning and as-built drawings across its commercial and residential projects.',
    marketNote:
      'Oceanside’s downtown is in the middle of a hospitality and mixed-use renaissance, layered on an older coastal building stock and shaped by its proximity to Camp Pendleton. Adaptive reuse and tenant improvements here regularly turn up conditions that only a scan captures accurately.',
    neighborhoods: ['Downtown Oceanside', 'Rancho del Oro', 'Fire Mountain', 'Carlsbad', 'Vista', 'San Luis Rey'],
    landmarksContext: 'We scan hospitality and mixed-use, commercial offices, retail, and coastal residential.',
  },
  {
    slug: 'escondido', name: 'Escondido', region: 'CA', fullName: 'Escondido, CA',
    metroName: 'inland North County', county: 'san-diego', countyName: 'San Diego County',
    intro:
      'Escondido is the commercial and civic hub of inland North County. We provide 3D laser scanning and as-built documentation for its downtown, healthcare, and agricultural-adjacent commercial buildings.',
    marketNote:
      'Escondido combines a historic downtown and civic core with regional healthcare and an agricultural economy in the surrounding valleys. Older commercial and civic buildings here frequently lack reliable drawings, making measured as-builts the practical starting point for renovation and expansion.',
    neighborhoods: ['Downtown Escondido', 'Hidden Meadows', 'San Marcos', 'Valley Center', 'Rancho Bernardo', 'Poway'],
    landmarksContext: 'We scan civic and healthcare buildings, commercial offices, retail, and residential across inland North County.',
  },

  // ===== Riverside County =====
  {
    slug: 'riverside', name: 'Riverside', region: 'CA', fullName: 'Riverside, CA',
    metroName: 'the Inland Empire', county: 'riverside', countyName: 'Riverside County',
    intro:
      'As the county seat, Riverside blends a historic civic core with a university and a heavy logistics economy. We deliver 3D laser scanning and as-built drawings across its civic, commercial, and industrial buildings.',
    marketNote:
      'Riverside pairs landmarks like the Mission Inn and a historic downtown with UC Riverside and a major warehouse and distribution sector. Historic renovation demands careful documentation of irregular fabric, while logistics build-outs demand accurate clearances, and both start with a clean scan.',
    neighborhoods: ['Downtown Riverside', 'Canyon Crest', 'La Sierra', 'Moreno Valley', 'Jurupa Valley', 'Corona'],
    landmarksContext: 'We scan historic and civic buildings, warehouse and distribution facilities, commercial offices, and residential.',
  },
  {
    slug: 'corona', name: 'Corona', region: 'CA', fullName: 'Corona, CA',
    metroName: 'the Inland Empire', county: 'riverside', countyName: 'Riverside County',
    intro:
      'Corona sits at the western gateway of Riverside County, dense with industrial and logistics facilities and fast-growing commercial and residential development. We provide 3D laser scanning and as-built documentation across all of it.',
    marketNote:
      'Corona’s economy leans heavily on manufacturing, logistics, and distribution, with large industrial shells that require accurate existing conditions when new racking, MEP, or process equipment goes in. Rapid commercial and residential growth adds a steady stream of renovation work.',
    neighborhoods: ['Downtown Corona', 'South Corona', 'Eastvale', 'Norco', 'Chino Hills', 'Riverside'],
    landmarksContext: 'We scan industrial and distribution facilities, manufacturing plants, commercial offices, retail, and residential.',
  },
  {
    slug: 'temecula', name: 'Temecula', region: 'CA', fullName: 'Temecula, CA',
    metroName: 'the Temecula Valley', county: 'riverside', countyName: 'Riverside County',
    intro:
      'Temecula pairs a historic Old Town with Southern California’s fastest-growing wine region. We deliver 3D laser scanning and as-built drawings for its wineries, hospitality, and expanding commercial base.',
    marketNote:
      'Temecula Valley wine country drives ongoing winery, tasting-room, and hospitality construction, where large production buildings and guest-facing spaces both need accurate documentation. Old Town and the surrounding commercial corridors add retail and mixed-use renovation to the mix.',
    neighborhoods: ['Old Town Temecula', 'Temecula Wine Country', 'Murrieta', 'Wildomar', 'Menifee', 'Lake Elsinore'],
    landmarksContext: 'We scan wineries and tasting rooms, hospitality interiors, retail and mixed-use, and residential.',
  },
  {
    slug: 'palm-springs', name: 'Palm Springs', region: 'CA', fullName: 'Palm Springs, CA',
    metroName: 'the Coachella Valley', county: 'riverside', countyName: 'Riverside County',
    intro:
      'Palm Springs is a global capital of mid-century modern architecture and desert resort hospitality. We provide non-contact 3D laser scanning and as-built documentation that respects its protected architectural fabric.',
    marketNote:
      'Palm Springs and the Coachella Valley combine celebrated mid-century modern homes and civic buildings under preservation review with a large resort and hospitality sector. Documenting protected architecture accurately, without disturbing it, is exactly what laser scanning was made for.',
    neighborhoods: ['Downtown Palm Springs', 'the Uptown Design District', 'Cathedral City', 'Palm Desert', 'Rancho Mirage', 'La Quinta'],
    landmarksContext: 'We scan mid-century modern and historic architecture, resort and hospitality interiors, and residential.',
  },

  // ===== San Bernardino County =====
  {
    slug: 'san-bernardino', name: 'San Bernardino', region: 'CA', fullName: 'San Bernardino, CA',
    metroName: 'the Inland Empire', county: 'san-bernardino', countyName: 'San Bernardino County',
    intro:
      'As the county seat, San Bernardino combines civic and institutional buildings with a major logistics and distribution economy. We deliver 3D laser scanning and as-built documentation across all of it.',
    marketNote:
      'San Bernardino carries a substantial inventory of older civic, institutional, and commercial buildings alongside the warehouse and distribution facilities that define the Inland Empire. Aging drawings and successive renovations make measured, defensible as-builts especially valuable here.',
    neighborhoods: ['Downtown San Bernardino', 'Highland', 'Rialto', 'Colton', 'Loma Linda', 'Redlands'],
    landmarksContext: 'We scan civic and institutional buildings, distribution facilities, healthcare, and commercial offices.',
  },
  {
    slug: 'ontario', name: 'Ontario', region: 'CA', fullName: 'Ontario, CA',
    metroName: 'the Inland Empire', county: 'san-bernardino', countyName: 'San Bernardino County',
    intro:
      'Ontario is a logistics and aviation hub anchored by its international airport and convention center. We provide 3D laser scanning and as-built drawings for its industrial, commercial, and hospitality properties.',
    marketNote:
      'With the airport, Ontario Mills, the convention center, and Ontario Ranch driving growth, Ontario is one of the busiest logistics and commercial markets in the Inland Empire. Massive distribution shells and fast-tracked commercial build-outs both depend on accurate existing conditions.',
    neighborhoods: ['Ontario Ranch', 'the Ontario Mills area', 'Rancho Cucamonga', 'Chino', 'Fontana', 'Upland'],
    landmarksContext: 'We scan distribution and logistics facilities, commercial offices, hospitality, and retail.',
  },
  {
    slug: 'rancho-cucamonga', name: 'Rancho Cucamonga', region: 'CA', fullName: 'Rancho Cucamonga, CA',
    metroName: 'the Inland Empire', county: 'san-bernardino', countyName: 'San Bernardino County',
    intro:
      'Rancho Cucamonga combines major industrial and logistics space with the regional retail draw of Victoria Gardens. We deliver 3D laser scanning and as-built documentation across its commercial and industrial base.',
    marketNote:
      'Rancho Cucamonga balances large-scale distribution and light-industrial development with corporate offices and the Victoria Gardens lifestyle center. Tenant improvements and facility retrofits here move quickly and rely on accurate scan data to avoid costly field surprises.',
    neighborhoods: ['Victoria Gardens', 'Terra Vista', 'Alta Loma', 'Upland', 'Fontana', 'Ontario'],
    landmarksContext: 'We scan industrial and distribution facilities, corporate offices, retail, and residential.',
  },
  {
    slug: 'fontana', name: 'Fontana', region: 'CA', fullName: 'Fontana, CA',
    metroName: 'the Inland Empire', county: 'san-bernardino', countyName: 'San Bernardino County',
    intro:
      'Fontana is one of the densest distribution and manufacturing markets in the country. We provide 3D laser scanning and as-built documentation for its industrial facilities and fast-growing commercial and residential development.',
    marketNote:
      'Built on a steel-industry legacy, Fontana today is dominated by enormous warehouse, distribution, and manufacturing facilities, alongside rapid residential expansion. Accurate as-builts are critical when new conveyor, racking, and MEP systems must fit large existing shells exactly.',
    neighborhoods: ['Downtown Fontana', 'Southridge', 'Sierra Lakes', 'Rialto', 'Bloomington', 'Rancho Cucamonga'],
    landmarksContext: 'We scan warehouse and distribution facilities, manufacturing plants, commercial offices, and residential.',
  },

  // ===== Ventura County =====
  {
    slug: 'oxnard', name: 'Oxnard', region: 'CA', fullName: 'Oxnard, CA',
    metroName: 'the Oxnard Plain', county: 'ventura', countyName: 'Ventura County',
    intro:
      'Oxnard is the largest city in Ventura County, combining agriculture, a working harbor, and a growing commercial base. We deliver 3D laser scanning and as-built drawings across its industrial, civic, and residential projects.',
    marketNote:
      'Oxnard pairs large-scale agriculture and the Port of Hueneme with industrial, civic, and mixed-use development around RiverPark and downtown. Agricultural-industrial and commercial facilities here benefit from precise existing conditions before retrofits and expansions.',
    neighborhoods: ['Downtown Oxnard', 'RiverPark', 'Channel Islands Harbor', 'Port Hueneme', 'Camarillo', 'Ventura'],
    landmarksContext: 'We scan agricultural-industrial and port facilities, civic buildings, commercial offices, and residential.',
  },
  {
    slug: 'thousand-oaks', name: 'Thousand Oaks', region: 'CA', fullName: 'Thousand Oaks, CA',
    metroName: 'the Conejo Valley', county: 'ventura', countyName: 'Ventura County',
    intro:
      'Thousand Oaks anchors the Conejo Valley’s biotech and corporate corridor. We provide 3D laser scanning and as-built documentation for its lab, R&D, and office tenant improvements.',
    marketNote:
      'Home to a major life-science presence and a cluster of corporate headquarters, Thousand Oaks and neighboring Newbury Park see steady lab, R&D, and office build-outs that demand MEP-grade existing conditions. Clean scan data keeps that coordination-heavy work on track.',
    neighborhoods: ['Thousand Oaks Boulevard', 'Newbury Park', 'Westlake Village', 'Agoura Hills', 'Moorpark', 'Camarillo'],
    landmarksContext: 'We scan life-science and lab space, corporate offices, healthcare, and residential.',
  },
  {
    slug: 'simi-valley', name: 'Simi Valley', region: 'CA', fullName: 'Simi Valley, CA',
    metroName: 'the Simi Valley area', county: 'ventura', countyName: 'Ventura County',
    intro:
      'Simi Valley combines established residential neighborhoods with light-industrial and civic development. We deliver 3D laser scanning and as-built drawings across its commercial and institutional buildings.',
    marketNote:
      'Simi Valley balances a large residential base with light-industrial parks, civic facilities, and retail centers. Renovations and tenant improvements of aging commercial and institutional stock here are far smoother with a current, measured scan in hand.',
    neighborhoods: ['Simi Valley Town Center', 'Wood Ranch', 'Moorpark', 'Chatsworth', 'Thousand Oaks', 'Santa Susana'],
    landmarksContext: 'We scan light-industrial and commercial buildings, civic facilities, retail, and residential.',
  },
  {
    slug: 'ventura', name: 'Ventura', region: 'CA', fullName: 'Ventura, CA',
    metroName: 'the Ventura coast', county: 'ventura', countyName: 'Ventura County',
    intro:
      'The city of Ventura pairs a historic coastal downtown with civic buildings and a tourism economy. We provide 3D laser scanning and as-built documentation across its commercial, civic, and residential projects.',
    marketNote:
      'Ventura’s historic downtown, waterfront, and civic core anchor a tourism-driven economy with a substantial older building stock. Adaptive reuse and hospitality renovation here consistently run into original drawings that no longer match reality, which is where a scan pays off.',
    neighborhoods: ['Downtown Ventura', 'the Ventura Harbor', 'Midtown Ventura', 'Oxnard', 'Ojai', 'Camarillo'],
    landmarksContext: 'We scan historic downtown and civic buildings, hospitality, commercial offices, and coastal residential.',
  },

  // ===== Santa Barbara County =====
  {
    slug: 'santa-barbara', name: 'Santa Barbara', region: 'CA', fullName: 'Santa Barbara, CA',
    metroName: 'the Santa Barbara coast', county: 'santa-barbara', countyName: 'Santa Barbara County',
    intro:
      'Santa Barbara is defined by its protected Spanish Colonial architecture and coastal hospitality. We deliver non-contact 3D laser scanning and as-built documentation built for its strict architectural-review environment.',
    marketNote:
      'Santa Barbara and Montecito enforce some of the strictest architectural and historic-preservation standards in California, where renovation of Spanish Colonial and Mission Revival buildings requires careful documentation of ornament and irregular geometry. Non-contact scanning captures that fabric precisely, without ever touching it.',
    neighborhoods: ['Downtown Santa Barbara', 'State Street', 'the Waterfront', 'Montecito', 'Goleta', 'Carpinteria'],
    landmarksContext: 'We scan historic and Spanish Colonial structures, hospitality interiors, civic buildings, and residential.',
  },
  {
    slug: 'santa-maria', name: 'Santa Maria', region: 'CA', fullName: 'Santa Maria, CA',
    metroName: 'the Santa Maria Valley', county: 'santa-barbara', countyName: 'Santa Barbara County',
    intro:
      'Santa Maria is the commercial and agricultural hub of northern Santa Barbara County. We provide 3D laser scanning and as-built documentation for its agricultural, aerospace, and commercial buildings.',
    marketNote:
      'The Santa Maria Valley combines large-scale agriculture and food processing with aerospace and a growing commercial core. Processing plants and industrial facilities here depend on accurate existing conditions for equipment layout, retrofits, and expansion.',
    neighborhoods: ['Downtown Santa Maria', 'Orcutt', 'Nipomo', 'Guadalupe', 'Lompoc', 'Los Alamos'],
    landmarksContext: 'We scan agricultural and food-processing facilities, aerospace and industrial buildings, commercial, and civic space.',
  },

  // ===== San Luis Obispo County =====
  {
    slug: 'san-luis-obispo', name: 'San Luis Obispo', region: 'CA', fullName: 'San Luis Obispo, CA',
    metroName: 'the San Luis Obispo area', county: 'san-luis-obispo', countyName: 'San Luis Obispo County',
    intro:
      'San Luis Obispo pairs a historic downtown with Cal Poly and a strong tourism economy. We deliver 3D laser scanning and as-built drawings across its institutional, commercial, and hospitality buildings.',
    marketNote:
      'Anchored by Cal Poly and a walkable historic downtown, San Luis Obispo sees steady institutional, commercial, and hospitality renovation. Older mixed-use and civic buildings here often lack accurate drawings, making a measured scan the practical first step for any project.',
    neighborhoods: ['Downtown San Luis Obispo', 'the Cal Poly area', 'Los Osos', 'Pismo Beach', 'Morro Bay', 'Arroyo Grande'],
    landmarksContext: 'We scan institutional and civic buildings, historic downtown structures, hospitality, and commercial space.',
  },
  {
    slug: 'paso-robles', name: 'Paso Robles', region: 'CA', fullName: 'Paso Robles, CA',
    metroName: 'the Paso Robles wine region', county: 'san-luis-obispo', countyName: 'San Luis Obispo County',
    intro:
      'Paso Robles is the heart of the Central Coast wine region. We provide 3D laser scanning and as-built documentation for its wineries, tasting rooms, hospitality, and agricultural facilities.',
    marketNote:
      'The Paso Robles and Templeton wine region drives continuous winery, tasting-room, and hospitality construction, where large clear-span production buildings and guest-facing spaces both need accurate documentation. Agriculture rounds out a building stock that benefits from precise existing conditions.',
    neighborhoods: ['Downtown Paso Robles', 'Templeton', 'Atascadero', 'Creston', 'the wine country', 'San Miguel'],
    landmarksContext: 'We scan wineries and production facilities, tasting rooms, hospitality interiors, and agricultural buildings.',
  },

  // ===== Kern County =====
  {
    slug: 'bakersfield', name: 'Bakersfield', region: 'CA', fullName: 'Bakersfield, CA',
    metroName: 'the Bakersfield area', county: 'kern', countyName: 'Kern County',
    intro:
      'Bakersfield anchors Kern County’s energy and agricultural economy. We deliver 3D laser scanning and as-built documentation across its industrial, energy, healthcare, and civic buildings.',
    marketNote:
      'Bakersfield combines a major energy and oil sector and vast agricultural processing with a growing commercial, healthcare, and civic building stock. Industrial and energy facilities depend on accurate clearances for retrofits and equipment, while older civic and commercial buildings need reliable as-builts for renovation.',
    neighborhoods: ['Downtown Bakersfield', 'Southwest Bakersfield', 'Oildale', 'Rosedale', 'Delano', 'Shafter'],
    landmarksContext: 'We scan energy and industrial facilities, agricultural processing plants, healthcare, and civic and commercial buildings.',
  },

  // ===== Imperial County =====
  {
    slug: 'el-centro', name: 'El Centro', region: 'CA', fullName: 'El Centro, CA',
    metroName: 'the Imperial Valley', county: 'imperial', countyName: 'Imperial County',
    intro:
      'El Centro is the commercial and civic center of the Imperial Valley. We provide 3D laser scanning and as-built documentation for its agricultural, energy, and civic buildings near the California–Mexico border.',
    marketNote:
      'El Centro anchors an economy built on agriculture, expanding solar and geothermal energy, and cross-border trade at Calexico. Energy and industrial facilities depend on accurate existing conditions, while older civic and commercial buildings often lack usable drawings entirely.',
    neighborhoods: ['Downtown El Centro', 'Imperial', 'Calexico', 'Brawley', 'Heber', 'Holtville'],
    landmarksContext: 'We scan energy and industrial facilities, agricultural buildings, civic and commercial structures, and border-area construction.',
  },
];
