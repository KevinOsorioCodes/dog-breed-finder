import { BreedImagesUseCase } from '~/application/usecases'
import { left, right } from '~/shared/either'

describe('BreedImagesUseCase', () => {
  it('should return breed images when getByBreed is successful', async () => {
    const breed = 'testBreed'
    const expected = ['image1', 'image2']
    const breedImageStorage = {
      getByBreed: jest.fn().mockResolvedValue(right(expected)),
      getBySubBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest.fn().mockResolvedValue(right(expected)),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleByBreed(breed)
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expected)
  })

  it('should return sub-breed images when getBySubBreed is successful', async () => {
    const breed = 'testBreed'
    const subBreed = 'testSubBreed'
    const expected = ['image1', 'image2']
    const breedImageStorage = {
      getByBreed: jest.fn().mockResolvedValue(right(expected)),
      getBySubBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest.fn().mockResolvedValue(right(expected)),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleBySubBreed(breed, subBreed)
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expected)
  })

  it('should return all breed images when getAll is successful', async () => {
    const expected = ['image1', 'image2']
    const breedImageStorage = {
      getByBreed: jest.fn().mockResolvedValue(right(expected)),
      getBySubBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest.fn().mockResolvedValue(right(expected)),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleAll()
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expected)
  })

  it('should return an error message when getByBreed fails', async () => {
    const breed = 'testBreed'
    const expected = ['image1', 'image2']

    const breedImageStorage = {
      getBySubBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest.fn().mockResolvedValue(right(expected)),
      getByBreed: jest
        .fn()
        .mockResolvedValue(
          left(new Error('Data Fetching failed!! Try refreshing the page.'))
        ),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleByBreed(breed)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })

  it('should return an error message when getBySubBreed fails', async () => {
    const expected = ['image1', 'image2']

    const breed = 'testBreed'
    const subBreed = 'testSubBreed'
    const breedImageStorage = {
      getByBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest.fn().mockResolvedValue(right(expected)),
      getBySubBreed: jest
        .fn()
        .mockResolvedValue(
          left(new Error('Data Fetching failed!! Try refreshing the page.'))
        ),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleBySubBreed(breed, subBreed)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })

  it('should return an error message when getAll fails', async () => {
    const expected = ['image1', 'image2']

    const breedImageStorage = {
      getByBreed: jest.fn().mockResolvedValue(right(expected)),
      getBySubBreed: jest.fn().mockResolvedValue(right(expected)),
      getAll: jest
        .fn()
        .mockResolvedValue(
          left(new Error('Data Fetching failed!! Try refreshing the page.'))
        ),
    }
    const useCase = new BreedImagesUseCase(breedImageStorage)
    const result = await useCase.handleAll()
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })
})
