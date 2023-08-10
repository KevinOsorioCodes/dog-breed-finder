import axios from 'axios'
import { BreedStorage } from '~/infrastructure/services'

describe('BreedStorage', () => {
  it('should return an array of breeds with sub-breeds when the API call is successful', async () => {
    const breeds = {
      retriever: ['golden', 'labrador'],
      bulldog: [],
      beagle: [],
    }
    const response = {
      data: {
        message: breeds,
        status: 'success',
      },
    }
    jest.spyOn(axios, 'get').mockResolvedValue(response)

    const breedStorage = new BreedStorage()
    const result = await breedStorage.get()

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual([
      { breed: 'retriever', subBreeds: ['golden', 'labrador'] },
      { breed: 'bulldog', subBreeds: [] },
      { breed: 'beagle', subBreeds: [] },
    ])
  })

  it('should return an empty array when the API call returns an empty object', async () => {
    const breeds = {}
    const response = {
      data: {
        message: breeds,
        status: 'success',
      },
    }
    jest.spyOn(axios, 'get').mockResolvedValue(response)

    const breedStorage = new BreedStorage()
    const result = await breedStorage.get()

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual([])
  })

  it('should return an error message when the API call fails', async () => {
    const response = {
      data: {
        status: 'error',
      },
    }
    jest.spyOn(axios, 'get').mockResolvedValue(response)

    const breedStorage = new BreedStorage()
    const result = await breedStorage.get()

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new Error('Api Error'))
  })
})
