import { BreedImagesUseCase } from '~/application/usecases'
import { BreedImageStorage } from '~/infrastructure/services'

export const BreedImageFactory = () => {
  const breedImageStorage = new BreedImageStorage()
  const breedImageUseCase = new BreedImagesUseCase(breedImageStorage)
  return breedImageUseCase
}
