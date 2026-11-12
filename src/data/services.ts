// Service landing page data, drives src/pages/services/[service].astro
// Each entry generates a dedicated page at /services/<slug>/.
// Keep claims consistent with the pricing page and homepage FAQ.

export interface ServiceSection {
  heading: string;
  paragraphs: string[];
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string; // short name used in cards, breadcrumbs, and schema
  title: string; // <title> tag
  description: string; // meta description
  eyebrow: string;
  h1Lead: string; // first part of the H1
  h1Accent: string; // accent-colored end of the H1
  lead: string; // hero paragraph
  deliverables: { title: string; text: string }[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  related: { href: string; label: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: '3d-laser-scanning',
    name: '3D Laser Scanning',
    title: '3D Laser Scanning Services | As-Built Company',
    description:
      '3D laser scanning services for existing buildings. Registered point clouds captured with the Leica BLK2GO and delivered as E57, RCP, or LAS, typically in 3 to 7 business days.',
    eyebrow: '3D Laser Scanning',
    h1Lead: '3D laser scanning for',
    h1Accent: 'existing buildings.',
    lead: 'We capture interiors, exteriors, and full sites as a registered point cloud, a complete measured record your team can design, model, and verify against.',
    deliverables: [
      { title: 'Registered point cloud', text: 'One unified cloud in a single coordinate system, delivered as E57 plus the working format your software uses.' },
      { title: 'Autodesk-ready files', text: 'RCP and RCS files in your stated ReCap, Revit, or AutoCAD version, ready to link.' },
      { title: '360° imagery', text: 'Panoramic capture from the same visit, so the team can look around the site without traveling to it.' },
    ],
    sections: [
      {
        heading: 'What a laser scan gives you',
        paragraphs: [
          'A laser scanner measures millions of points on every surface it can see. The result is a point cloud: a three-dimensional record of the building as it stands today, not as the original drawings say it should be.',
          'Everything downstream is derived from that record. Floor plans, elevations, Revit models, area calculations, and clearance checks all come from the same dataset, and any question that comes up later can be answered from the file instead of a return trip to site.',
        ],
      },
      {
        heading: 'How we capture',
        paragraphs: [
          'We scan with the Leica BLK2GO, a handheld mobile-mapping scanner that captures at walking pace. That makes it well suited to occupied offices, retail during business hours, and active job sites, where a tripod set up in every room would be slow and disruptive.',
          'Scans are registered and checked in-house. Where a project calls for tighter tolerances or ties to survey control, we scope that at the quote stage so the capture method matches the accuracy you need.',
        ],
      },
      {
        heading: 'When to order a scan',
        paragraphs: [
          'Before a renovation, tenant improvement, or retrofit, when the existing drawings are missing or cannot be trusted. Before MEP coordination, when what is above the ceiling decides whether the design works. And any time you need a dated, measured record of a building: at purchase, before demolition, or at project closeout.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does a 3D laser scan take on site?',
        a: 'A residential floor plan up to about 3,000 SF typically takes half a day. A 10,000 SF commercial space is about a full day. Larger buildings, exteriors, and roofs scale from there.',
      },
      {
        q: 'Can you scan a building that is occupied?',
        a: 'Yes. Mobile scanning works around people and furniture, and we can schedule after hours or on weekends for sensitive spaces such as healthcare or secured facilities.',
      },
      {
        q: 'What file formats do you deliver?',
        a: 'E57 as the vendor-neutral archive copy, plus RCP and RCS for Autodesk software, or LAS and PTS on request. Tell us your software and version and we will match it.',
      },
      {
        q: 'How much does 3D laser scanning cost?',
        a: 'Price depends on square footage, scope of capture, deliverable, accuracy level, and site access. As-built packages start from $2,500 per project. Send an address and scope for a written quote within one business day.',
      },
    ],
    related: [
      { href: '/resources/cost-of-3d-laser-scanning/', label: 'How much does 3D laser scanning cost?' },
      { href: '/resources/point-cloud-file-formats-explained/', label: 'Point cloud file formats explained' },
      { href: '/resources/how-to-prepare-for-a-3d-laser-scan/', label: 'How to prepare your building for a scan' },
      { href: '/resources/matterport-vs-laser-scanning/', label: 'Matterport vs. survey-grade laser scanning' },
    ],
  },
  {
    slug: 'as-built-drawings',
    name: 'As-Built Drawings',
    title: 'As-Built Drawings & Existing-Conditions Plans | As-Built Company',
    description:
      'As-built drawings produced from 3D laser scans: floor plans, reflected ceiling plans, elevations, and sections in AutoCAD and PDF, typically delivered in 3 to 7 business days.',
    eyebrow: 'As-Built Drawings',
    h1Lead: 'As-built drawings you can',
    h1Accent: 'design from.',
    lead: 'Floor plans, reflected ceiling plans, elevations, and sections drawn from laser scan data, so the drawings match the building and not a decades-old permit set.',
    deliverables: [
      { title: 'Floor plans', text: 'Walls, doors, windows, columns, stairs, fixtures, and built-ins, dimensioned and layered for your CAD standards.' },
      { title: 'Ceilings, elevations, sections', text: 'Reflected ceiling plans, interior and exterior elevations, and building sections as your scope requires.' },
      { title: 'DWG, PDF, and the point cloud', text: 'AutoCAD files and PDFs for the team, plus the registered E57 behind them as the record.' },
    ],
    sections: [
      {
        heading: 'What as-built drawings are',
        paragraphs: [
          'As-built drawings document a building as it exists today. They are different from the original design drawings, which show intent, and from a contractor’s record set, which shows redlined changes at the end of one project. A measured as-built captures everything that has happened to the building since, including every tenant fit-out and field change.',
          'Ours are drawn directly over the point cloud. Every wall and opening on the plan can be traced back to measured data, and the cloud stays available to check anything the drawing does not show.',
        ],
      },
      {
        heading: 'Who orders them and why',
        paragraphs: [
          'Architects order as-builts before a renovation or addition so the design starts from real dimensions. Owners and property managers order them for leasing, space planning, and facility records. Homeowners and designers order them for remodels, ADUs, and permit submittals where the jurisdiction wants plans of the existing structure.',
        ],
      },
      {
        heading: 'Scoping the right set',
        paragraphs: [
          'Not every project needs every sheet. A lease exhibit needs a floor plan. A restaurant buildout needs the ceiling plan and what is above it. A facade project needs exterior elevations. We scope the set to how the drawings will be used, and anything left out can be drawn later from the same scan without another site visit.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long do as-built drawings take?',
        a: 'Standard 2D as-built floor plans are typically delivered 3 to 7 business days after the site visit. Rush turnaround of 24 to 72 hours is available for listing plans and permit deadlines at a premium rate.',
      },
      {
        q: 'What is the difference between as-built drawings and record drawings?',
        a: 'Record drawings are the contractor’s marked-up set at the close of a project. As-built drawings are field-measured documents of the building as it exists now, produced at any point in its life.',
      },
      {
        q: 'What formats do you deliver?',
        a: 'AutoCAD DWG and PDF as standard, with DXF on request. If your team works in Revit, we can deliver a model instead of, or alongside, 2D drawings.',
      },
      {
        q: 'How much do as-built drawings cost?',
        a: 'Residential floor plans start from $499 for up to 3,000 SF. Full as-built packages with scan, 2D drawings, and point cloud start from $2,500 per project. Every quote is fixed-price once the scope is defined.',
      },
    ],
    related: [
      { href: '/resources/ultimate-guide-as-built-drawings/', label: 'The ultimate guide to as-built drawings' },
      { href: '/resources/as-built-drawings-for-tenant-improvements/', label: 'As-built drawings for tenant improvements' },
      { href: '/resources/as-built-drawings-for-adu/', label: 'As-built drawings for an ADU' },
      { href: '/resources/as-built-request-checklist/', label: 'As-built drawing request checklist' },
    ],
  },
  {
    slug: 'scan-to-bim',
    name: 'Scan-to-BIM Modeling',
    title: 'Scan-to-BIM Services: Revit Models from Laser Scans | As-Built Company',
    description:
      'Scan-to-BIM services: Revit models of existing buildings built from registered laser scan data, LOD 200 to LOD 400, delivered in your Revit version.',
    eyebrow: 'Scan-to-BIM',
    h1Lead: 'Revit models built from',
    h1Accent: 'real conditions.',
    lead: 'We turn laser scan data into a Revit model of the building as it stands, at the level of development your project needs and no more.',
    deliverables: [
      { title: 'Revit model', text: 'Architecture, structure, and MEP as scoped, LOD 200 through LOD 400, in your target Revit version.' },
      { title: 'Linked point cloud', text: 'The registered cloud delivered with the model, so anything can be checked against the measured data.' },
      { title: 'Open formats', text: 'IFC and NWC exports for teams coordinating outside Revit.' },
    ],
    sections: [
      {
        heading: 'From point cloud to model',
        paragraphs: [
          'Scan-to-BIM starts with a registered point cloud of the building. Modelers then build Revit elements against that cloud: walls, floors, structure, openings, and, where scoped, ductwork, piping, and equipment. The finished model is checked back against the cloud before delivery.',
          'The scan and the model are produced by the same team here, so questions about what the data shows do not get lost between a scanning vendor and a separate modeling shop.',
        ],
      },
      {
        heading: 'Choosing the level of development',
        paragraphs: [
          'Most renovation design is well served by LOD 300 architecture and structure. Trade coordination usually needs LOD 350 for the systems involved. LOD 400 is for fabrication and is rarely needed across a whole building.',
          'The most cost-effective scopes set the level by discipline and by area: more detail where work is happening, less where it is not. Anything left unmodeled remains in the point cloud and can be added later.',
        ],
      },
      {
        heading: 'When a model is worth it',
        paragraphs: [
          'A Revit model earns its cost when the project needs clash detection, MEP coordination, phased design across disciplines, or a baseline for facility management. For permit sets, lease exhibits, and small renovations, 2D as-built drawings are usually the better buy.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What LOD do you model to?',
        a: 'LOD 200 through LOD 400, depending on intended use. Most existing-conditions renovation work uses LOD 300 for architecture. We recommend specifying LOD by discipline and area to control cost.',
      },
      {
        q: 'How long does a scan-to-BIM model take?',
        a: 'Revit models and MEP coordination projects typically run 2 to 4 weeks from the site visit, depending on building size and scope.',
      },
      {
        q: 'Which Revit version do you deliver in?',
        a: 'Whichever your team uses. Revit files are not backward compatible, so tell us the year up front.',
      },
      {
        q: 'Is LOD the same as accuracy?',
        a: 'No. LOD describes how much is modeled and in what detail. Accuracy is specified separately using USIBD Level of Accuracy, for example LOA 30. A complete scope states both.',
      },
    ],
    related: [
      { href: '/resources/scan-to-bim-workflow/', label: 'Scan-to-BIM: how a point cloud becomes a Revit model' },
      { href: '/resources/lod-200-300-350-400-explained/', label: 'LOD 200 vs 300 vs 350 vs 400 explained' },
      { href: '/resources/2d-vs-3d-as-built-drawings/', label: '2D vs 3D as-built drawings' },
      { href: '/resources/mep-retrofit-scanning/', label: 'Scanning for MEP retrofits' },
    ],
  },
  {
    slug: '360-virtual-tours',
    name: '360° Virtual Tours',
    title: '360° Virtual Tours for Buildings & Job Sites | As-Built Company',
    description:
      '360° virtual tours of buildings and job sites, captured with Insta360 cameras and hosted for viewing in any browser. Add a tour to a laser scan in the same site visit.',
    eyebrow: '360° Virtual Tours',
    h1Lead: 'Walk the site from',
    h1Accent: 'any browser.',
    lead: 'Interactive 360° walkthroughs that let owners, designers, and remote stakeholders see a space as it is, without scheduling a site visit.',
    deliverables: [
      { title: 'Hosted walkthrough', text: 'A shareable link that opens in any browser, with no app or account needed to view it.' },
      { title: 'Room-by-room navigation', text: 'Stops placed through the space so viewers can move through it the way they would on foot.' },
      { title: 'Same-visit capture', text: 'Add a tour to a laser scan and get both from one mobilization.' },
    ],
    sections: [
      {
        heading: 'What a virtual tour is for',
        paragraphs: [
          'A 360° tour is a visual record. It answers questions like what the ceiling looks like in the back corridor or where the panel is, without anyone driving to site. Design teams use it alongside drawings, owners use it to brief remote decision makers, and contractors use it to record conditions before and during work.',
        ],
      },
      {
        heading: 'Tours are for looking, scans are for measuring',
        paragraphs: [
          'A tour shows a space. It is not a measuring tool, and nobody should design or fabricate from it. When dimensions matter, pair the tour with a laser scan: the point cloud carries the measurements and the tour carries the context.',
          'Because we capture both in one visit, adding a tour to a scanning project is far cheaper than commissioning it separately.',
        ],
      },
      {
        heading: 'Common uses',
        paragraphs: [
          'Pre-construction records of existing conditions. Progress documentation at project milestones. Remote walkthroughs for out-of-town owners and consultants. Property marketing and leasing. Facility records for maintenance and training.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do viewers need special software?',
        a: 'No. Tours are hosted online and open from a link in any modern browser, on a computer or phone.',
      },
      {
        q: 'Can I measure from a virtual tour?',
        a: 'Not reliably. A tour is a visual record. For dimensions you can design or build from, order a laser scan with it. Both are captured in the same visit.',
      },
      {
        q: 'Is a tour included with a laser scan?',
        a: 'A 360° virtual tour is included in our As-Built Package. It can also be ordered on its own.',
      },
    ],
    related: [
      { href: '/resources/matterport-vs-laser-scanning/', label: 'Matterport vs. survey-grade laser scanning' },
      { href: '/services/3d-laser-scanning/', label: '3D laser scanning services' },
      { href: '/projects/', label: 'See recent projects' },
    ],
  },
  {
    slug: 'real-estate-floor-plans',
    name: 'Real Estate Floor Plans',
    title: 'Real Estate Floor Plans & Lease Drawings | As-Built Company',
    description:
      'Dimensioned floor plans for listings, lease exhibits, and property records. Measured on site and typically delivered within 48 hours, from $499 for residential properties.',
    eyebrow: 'Real Estate Floor Plans',
    h1Lead: 'Measured floor plans in',
    h1Accent: '48 hours.',
    lead: 'Dimensioned 2D floor plans for listings, lease drawings, and property records, measured on site and typically delivered within 48 hours of capture.',
    deliverables: [
      { title: 'Dimensioned floor plan', text: 'A clean 2D plan with room labels and dimensions, delivered as PDF.' },
      { title: 'Fast turnaround', text: 'Standard delivery within 48 hours of the site visit for residential properties.' },
      { title: 'Room to grow', text: 'Because the plan comes from a scan, it can be upgraded to full as-built drawings later without a second visit.' },
    ],
    sections: [
      {
        heading: 'Who uses them',
        paragraphs: [
          'Listing agents use floor plans to help buyers understand a layout before they visit. Commercial brokers and landlords use them as lease exhibits and for marketing vacant suites. Owners and property managers keep them as the baseline record of each property.',
        ],
      },
      {
        heading: 'Measured, not sketched',
        paragraphs: [
          'Our plans are drawn from scan data captured on site, not traced from an old drawing or estimated from photos. That matters when the plan ends up attached to a lease, used to price flooring, or handed to a designer as a starting point.',
        ],
      },
      {
        heading: 'Commercial and lease work',
        paragraphs: [
          'For commercial space, the same site visit can support suite plans, demising exhibits, and area calculations to the BOMA standard your lease references. Tell us what the drawing will be attached to and we will scope it to suit.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does a floor plan cost?',
        a: 'Residential floor plans start from $499 per property, with up to 3,000 SF included. Larger homes and commercial spaces are quoted by scope.',
      },
      {
        q: 'How fast can I get it?',
        a: 'Standard turnaround is 48 hours from the site visit for residential floor plans. Rush options are available for listing deadlines.',
      },
      {
        q: 'Can the floor plan be used for permits or design?',
        a: 'A listing floor plan is a marketing and reference document. If you need plans for a permit submittal or renovation design, ask for as-built drawings, which can be produced from the same scan.',
      },
    ],
    related: [
      { href: '/resources/boma-area-measurement-explained/', label: 'BOMA area measurement explained' },
      { href: '/services/as-built-drawings/', label: 'As-built drawing services' },
      { href: '/pricing/', label: 'Pricing' },
    ],
  },
];
