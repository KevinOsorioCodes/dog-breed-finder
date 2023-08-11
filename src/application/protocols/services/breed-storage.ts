import { Breed } from '~/domain/entities'
import { Either } from '~/shared/either'

export interface IBreedStorage {
  get: () => IBreedStorage.output
}

export namespace IBreedStorage {
  export type output = Promise<Either<Error, Breed[]>>
}
