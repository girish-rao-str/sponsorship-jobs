interface FilterBarProps {
  countries: string[]
  workTypes: string[]
  departments: string[]
  experienceLevels: string[]
  selectedCountry: string
  selectedWorkType: string
  selectedDepartment: string
  selectedExperience: string
  onCountryChange: (value: string) => void
  onWorkTypeChange: (value: string) => void
  onDepartmentChange: (value: string) => void
  onExperienceChange: (value: string) => void
}

export default function FilterBar({
  countries,
  workTypes,
  departments,
  experienceLevels,
  selectedCountry,
  selectedWorkType,
  selectedDepartment,
  selectedExperience,
  onCountryChange,
  onWorkTypeChange,
  onDepartmentChange,
  onExperienceChange,
}: FilterBarProps) {
  const filters = [
    { label: 'Country', value: selectedCountry, options: countries, onChange: onCountryChange },
    { label: 'Work Type', value: selectedWorkType, options: workTypes, onChange: onWorkTypeChange },
    { label: 'Department', value: selectedDepartment, options: departments, onChange: onDepartmentChange },
    { label: 'Experience', value: selectedExperience, options: experienceLevels, onChange: onExperienceChange },
  ]

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <div key={filter.label} className="relative">
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="appearance-none bg-slate-800/50 border border-slate-700/50 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition cursor-pointer hover:border-slate-600"
          >
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      ))}
    </div>
  )
}
