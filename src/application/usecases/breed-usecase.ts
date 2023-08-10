import { IBreedUseCase } from '~/domain/usecases'
import { IBreedStorage } from '../protocols/services'
import { left, right } from '~/shared/either'

export class BreedUseCase implements IBreedUseCase {
  private readonly breedStorage: IBreedStorage
  constructor(breedStorage: IBreedStorage) {
    this.breedStorage = breedStorage
  }

  async handle(): IBreedUseCase.output {
    const result = await this.breedStorage.get()

    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }
}
