import { Either } from '~/shared/either/'
import { BreedImages } from '../entities'

export interface IBreedImagesUseCase {
  handleByBreed: (breed: string) => IBreedImagesUseCase.output
  handleBySubBreed: (
    breed: string,
    subBreed: string
  ) => IBreedImagesUseCase.output
  handleAll: () => IBreedImagesUseCase.output
}
export namespace IBreedImagesUseCase {
  export type output = Promise<Either<Error, BreedImages>>
}
