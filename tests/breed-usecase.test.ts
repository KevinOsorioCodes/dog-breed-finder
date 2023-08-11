import { Breed } from '~/domain/entities'
import { IBreedUseCase } from '~/domain/usecases'
import { right, left } from '~/shared/either'

describe('IBreedUseCase', () => {
  it('should return a Promise of Either<Error, Breed[]>', async () => {
    const expectedData: Breed[] = [
      { breed: 'Breed1', subBreeds: [] },
      { breed: 'Breed2', subBreeds: ['SubBreed1', 'SubBreed2'] },
    ]
    const useCase: IBreedUseCase = {
      handle: async () => {
        return Promise.resolve(right(expectedData))
      },
    }

    const result = await useCase.handle()

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    expect(result.value).toEqual(expectedData)
  })

  it('should return a Promise of Either<Error, Breed[]> with error when use case fails', async () => {
    const errorMessage = 'Use case error'
    const useCase: IBreedUseCase = {
      handle: async () => {
        return Promise.resolve(left(new Error(errorMessage)))
      },
    }

    const result = await useCase.handle()

    expect(result.isRight()).toBeFalsy()
    expect(result.isLeft()).toBeTruthy()
    expect(result.value instanceof Error).toBeTruthy()
    expect(JSON.stringify(result.value)).toBe(
      JSON.stringify(new Error(errorMessage))
    )
  })
})
