// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
  published_at?: string;
  status?: string;
}

// Mission interface
interface Mission extends CosmicObject {
  type: 'missions';
  metadata: {
    mission_name?: string;
    agency?: string;
    launch_date?: string;
    mission_status?: {
      key: MissionStatus;
      value: string;
    };
    destination?: string;
    mission_objectives?: string;
    mission_description?: string;
    mission_image?: {
      url: string;
      imgix_url: string;
    };
    crew_members?: Astronaut[];
  };
}

// Astronaut interface
interface Astronaut extends CosmicObject {
  type: 'astronauts';
  metadata: {
    full_name?: string;
    nationality?: string;
    birth_date?: string;
    space_agency?: string;
    total_time_in_space?: string;
    number_of_spaceflights?: number;
    biography?: string;
    major_achievements?: string;
    portrait?: {
      url: string;
      imgix_url: string;
    };
    still_active?: boolean;
  };
}

// Celestial Body interface
interface CelestialBody extends CosmicObject {
  type: 'celestial-bodies';
  metadata: {
    name?: string;
    type?: string | {
      key: CelestialBodyType;
      value: string;
    };
    distance_from_earth?: string;
    diameter?: string;
    discovery_date?: string;
    description?: string;
    key_facts?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Type literals for select-dropdown values
type MissionStatus = 'planned' | 'active' | 'completed' | 'cancelled';
type CelestialBodyType = 'planet' | 'moon' | 'asteroid' | 'star' | 'galaxy' | 'nebula';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime type checking
function isMission(obj: CosmicObject): obj is Mission {
  return obj.type === 'missions';
}

function isAstronaut(obj: CosmicObject): obj is Astronaut {
  return obj.type === 'astronauts';
}

function isCelestialBody(obj: CosmicObject): obj is CelestialBody {
  return obj.type === 'celestial-bodies';
}

// Utility types
type CreateMissionData = Omit<Mission, 'id' | 'created_at' | 'modified_at'>;
type CreateAstronautData = Omit<Astronaut, 'id' | 'created_at' | 'modified_at'>;
type CreateCelestialBodyData = Omit<CelestialBody, 'id' | 'created_at' | 'modified_at'>;

export type {
  CosmicObject,
  Mission,
  Astronaut,
  CelestialBody,
  CosmicResponse,
  CreateMissionData,
  CreateAstronautData,
  CreateCelestialBodyData,
  MissionStatus,
  CelestialBodyType,
};

export {
  isMission,
  isAstronaut,
  isCelestialBody,
};