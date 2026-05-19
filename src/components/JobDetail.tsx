import type { Job } from '@/data/jobs'

interface JobDetailProps {
  job: Job
  isSaved: boolean
  isApplied: boolean
  onSave: () => void
  onApply: () => void
}

export default function JobDetail({ job, isSaved, isApplied, onSave, onApply }: JobDetailProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-700 flex items-center justify-center text-2xl font-bold text-blue-400">
              {job.company.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-white">{job.title}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
                  Visa Sponsorship
                </span>
              </div>
              <p className="text-slate-400 mt-1">{job.company}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                <span>{job.location}</span>
                <span>·</span>
                <span className={`px-2 py-0.5 rounded-full ${
                  job.workType === 'Remote' ? 'bg-purple-500/20 text-purple-400' :
                  job.workType === 'Hybrid' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {job.workType}
                </span>
                <span>·</span>
                <span>{job.experience}</span>
                {job.salary && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">{job.salary}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onSave}
              className={`px-4 py-2 rounded-lg border transition ${
                isSaved
                  ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                  : 'border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onApply}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition font-medium"
            >
              {isApplied ? 'Applied' : 'Apply Now'}
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">About the Role</h2>
          <p className="text-slate-300 leading-relaxed">{job.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Department</p>
            <p className="text-sm font-medium text-white">{job.department}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Work Type</p>
            <p className="text-sm font-medium text-white">{job.workType}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Experience</p>
            <p className="text-sm font-medium text-white">{job.experience}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">Sponsorship</p>
            <p className="text-sm font-medium text-emerald-400">Available</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">About {job.company}</h2>
          <p className="text-slate-300">{job.companyDescription}</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700/50">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onApply}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition font-medium text-center"
          >
            {isApplied ? 'Applied - View Posting' : 'Apply Now'}
          </a>
          <button
            onClick={onSave}
            className={`px-6 py-3 rounded-xl border transition ${
              isSaved
                ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                : 'border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
        </div>
      </div>
    </div>
  )
}
