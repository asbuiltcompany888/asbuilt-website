// Nellie Gail Estate — simplified floor plan wall segments
// Coordinates in arbitrary units (1 unit ~= 4 feet)
// Origin (0,0) at top-left. Walls are line segments {x1, z1, x2, z2}
// Wall height Y = 3 units, thickness 0.18 units

export interface WallSegment {
  x1: number;
  z1: number;
  x2: number;
  z2: number;
}

// Multi-wing luxury estate: main body + east bedroom wing + west garage + entry courtyard
export const NELLIE_GAIL_WALLS: WallSegment[] = [
  // ---- Main body outer perimeter (28 wide x 18 deep) ----
  { x1: 0, z1: 0, x2: 28, z2: 0 }, // front (top)
  { x1: 28, z1: 0, x2: 28, z2: 4 }, // right (upper)
  { x1: 28, z1: 8, x2: 28, z2: 18 }, // right (lower) - gap for east wing
  { x1: 28, z1: 18, x2: 0, z2: 18 }, // back
  { x1: 0, z1: 18, x2: 0, z2: 0 }, // left

  // ---- Interior main body: foyer + great room + kitchen + dining ----
  // Foyer walls (center front)
  { x1: 11, z1: 0, x2: 11, z2: 6 },
  { x1: 17, z1: 0, x2: 17, z2: 6 },
  { x1: 11, z1: 6, x2: 13.5, z2: 6 }, // opening gap
  { x1: 14.5, z1: 6, x2: 17, z2: 6 },

  // Great room (right of foyer)
  { x1: 17, z1: 6, x2: 28, z2: 6 },
  { x1: 22, z1: 6, x2: 22, z2: 12 }, // internal divider partial
  { x1: 22, z1: 14, x2: 22, z2: 18 },

  // Kitchen (behind great room)
  { x1: 17, z1: 12, x2: 22, z2: 12 },
  { x1: 22, z1: 12, x2: 28, z2: 12 },

  // Dining (left of foyer)
  { x1: 0, z1: 6, x2: 11, z2: 6 },
  { x1: 5, z1: 6, x2: 5, z2: 12 }, // wall between dining and living

  // Living (behind dining)
  { x1: 0, z1: 12, x2: 5, z2: 12 },
  { x1: 5, z1: 12, x2: 11, z2: 12 },
  { x1: 11, z1: 6, x2: 11, z2: 18 }, // internal wall

  // ---- East bedroom wing extending right (28-42 x 4-14) ----
  { x1: 28, z1: 4, x2: 42, z2: 4 }, // wing front
  { x1: 42, z1: 4, x2: 42, z2: 14 }, // wing right
  { x1: 42, z1: 14, x2: 28, z2: 14 }, // wing back
  { x1: 28, z1: 8, x2: 42, z2: 8 }, // divider between bedrooms
  { x1: 33, z1: 4, x2: 33, z2: 8 }, // bedroom 1 wall
  { x1: 33, z1: 8, x2: 33, z2: 14 }, // bedroom 2 wall
  { x1: 37.5, z1: 4, x2: 37.5, z2: 8 }, // master closet
  { x1: 37.5, z1: 8, x2: 37.5, z2: 14 }, // master bath

  // ---- Master suite (rear of main body) ----
  { x1: 11, z1: 14, x2: 22, z2: 14 }, // master bedroom wall
  { x1: 14, z1: 14, x2: 14, z2: 18 }, // master closet divider
  { x1: 18, z1: 14, x2: 18, z2: 18 }, // master bath divider

  // ---- West garage wing (-11 to 0, z 4-16) ----
  { x1: -11, z1: 4, x2: 0, z2: 4 }, // garage front
  { x1: -11, z1: 4, x2: -11, z2: 16 }, // garage left
  { x1: -11, z1: 16, x2: 0, z2: 16 }, // garage back
  { x1: -6, z1: 4, x2: -6, z2: 16 }, // 3-car garage divider

  // ---- Entry courtyard (in front of foyer) ----
  { x1: 8, z1: -5, x2: 8, z2: 0 }, // courtyard left
  { x1: 8, z1: -5, x2: 20, z2: -5 }, // courtyard front
  { x1: 20, z1: -5, x2: 20, z2: 0 }, // courtyard right

  // ---- Rear patio walls (visual detail) ----
  { x1: 0, z1: 22, x2: 22, z2: 22 }, // patio back
  { x1: 0, z1: 18, x2: 0, z2: 22 },
  { x1: 22, z1: 18, x2: 22, z2: 22 },

  // ---- Auxiliary walls (guest suite, mudroom) ----
  { x1: 25, z1: 12, x2: 25, z2: 18 }, // mudroom divider
  { x1: 25, z1: 15, x2: 28, z2: 15 }, // mudroom internal

  // ---- Small architectural details ----
  { x1: 2, z1: 3, x2: 4, z2: 3 }, // niche
  { x1: 30, z1: 6, x2: 32, z2: 6 }, // closet
  { x1: 38, z1: 10, x2: 40, z2: 10 }, // small closet
];

// Center point for camera targeting (computed from bounds)
export const FLOOR_PLAN_CENTER = { x: 15.5, z: 8.5 };
export const FLOOR_PLAN_BOUNDS = { minX: -11, maxX: 42, minZ: -5, maxZ: 22 };
