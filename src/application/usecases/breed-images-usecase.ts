import { IBreedImagesStorage } from '../protocols/services'
import { left, right } from '~/shared/either'
import { IBreedImagesUseCase } from '~/domain/usecases/'

export class BreedImagesUseCase implements IBreedImagesUseCase {
  private readonly breedImageStorage: IBreedImagesStorage
  constructor(breedImageStorage: IBreedImagesStorage) {
    this.breedImageStorage = breedImageStorage
  }

  async handleByBreed(breed: string): IBreedImagesUseCase.output {
    const result = await this.breedImageStorage.getByBreed(breed)

    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }

  async handleBySubBreed(
    breed: string,
    subBreed: string
  ): IBreedImagesUseCase.output {
    const result = await this.breedImageStorage.getBySubBreed(breed, subBreed)

    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }

  async handleAll(): IBreedImagesUseCase.output {
    const result = await this.breedImageStorage.getAll()

    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }
}
