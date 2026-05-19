import type { Job } from '@/data/jobs'

interface JobCardProps {
  job: Job
  isSaved: boolean
  isApplied: boolean
  onClick: () => void
  onSave: () => void
  onHide: () => void
  onApply: () => void
}

export default function JobCard({ job, isSaved, isApplied, onClick, onSave, onHide, onApply }: JobCardProps) {
  const logoUrl = job.logo || `https://www.google.com/s2/favicons?domain=${job.companyDomain || job.company.toLowerCase().replace(/\s+/g, '') + '.com'}&sz=128`

  return (
    <div
      className="group bg-slate-800/20 border border-slate-700/30 rounded-2xl p-5 hover:bg-slate-800/40 hover:border-slate-600/50 transition-all duration-200 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-600/30 flex items-center justify-center overflow-hidden shrink-0">
          {job.logo ? (
            <img src={logoUrl} alt={job.company} className="w-8 h-8 object-contain" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
              ;(e.target as HTMLImageElement).parentElement!.innerHTML = job.company.charAt(0)
            }} />
          ) : (
            <span className="text-lg font-bold text-indigo-400">{job.company.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition text-base">
                  {job.title}
                </h3>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide border border-emerald-500/20">
                  Sponsorship
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-400">
                <span className="font-medium text-slate-300">{job.company}</span>
                <span className="text-slate-600">·</span>
                <span>{job.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onSave}
                className={`p-2 rounded-lg transition ${
                  isSaved ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700/30 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
                }`}
                title={isSaved ? 'Unsave' : 'Save'}
              >
                <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button
                onClick={onHide}
                className="p-2 rounded-lg bg-slate-700/30 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition"
                title="Hide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
              job.workType === 'Remote' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
              job.workType === 'Hybrid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
              'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {job.workType}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/30 text-slate-400 border border-slate-600/30">
              {job.employmentType}
            </span>
            {job.experience && (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/30 text-slate-400 border border-slate-600/30">
                {job.experience}
              </span>
            )}
            {job.salary && (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                {job.salary}
              </span>
            )}
            <span className="text-xs text-slate-500 ml-auto">{job.postedAgo}</span>
          </div>

          {job.description && (
            <p className="text-sm text-slate-400 mt-3 line-clamp-2 leading-relaxed">
              {job.description}
            </p>
          )}

          {job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-slate-700/30 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-600/20"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="text-xs text-slate-500 px-2 py-1">
                  +{job.skills.length - 5} more
                </span>
              )}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              via {job.url.includes('linkedin') ? 'LinkedIn' : job.url.includes('indeed') ? 'Indeed' : job.url.includes('glassdoor') ? 'Glassdoor' : job.company}
            </div>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); onApply(); }}
              className={`text-sm font-medium px-4 py-1.5 rounded-lg transition ${
                isApplied
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20'
              }`}
            >
              {isApplied ? 'Applied' : 'Apply →'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
