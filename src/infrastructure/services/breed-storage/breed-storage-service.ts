import { Either, left, right } from '~/shared/either'
import { IBreedStorage } from '~/application/protocols/services'
import axios from 'axios'
import { Breed, BreedResponse } from '~/domain/entities'

export class BreedStorage implements IBreedStorage {
  async get(): IBreedStorage.output {
    const data = await axios
      .get<BreedResponse>('https://dog.ceo/api/breeds/list/all')
      .then((res): Either<Error, Breed[]> => {
        if (res.data.status !== 'success') return left(new Error('Api Error'))
        const breeds = res.data.message
        return right(
          Object.keys(breeds).map((key): Breed => {
            return {
              breed: key,
              subBreeds: breeds[key],
            }
          })
        )
      })

    return data
  }
}
