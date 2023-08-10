import { Either } from '~/shared/either/'
import { Breed } from '../entities'

export interface IBreedUseCase {
  handle: () => IBreedUseCase.output
}
export namespace IBreedUseCase {
  export type output = Promise<Either<Error, Breed[]>>
}
