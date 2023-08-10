import { right } from '~/shared/either'
import { IBreedImagesStorage } from '~/application/protocols/services'
import axios from 'axios'
import { BreedImages, BreedImagesDTO } from '~/domain/entities'
const MAX_IMAGES = 10
export class BreedImageStorage implements IBreedImagesStorage {
  async getByBreed(breed: string): IBreedImagesStorage.output {
    const data = await axios
      .get<BreedImagesDTO>(
        `https://dog.ceo/api/breed/${breed}/images/random/${MAX_IMAGES}`
      )
      .then((res): BreedImages => {
        const images = res.data.message
        return {
          breed,
          images,
        }
      })

    return right(data)
  }
  async getBySubBreed(
    breed: string,
    subBreed: string
  ): IBreedImagesStorage.output {
    const data = await axios
      .get<BreedImagesDTO>(
        `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${MAX_IMAGES}`
      )
      .then((res): BreedImages => {
        const images = res.data.message
        return {
          breed,
          images,
        }
      })

    return right(data)
  }
  async getAll(): IBreedImagesStorage.output {
    const data = await axios
      .get<BreedImagesDTO>(`https://dog.ceo/api/breeds/image/random/100`)
      .then((res): BreedImages => {
        const images = res.data.message
        return {
          breed: 'random',
          images,
        }
      })

    return right(data)
  }
}
