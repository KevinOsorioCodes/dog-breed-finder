import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import axios from 'axios'
import { HomeTemplate } from '~/infrastructure/ui/templates/Home'

describe('HomeTemplate', () => {
  it('should populate breed filter dropdown with correct data', () => {
    const data = [
      { breed: 'Breed1', subBreeds: [] },
      { breed: 'Breed2', subBreeds: ['SubBreed1'] },
    ]
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    render(<HomeTemplate data={data} />)

    const breedSelect = screen.getByTestId('breed')

    expect(breedSelect).toBeInTheDocument()
    expect(breedSelect).toHaveValue('')
    expect(screen.getByText('Select a breed')).toBeInTheDocument()
    expect(screen.getByText('Breed1')).toBeInTheDocument()
    expect(screen.getByText('Breed2')).toBeInTheDocument()
  })

  it('should populate sub-breed filter dropdown with correct data', () => {
    const data = [
      { breed: 'Breed1', subBreeds: [] },
      { breed: 'Breed2', subBreeds: ['SubBreed1'] },
    ]
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    render(<HomeTemplate data={data} />)

    const breedSelect = screen.getByTestId('breed')
    fireEvent.change(breedSelect, { target: { value: 'Breed2' } })

    expect(screen.getByTestId('subBreed')).toBeInTheDocument()
    expect(screen.getByText('Select a breed:')).toBeInTheDocument()
    expect(screen.getByText('SubBreed1')).toBeInTheDocument()
  })

  it('should add selected breed to active filters list when Add Filter button is clicked', async () => {
    const data = [{ breed: 'Breed1', subBreeds: [] }]
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    render(<HomeTemplate data={data} />)
    const breedSelect = screen.getByTestId('breed')
    const addFilterButton = screen.getByText('Add Filter')
    act(() => {
      fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
      fireEvent.click(addFilterButton)
    })
    waitFor(() => {
      expect(screen.getByTestId('Breed1-')).toBeInTheDocument()
    })
  })

  it('should remove selected filter from active filters list when x button is clicked', () => {
    const data = [{ breed: 'Breed1', subBreeds: [] }]
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    render(<HomeTemplate data={data} />)
    const breedSelect = screen.getByTestId('breed')
    const addFilterButton = screen.getByText('Add Filter')

    fireEvent.change(breedSelect, { target: { value: 'Breed1' } })
    fireEvent.click(addFilterButton)
    const removeFilterButton = screen.getByTestId('x-0')
    const activeFilterElement = screen.getByTestId('Breed1-')

    fireEvent.click(removeFilterButton)

    expect(activeFilterElement).not.toBeInTheDocument()
  })

  it('should set breeds state when data is passed as prop', () => {
    const data = [{ breed: 'Breed1', subBreeds: [] }]
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    render(<HomeTemplate data={data} />)
    expect(screen.getByText('Breed1')).toBeInTheDocument()
  })
})
