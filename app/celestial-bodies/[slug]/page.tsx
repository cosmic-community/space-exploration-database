// app/celestial-bodies/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cosmic } from '@/lib/cosmic';
import type { CelestialBody } from '@/types';

interface CelestialBodyPageProps {
  params: Promise<{ slug: string }>;
}

async function getCelestialBody(slug: string): Promise<CelestialBody | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'celestial-bodies', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return object as CelestialBody;
  } catch (error) {
    if ((error as any)?.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function CelestialBodyPage({ params }: CelestialBodyPageProps) {
  // In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const celestialBody = await getCelestialBody(slug);

  if (!celestialBody) {
    notFound();
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/celestial-bodies"
          className="inline-flex items-center text-purple-300 hover:text-white transition-colors mb-8 group"
        >
          <svg className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Celestial Bodies
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {celestialBody.metadata.name || celestialBody.title}
            </h1>
            {celestialBody.metadata.type && (
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-full text-lg text-purple-300">
                  {celestialBody.metadata.type.value || celestialBody.metadata.type} 🌌
                </span>
              </div>
            )}
          </div>

          {/* Main image */}
          {celestialBody.metadata.image?.imgix_url && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={`${celestialBody.metadata.image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={celestialBody.metadata.name || celestialBody.title}
                className="w-full h-96 object-cover"
                width={1200}
                height={600}
              />
            </div>
          )}

          {/* Key information cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {celestialBody.metadata.distance_from_earth && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Distance from Earth</h3>
                <p className="text-white text-xl">{celestialBody.metadata.distance_from_earth}</p>
              </div>
            )}

            {celestialBody.metadata.diameter && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Diameter</h3>
                <p className="text-white text-xl">{celestialBody.metadata.diameter}</p>
              </div>
            )}

            {celestialBody.metadata.discovery_date && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Discovery Date</h3>
                <p className="text-white text-xl">{formatDate(celestialBody.metadata.discovery_date)}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {celestialBody.metadata.description && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Description</h2>
              <div 
                className="text-slate-300 prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: celestialBody.metadata.description.replace(/\n/g, '<br />') 
                }}
              />
            </div>
          )}

          {/* Key Facts */}
          {celestialBody.metadata.key_facts && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Key Facts</h2>
              <div className="text-slate-300 space-y-2">
                {celestialBody.metadata.key_facts.split('\n').map((fact, index) => (
                  <p key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2 mt-1">•</span>
                    <span>{fact.replace(/^•\s*/, '')}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}