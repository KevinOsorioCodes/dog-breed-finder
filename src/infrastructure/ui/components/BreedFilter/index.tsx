import { ChangeEvent, FunctionComponent } from 'react'

interface IBreedFilterProps {
  breeds: string[]
  title: string
  handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void
}
const BreedFilter: FunctionComponent<IBreedFilterProps> = ({
  breeds,
  title,
  handleFilterChange,
}) => {
  return (
    <div className="w-40 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <select
        className=" appearance-none w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-gray-300"
        onChange={handleFilterChange}
      >
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  )
}
export default BreedFilter
