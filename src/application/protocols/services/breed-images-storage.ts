import { BreedImages } from '~/domain/entities'
import { Either } from '~/shared/either'

export interface IBreedImagesStorage {
  getByBreed: (breed: string) => IBreedImagesStorage.output
  getBySubBreed: (breed: string, subBreed: string) => IBreedImagesStorage.output
  getAll: () => IBreedImagesStorage.output
}

export namespace IBreedImagesStorage {
  export type output = Promise<Either<Error, BreedImages>>
}
