import { right } from '~/shared/either'
import { IBreedImagesStorage } from '~/application/protocols/services'
import axios from 'axios'
import { BreedImagesDTO } from '~/domain/entities'
const MAX_IMAGES = 10
export class BreedImageStorage implements IBreedImagesStorage {
  async getByBreed(breed: string): IBreedImagesStorage.output {
    const response = await axios.get<BreedImagesDTO>(
      `https://dog.ceo/api/breed/${breed}/images/random/${MAX_IMAGES}`
    )

    const images = response.data.message
    return right({
      breed,
      images,
    })
  }
  async getBySubBreed(
    breed: string,
    subBreed: string
  ): IBreedImagesStorage.output {
    const response = await axios.get<BreedImagesDTO>(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${MAX_IMAGES}`
    )
    const images = response.data.message
    return right({
      breed,
      images,
    })
  }
  async getAll(): IBreedImagesStorage.output {
    const response = await axios.get<BreedImagesDTO>(
      `https://dog.ceo/api/breeds/image/random/100`
    )
    const images = response.data.message

    return right({
      breed: 'random',
      images,
    })
  }
}
