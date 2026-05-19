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
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition cursor-pointer group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0" onClick={onClick}>
          <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-lg font-bold text-blue-400 shrink-0">
            {job.company.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                {job.title}
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium">
                Visa Sponsorship
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
              <span className="font-medium text-slate-300">{job.company}</span>
              <span>·</span>
              <span>{job.location}</span>
              <span>·</span>
              <span>{job.postedAgo}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                job.workType === 'Remote' ? 'bg-purple-500/20 text-purple-400' :
                job.workType === 'Hybrid' ? 'bg-amber-500/20 text-amber-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {job.workType}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                {job.employmentType}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                {job.experience}
              </span>
              {job.salary && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                  {job.salary}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 6 && (
                <span className="text-xs text-slate-500 px-2 py-1">
                  +{job.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onSave}
            className={`p-2 rounded-lg transition ${
              isSaved ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-400 hover:text-white'
            }`}
            title={isSaved ? 'Unsave' : 'Save'}
          >
            <svg className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button
            onClick={onHide}
            className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white transition"
            title="Hide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); onApply(); }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition text-center font-medium"
          >
            {isApplied ? 'Applied' : 'Apply'}
          </a>
        </div>
      </div>
    </div>
  )
}
