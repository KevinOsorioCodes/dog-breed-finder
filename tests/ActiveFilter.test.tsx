import { fireEvent, render } from '@testing-library/react'
import ActiveFilters from '~/infrastructure/ui/components/ActiveFilter'

describe('code snippet', () => {
  it('should render with no errors when selectedBreeds is an empty array', () => {
    render(
      <ActiveFilters selectedBreeds={[]} handleRemoveFilter={() => null} />
    )
  })

  it('should render with no errors when selectedBreeds is not an empty array', () => {
    render(
      <ActiveFilters
        selectedBreeds={[{ breed: 'Breed1', subBreed: 'SubBreed1' }]}
        handleRemoveFilter={() => null}
      />
    )
  })

  it('should render the correct number of active filters when selectedBreeds is not an empty array', () => {
    const selectedBreeds = [
      { breed: 'Breed1', subBreed: 'SubBreed1' },
      { breed: 'Breed2', subBreed: 'SubBreed2' },
    ]
    const { container } = render(
      <ActiveFilters
        selectedBreeds={selectedBreeds}
        handleRemoveFilter={() => null}
      />
    )
    const activeFilters = container.querySelectorAll('.bg-blue-200')
    expect(activeFilters.length).toBe(selectedBreeds.length)
  })

  it('should render the correct breed and subBreed for each active filter when selectedBreeds is not an empty array', () => {
    const selectedBreeds = [
      { breed: 'Breed1', subBreed: 'SubBreed1' },
      { breed: 'Breed2', subBreed: 'SubBreed2' },
    ]
    const { getByTestId } = render(
      <ActiveFilters
        selectedBreeds={selectedBreeds}
        handleRemoveFilter={() => null}
      />
    )
    selectedBreeds.forEach(({ breed, subBreed }) => {
      const activeFilter = getByTestId(`${breed}-${subBreed}`)
      expect(activeFilter).toBeInTheDocument()
    })
  })

  it('should call handleRemoveFilter with the correct index when remove button is clicked', () => {
    const selectedBreeds = [
      { breed: 'Breed1', subBreed: 'SubBreed1' },
      { breed: 'Breed2', subBreed: 'SubBreed2' },
    ]
    const handleRemoveFilter = jest.fn()
    const { container } = render(
      <ActiveFilters
        selectedBreeds={selectedBreeds}
        handleRemoveFilter={handleRemoveFilter}
      />
    )
    const removeButtons = container.querySelectorAll('button')
    removeButtons.forEach((button, index) => {
      fireEvent.click(button)
      expect(handleRemoveFilter).toHaveBeenCalledWith(index)
    })
  })
})
