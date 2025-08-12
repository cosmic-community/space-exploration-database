// app/astronauts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAstronaut } from '@/lib/cosmic'
import type { Astronaut } from '@/types'

interface AstronautPageProps {
  params: Promise<{ slug: string }>
}

export default async function AstronautPage({ params }: AstronautPageProps) {
  const { slug } = await params
  const astronaut = await getAstronaut(slug)

  if (!astronaut) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/astronauts" 
          className="inline-flex items-center text-slate-300 hover:text-star-yellow transition-colors duration-200 mb-8"
        >
          ← Back to Astronauts
        </Link>

        {/* Astronaut Header */}
        <div className="cosmic-card mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {astronaut.metadata.portrait && (
              <div className="lg:col-span-1">
                <img
                  src={`${astronaut.metadata.portrait.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={astronaut.title}
                  width={400}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className={`${astronaut.metadata.portrait ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {astronaut.title}
                  </h1>
                  {astronaut.metadata.full_name && astronaut.metadata.full_name !== astronaut.title && (
                    <p className="text-xl text-slate-300">{astronaut.metadata.full_name}</p>
                  )}
                </div>
                {astronaut.metadata.still_active && (
                  <span className="cosmic-badge bg-green-100 text-green-800 flex-shrink-0">
                    Currently Active
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {astronaut.metadata.nationality && (
                  <div>
                    <span className="text-slate-400 font-medium">Nationality:</span>
                    <span className="text-slate-200 ml-2">{astronaut.metadata.nationality}</span>
                  </div>
                )}

                {astronaut.metadata.space_agency && (
                  <div>
                    <span className="text-slate-400 font-medium">Space Agency:</span>
                    <span className="text-slate-200 ml-2">{astronaut.metadata.space_agency}</span>
                  </div>
                )}

                {astronaut.metadata.birth_date && (
                  <div>
                    <span className="text-slate-400 font-medium">Birth Date:</span>
                    <span className="text-slate-200 ml-2">
                      {new Date(astronaut.metadata.birth_date).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {astronaut.metadata.number_of_spaceflights && (
                  <div>
                    <span className="text-slate-400 font-medium">Spaceflights:</span>
                    <span className="text-star-yellow ml-2 font-semibold">
                      {astronaut.metadata.number_of_spaceflights}
                    </span>
                  </div>
                )}

                {astronaut.metadata.total_time_in_space && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-medium">Total Time in Space:</span>
                    <span className="text-star-yellow ml-2 font-semibold">
                      {astronaut.metadata.total_time_in_space}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biography */}
        {astronaut.metadata.biography && (
          <div className="cosmic-card mb-8">
            <h2 className="text-2xl font-semibold text-star-yellow mb-6">Biography</h2>
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: astronaut.metadata.biography.replace(/\n/g, '<br />') 
              }}
            />
          </div>
        )}

        {/* Major Achievements */}
        {astronaut.metadata.major_achievements && (
          <div className="cosmic-card">
            <h2 className="text-2xl font-semibold text-star-yellow mb-6">Major Achievements</h2>
            <div className="text-slate-300 leading-relaxed">
              {astronaut.metadata.major_achievements.split('\n').map((achievement, index) => {
                if (achievement.trim().startsWith('•')) {
                  return (
                    <div key={index} className="flex items-start mb-2">
                      <span className="text-star-yellow mr-3 mt-1">✦</span>
                      <span>{achievement.replace('•', '').trim()}</span>
                    </div>
                  )
                }
                return achievement.trim() ? (
                  <p key={index} className="mb-3">{achievement}</p>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: AstronautPageProps) {
  const { slug } = await params
  const astronaut = await getAstronaut(slug)

  if (!astronaut) {
    return {
      title: 'Astronaut Not Found',
    }
  }

  return {
    title: `${astronaut.title} | Space Exploration Database`,
    description: astronaut.metadata.biography 
      ? astronaut.metadata.biography.slice(0, 160) + '...'
      : `Learn about ${astronaut.title}, space explorer and astronaut.`,
  }
}