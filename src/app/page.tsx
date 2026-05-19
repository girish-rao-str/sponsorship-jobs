'use client'

import { useState, useEffect, useMemo } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import JobCard from '@/components/JobCard'
import JobDetail from '@/components/JobDetail'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'
import { jobs as staticJobs, countries, workTypes, departments, experienceLevels } from '@/data/jobs'
import type { Job } from '@/data/jobs'

interface APIJob {
  job_id: string
  employer_name: string
  employer_logo: string | null
  job_title: string
  job_description: string
  job_city: string
  job_state: string
  job_country: string
  job_employment_type: string
  job_is_remote: boolean
  job_posted_at_datetime_utc: string
  job_min_salary: number | null
  job_max_salary: number | null
  job_salary_currency: string
  job_salary_period: string
  job_required_skills: string[]
  job_apply_link: string
  job_publisher: string
}

function apiJobToJob(apiJob: APIJob, index: number): Job {
  const location = [apiJob.job_city, apiJob.job_state, apiJob.job_country].filter(Boolean).join(', ')
  const skills = apiJob.job_required_skills?.slice(0, 8) || []
  const postedAgo = getTimeAgo(apiJob.job_posted_at_datetime_utc)

  return {
    id: apiJob.job_id || `api-${index}`,
    title: apiJob.job_title,
    company: apiJob.employer_name,
    companyDomain: '',
    companyDescription: '',
    location: location || 'Remote',
    workType: apiJob.job_is_remote ? 'Remote' : 'Onsite',
    employmentType: (apiJob.job_employment_type as any) || 'Full Time',
    salary: apiJob.job_min_salary && apiJob.job_max_salary
      ? `${apiJob.job_salary_currency || ''}${apiJob.job_min_salary.toLocaleString()}-${apiJob.job_max_salary.toLocaleString()}/${apiJob.job_salary_period?.toLowerCase() || 'yr'}`
      : undefined,
    postedAgo,
    experience: '',
    description: apiJob.job_description?.substring(0, 300) || '',
    skills,
    sponsorship: true,
    countries: [apiJob.job_country],
    department: '',
    url: apiJob.job_apply_link,
    logo: apiJob.employer_logo || undefined,
  }
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All Countries')
  const [selectedWorkType, setSelectedWorkType] = useState('All Types')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedExperience, setSelectedExperience] = useState('All Levels')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set())
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [hiddenJobs, setHiddenJobs] = useState<Set<string>>(new Set())
  const [apiJobs, setApiJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [hasApiKey, setHasApiKey] = useState(true)

  useEffect(() => {
    fetch('/api/jobs?query=AI+security+cybersecurity+cloud&location=')
      .then(res => res.json())
      .then(data => {
        if (data.fallback) {
          setHasApiKey(false)
          setLoading(false)
          return
        }
        if (data.data) {
          const mapped = data.data.map((j: APIJob, i: number) => apiJobToJob(j, i))
          setApiJobs(mapped)
        }
        setLoading(false)
      })
      .catch(() => {
        setHasApiKey(false)
        setLoading(false)
      })
  }, [])

  const allJobs = useMemo(() => {
    const combined = hasApiKey ? [...apiJobs, ...staticJobs] : staticJobs
    const unique = combined.filter((job, index, self) =>
      index === self.findIndex(j => j.title === job.title && j.company === job.company)
    )
    return unique
  }, [apiJobs, staticJobs, hasApiKey])

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      if (hiddenJobs.has(job.id)) return false

      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesSearch =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)) ||
          job.description.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q)
        if (!matchesSearch) return false
      }

      if (selectedCountry !== 'All Countries') {
        if (!job.countries.includes(selectedCountry)) return false
      }

      if (selectedWorkType !== 'All Types') {
        if (job.workType !== selectedWorkType) return false
      }

      if (selectedDepartment !== 'All Departments' && job.department) {
        if (job.department !== selectedDepartment) return false
      }

      if (selectedExperience !== 'All Levels' && job.experience) {
        const jobExp = parseInt(job.experience)
        const filterExp = parseInt(selectedExperience)
        if (jobExp < filterExp) return false
      }

      return true
    })
  }, [searchQuery, selectedCountry, selectedWorkType, selectedDepartment, selectedExperience, hiddenJobs, allJobs])

  const handleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleHide = (id: string) => {
    setHiddenJobs((prev) => new Set(prev).add(id))
    if (selectedJob?.id === id) setSelectedJob(null)
  }

  const handleApply = (id: string) => {
    setAppliedJobs((prev) => new Set(prev).add(id))
  }

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedJob(null)}
            className="mb-6 text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-sm font-medium transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to jobs
          </button>
          <JobDetail
            job={selectedJob}
            isSaved={savedJobs.has(selectedJob.id)}
            isApplied={appliedJobs.has(selectedJob.id)}
            onSave={() => handleSave(selectedJob.id)}
            onApply={() => handleApply(selectedJob.id)}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-400 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Live job data from LinkedIn, Indeed, Glassdoor & more
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find jobs with{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                visa sponsorship
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              AI Security, Cybersecurity, Cloud Security & AI Governance roles worldwide
            </p>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      <Stats totalJobs={allJobs.length} apiJobs={apiJobs.length} hasApiKey={hasApiKey} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <FilterBar
          countries={countries}
          workTypes={workTypes}
          departments={departments}
          experienceLevels={experienceLevels}
          selectedCountry={selectedCountry}
          selectedWorkType={selectedWorkType}
          selectedDepartment={selectedDepartment}
          selectedExperience={selectedExperience}
          onCountryChange={setSelectedCountry}
          onWorkTypeChange={setSelectedWorkType}
          onDepartmentChange={setSelectedDepartment}
          onExperienceChange={setSelectedExperience}
        />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-medium">{filteredJobs.length}</span> jobs
          </p>
          {!hasApiKey && (
            <p className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
              Using static data - add API key for live jobs
            </p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl skeleton" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-64 skeleton rounded" />
                    <div className="h-4 w-48 skeleton rounded" />
                    <div className="h-4 w-32 skeleton rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-lg text-slate-300 mb-1">No jobs match your filters</p>
              <p className="text-sm text-slate-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.has(job.id)}
                isApplied={appliedJobs.has(job.id)}
                onClick={() => setSelectedJob(job)}
                onSave={() => handleSave(job.id)}
                onHide={() => handleHide(job.id)}
                onApply={() => handleApply(job.id)}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
