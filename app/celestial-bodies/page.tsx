import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { CelestialBody, CosmicResponse } from '@/types';

async function getCelestialBodies(): Promise<CelestialBody[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'celestial-bodies' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1) as CosmicResponse<CelestialBody>;
    
    return objects;
  } catch (error) {
    // Handle 404 error when no celestial bodies are found
    if ((error as any)?.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function CelestialBodiesPage() {
  const celestialBodies = await getCelestialBodies();

  // Helper function to get display value for type field
  const getTypeDisplay = (type: string | { key: string; value: string } | undefined): string => {
    if (!type) return '';
    if (typeof type === 'string') return type;
    return type.value || type.key || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🪐 Celestial Bodies
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore the wonders of our universe - from nearby planets and moons to distant galaxies and nebulae.
          </p>
        </div>

        {celestialBodies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🌌</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              No celestial bodies found
            </h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">
              The cosmic database is currently empty. Check back soon as we populate our celestial catalog!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celestialBodies.map((body) => (
              <Link
                key={body.id}
                href={`/celestial-bodies/${body.slug}`}
                className="group block"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                  {body.metadata.image?.imgix_url && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={`${body.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                        alt={body.metadata.name || body.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        width={300}
                        height={200}
                      />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {body.metadata.name || body.title}
                  </h3>
                  
                  {body.metadata.type && (
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-purple-600/20 border border-purple-400/30 rounded-full text-sm text-purple-300">
                        {getTypeDisplay(body.metadata.type)}
                      </span>
                    </div>
                  )}
                  
                  {body.metadata.distance_from_earth && (
                    <p className="text-slate-300 text-sm mb-2">
                      <strong className="text-white">Distance:</strong> {body.metadata.distance_from_earth}
                    </p>
                  )}
                  
                  {body.metadata.diameter && (
                    <p className="text-slate-300 text-sm mb-4">
                      <strong className="text-white">Diameter:</strong> {body.metadata.diameter}
                    </p>
                  )}
                  
                  <div className="flex items-center text-purple-300 text-sm font-medium">
                    Learn more
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}