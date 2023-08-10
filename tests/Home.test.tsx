import { render, screen, fireEvent } from '@testing-library/react'
import { HomeTemplate } from '~/infrastructure/ui/templates/Home'

describe('code snippet', () => {
  it('should add selected breed to active filters list when Add Filter button is clicked', () => {
    render(<HomeTemplate data={[{ breed: 'Breed1', subBreeds: [] }]} />)
    const breedSelect = screen.getByTestId('breed')
    const addFilterButton = screen.getByText('Add Filter')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
    fireEvent.click(addFilterButton)

    expect(screen.getByTestId('Breed1-')).toBeInTheDocument()
  })

  it('should add selected sub-breed to active filters list when Add Filter button is clicked', () => {
    render(
      <HomeTemplate data={[{ breed: 'Breed1', subBreeds: ['SubBreed1'] }]} />
    )
    const breedSelect = screen.getByTestId('breed')
    const addFilterButton = screen.getByText('Add Filter')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
    const subBreedSelect = screen.getByTestId('subBreed')
    fireEvent.change(subBreedSelect, { target: { value: 'SubBreed1' } })
    fireEvent.click(addFilterButton)

    expect(screen.getByText('Breed1-SubBreed1')).toBeInTheDocument()
  })

  it('should remove selected filter from active filters list when x button is clicked', () => {
    render(<HomeTemplate data={[{ breed: 'Breed1', subBreeds: [] }]} />)
    const breedSelect = screen.getByTestId('breed')
    const addFilterButton = screen.getByText('Add Filter')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
    fireEvent.click(addFilterButton)
    const removeFilterButton = screen.getByTestId('x-0')
    const activeFilterElement = screen.getByTestId('Breed1-')
    expect(activeFilterElement).toBeInTheDocument()
    fireEvent.click(removeFilterButton)

    expect(activeFilterElement).not.toBeInTheDocument()
  })

  it('should not display sub-breed dropdown menu when breed has no sub-breeds available', () => {
    render(<HomeTemplate data={[{ breed: 'Breed1', subBreeds: [] }]} />)
    const breedSelect = screen.getByTestId('breed')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })

    expect(screen.queryByTestId('subBreed')).not.toBeInTheDocument()
  })

  it('should display sub-breed dropdown menu when breed has sub-breeds available', () => {
    render(
      <HomeTemplate data={[{ breed: 'Breed1', subBreeds: ['SubBreed1'] }]} />
    )
    const breedSelect = screen.getByTestId('breed')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })

    expect(screen.getByTestId('subBreed')).toBeInTheDocument()
  })

  it('should not add filter to active filters list when sub-breed is selected but no breed is selected', () => {
    render(
      <HomeTemplate data={[{ breed: 'Breed1', subBreeds: ['SubBreed1'] }]} />
    )
    const breedSelect = screen.getByTestId('breed')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
    const subBreedSelect = screen.getByTestId('subBreed')
    fireEvent.change(subBreedSelect, { target: { value: 'SubBreed1' } })
    const addFilterButton = screen.getByText('Add Filter')
    fireEvent.click(addFilterButton)

    expect(screen.queryByText('SubBreed1')).not.toBeInTheDocument()
  })
})
