import { createBucketClient } from '@cosmicjs/sdk'
import type { Mission, Astronaut, CelestialBody } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all missions
export async function getMissions(): Promise<Mission[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'missions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Mission[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching missions:', error);
    throw new Error('Failed to fetch missions');
  }
}

// Fetch single mission by slug
export async function getMission(slug: string): Promise<Mission | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'missions', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as Mission;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching mission:', error);
    throw new Error(`Failed to fetch mission: ${slug}`);
  }
}

// Fetch all astronauts
export async function getAstronauts(): Promise<Astronaut[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'astronauts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Astronaut[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching astronauts:', error);
    throw new Error('Failed to fetch astronauts');
  }
}

// Fetch single astronaut by slug
export async function getAstronaut(slug: string): Promise<Astronaut | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'astronauts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as Astronaut;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching astronaut:', error);
    throw new Error(`Failed to fetch astronaut: ${slug}`);
  }
}

// Fetch all celestial bodies
export async function getCelestialBodies(): Promise<CelestialBody[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'celestial-bodies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as CelestialBody[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching celestial bodies:', error);
    throw new Error('Failed to fetch celestial bodies');
  }
}

// Fetch single celestial body by slug
export async function getCelestialBody(slug: string): Promise<CelestialBody | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'celestial-bodies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as CelestialBody;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching celestial body:', error);
    throw new Error(`Failed to fetch celestial body: ${slug}`);
  }
}