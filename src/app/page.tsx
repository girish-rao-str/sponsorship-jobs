'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import JobCard from '@/components/JobCard'
import JobDetail from '@/components/JobDetail'
import { jobs, countries, workTypes, departments, experienceLevels } from '@/data/jobs'
import type { Job } from '@/data/jobs'

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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
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

      if (selectedDepartment !== 'All Departments') {
        if (job.department !== selectedDepartment) return false
      }

      if (selectedExperience !== 'All Levels') {
        const jobExp = parseInt(job.experience)
        const filterExp = parseInt(selectedExperience)
        if (jobExp < filterExp) return false
      }

      return true
    })
  }, [searchQuery, selectedCountry, selectedWorkType, selectedDepartment, selectedExperience, hiddenJobs])

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
      <div className="min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedJob(null)}
            className="mb-4 text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
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
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">
            {filteredJobs.length.toLocaleString()} jobs offering visa sponsorship
          </h1>
          <p className="text-slate-400 text-sm">
            AI Security, Cybersecurity, Cloud Security & AI Governance roles across Gulf, Europe & Middle East
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

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

        <div className="mt-6 space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-lg">No jobs match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search criteria</p>
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
    </div>
  )
}
