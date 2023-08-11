import { BreedUseCase } from '~/application/usecases'
import { BreedStorage } from '~/infrastructure/services'

export const BreedFactory = () => {
  const breedStorage = new BreedStorage()
  const breedUseCase = new BreedUseCase(breedStorage)
  return breedUseCase
}
