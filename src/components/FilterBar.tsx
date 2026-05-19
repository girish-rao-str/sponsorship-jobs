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
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={selectedWorkType}
        onChange={(e) => onWorkTypeChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {workTypes.map((w) => (
          <option key={w} value={w}>{w}</option>
        ))}
      </select>

      <select
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        value={selectedExperience}
        onChange={(e) => onExperienceChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {experienceLevels.map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>
    </div>
  )
}
