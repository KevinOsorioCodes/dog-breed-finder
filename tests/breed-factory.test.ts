import { BreedUseCase } from '~/application/usecases'
import { BreedFactory } from '~/infrastructure/factories/breed-factory'
import { left, right } from '~/shared/either'

describe('BreedFactory', () => {
  it('should return an instance of BreedUseCase', () => {
    const breedUseCase = BreedFactory()
    expect(breedUseCase).toBeInstanceOf(BreedUseCase)
  })

  it('should throw an error if BreedStorage throws an error', async () => {
    const error = new Error('Data Fetching failed!! Try refreshing the page.')
    const breedStorage = {
      get: jest.fn().mockResolvedValue(left(error)),
    }
    const breedUseCase = new BreedUseCase(breedStorage)

    const result = await breedUseCase.handle()

    expect(JSON.stringify(result.value)).toEqual(JSON.stringify(error))
  })

  it('should return an Either with a left value if BreedStorage returns an Either with a left value', async () => {
    const error = new Error('Api Error')
    const breedStorage = {
      get: jest.fn().mockReturnValueOnce(Promise.resolve(left(error))),
    }
    const breedUseCase = new BreedUseCase(breedStorage)
    const result = await breedUseCase.handle()
    expect(result.isLeft()).toBe(true)
    expect(JSON.stringify(result.value)).toEqual(JSON.stringify(error))
  })

  it('should return an empty array if BreedStorage returns an empty array', async () => {
    const breedStorage = {
      get: jest.fn().mockReturnValueOnce(Promise.resolve(right([]))),
    }
    const breedUseCase = new BreedUseCase(breedStorage)
    const result = await breedUseCase.handle()
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual([])
  })

  it('should return an array with one breed if BreedStorage returns an array with one breed', async () => {
    const breed = {
      breed: 'affenpinscher',
      subBreeds: [],
    }
    const breedStorage = {
      get: jest.fn().mockReturnValueOnce(Promise.resolve(right([breed]))),
    }
    const breedUseCase = new BreedUseCase(breedStorage)
    const result = await breedUseCase.handle()
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual([breed])
  })

  it('should return an array with multiple breeds if BreedStorage returns an array with multiple breeds', async () => {
    const breeds = [
      {
        breed: 'affenpinscher',
        subBreeds: [],
      },
      {
        breed: 'african',
        subBreeds: ['dog', 'wild'],
      },
    ]
    const breedStorage = {
      get: jest.fn().mockReturnValueOnce(Promise.resolve(right(breeds))),
    }
    const breedUseCase = new BreedUseCase(breedStorage)
    const result = await breedUseCase.handle()
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(breeds)
  })
})
