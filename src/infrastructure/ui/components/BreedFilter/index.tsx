import { ChangeEvent, FunctionComponent } from 'react'
interface IBreedFilterProps {
  breeds: string[]
  title: string
  value: string
  id: string
  handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void
}
const BreedFilter: FunctionComponent<IBreedFilterProps> = ({
  breeds,
  title,
  id,
  value,
  handleFilterChange,
}) => {
  return (
    <div className="w-40 ">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <select
        data-testid={id}
        value={value}
        className="appearance-none w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-gray-300"
        onChange={handleFilterChange}
      >
        <option className="hover:bg-gray-300" value={''}>
          Select a breed
        </option>
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
