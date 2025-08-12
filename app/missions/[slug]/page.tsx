// app/missions/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMission } from '@/lib/cosmic'
import type { Mission } from '@/types'

interface MissionPageProps {
  params: Promise<{ slug: string }>
}

export default async function MissionPage({ params }: MissionPageProps) {
  const { slug } = await params
  const mission = await getMission(slug)

  if (!mission) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/missions" 
          className="inline-flex items-center text-slate-300 hover:text-star-yellow transition-colors duration-200 mb-8"
        >
          ← Back to Missions
        </Link>

        {/* Mission Header */}
        <div className="cosmic-card mb-8">
          {mission.metadata.mission_image && (
            <img
              src={`${mission.metadata.mission_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={mission.title}
              width={600}
              height={300}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            />
          )}

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {mission.title}
              </h1>
              {mission.metadata.mission_status && (
                <span className={`cosmic-badge status-${mission.metadata.mission_status.key} flex-shrink-0`}>
                  {mission.metadata.mission_status.value}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {mission.metadata.agency && (
                <div>
                  <span className="text-slate-400 font-medium">Space Agency:</span>
                  <span className="text-slate-200 ml-2">{mission.metadata.agency}</span>
                </div>
              )}

              {mission.metadata.launch_date && (
                <div>
                  <span className="text-slate-400 font-medium">Launch Date:</span>
                  <span className="text-slate-200 ml-2">
                    {new Date(mission.metadata.launch_date).toLocaleDateString()}
                  </span>
                </div>
              )}

              {mission.metadata.destination && (
                <div>
                  <span className="text-slate-400 font-medium">Destination:</span>
                  <span className="text-slate-200 ml-2 capitalize">{mission.metadata.destination}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mission Objectives */}
        {mission.metadata.mission_objectives && (
          <div className="cosmic-card mb-8">
            <h2 className="text-2xl font-semibold text-star-yellow mb-4">Mission Objectives</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {mission.metadata.mission_objectives}
            </p>
          </div>
        )}

        {/* Mission Description */}
        {mission.metadata.mission_description && (
          <div className="cosmic-card mb-8">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: mission.metadata.mission_description.replace(/\n/g, '<br />') 
              }}
            />
          </div>
        )}

        {/* Crew Members */}
        {mission.metadata.crew_members && mission.metadata.crew_members.length > 0 && (
          <div className="cosmic-card">
            <h2 className="text-2xl font-semibold text-star-yellow mb-6">Crew Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mission.metadata.crew_members.map((member) => (
                <Link
                  key={member.id}
                  href={`/astronauts/${member.slug}`}
                  className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors duration-200"
                >
                  {member.metadata?.portrait && (
                    <img
                      src={`${member.metadata.portrait.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                      alt={member.title}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded-full mb-3 mx-auto"
                    />
                  )}
                  <div className="text-center">
                    <h3 className="text-white font-medium mb-1">{member.title}</h3>
                    {member.metadata?.nationality && (
                      <p className="text-slate-400 text-sm">{member.metadata.nationality}</p>
                    )}
                    {member.metadata?.space_agency && (
                      <p className="text-slate-400 text-sm">{member.metadata.space_agency}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: MissionPageProps) {
  const { slug } = await params
  const mission = await getMission(slug)

  if (!mission) {
    return {
      title: 'Mission Not Found',
    }
  }

  return {
    title: `${mission.title} | Space Exploration Database`,
    description: mission.metadata.mission_objectives || `Learn about the ${mission.title} space mission.`,
  }
}