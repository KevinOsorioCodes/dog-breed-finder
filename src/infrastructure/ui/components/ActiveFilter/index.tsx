import React from 'react'
import { BreedTransferDTO } from '~/domain/entities'

interface ActiveFiltersProps {
  selectedBreeds: BreedTransferDTO[]
  handleRemoveFilter: (indexToRemove: number) => void
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedBreeds,
  handleRemoveFilter,
}) => {
  return (
    <div>
      {selectedBreeds.length > 0 && <h3>Active Filters:</h3>}
      <div className="flex gap-3 flex-wrap">
        {selectedBreeds.map(({ breed, subBreed }, index) => (
          <div
            data-testid={`${breed}-${subBreed}`}
            key={`${breed}-${subBreed}`}
            className="bg-blue-200 p-2 rounded-lg mb-2 w-max"
          >
            {`${breed}${subBreed ? '-' + subBreed : ''}`}
            <button
              data-testid={`x-${index}`}
              onClick={() => handleRemoveFilter(index)}
              className="ml-2 text-slate-800 font-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveFilters
