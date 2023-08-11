import { BreedUseCase } from '~/application/usecases'
import { left, right } from '~/shared/either'

describe('BreedUseCase', () => {
  it('should return a Right value with the correct data structure when breedStorage.get() returns a valid value', async () => {
    const breedStorage = {
      get: jest.fn().mockResolvedValue(right({ breed: 'Golden Retriever' })),
    }
    const breedUseCase = new BreedUseCase(breedStorage)

    const result = await breedUseCase.handle()

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({ breed: 'Golden Retriever' })
  })

  it('should return a Left value with an error message when breedStorage.get() returns a Left value', async () => {
    const breedStorage = {
      get: jest
        .fn()
        .mockResolvedValue(
          left(new Error('Data Fetching failed!! Try refreshing the page.'))
        ),
    }
    const breedUseCase = new BreedUseCase(breedStorage)

    const result = await breedUseCase.handle()

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })

  it('should throw an error if breedStorage.get() throws an error', async () => {
    const breedStorage = {
      get: jest
        .fn()
        .mockRejectedValue(
          new Error('Data Fetching failed!! Try refreshing the page.')
        ),
    }
    const breedUseCase = new BreedUseCase(breedStorage)

    await expect(breedUseCase.handle()).rejects.toThrow(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })

  it('should return a Left value with an error message if breedStorage.get() returns a value error', async () => {
    const breedStorage = {
      get: jest.fn().mockResolvedValue(left(new Error('Error'))),
    }
    const breedUseCase = new BreedUseCase(breedStorage)

    const result = await breedUseCase.handle()

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })
})
