import axios from 'axios'
import { BreedImageStorage } from '~/infrastructure/services'

describe('BreedImageStorage', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })
  it('should return the correct breed and images when a valid breed is provided', async () => {
    const breed = 'hound'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    const result = await new BreedImageStorage().getByBreed(breed)
    expect(result.isRight()).toBeTruthy()
    expect(JSON.stringify(result.value)).toEqual(
      JSON.stringify({ breed, images: expectedImages })
    )
  })

  it('should return the correct breed, subBreed and images when valid breed and subBreed are provided', async () => {
    const breed = 'hound'
    const subBreed = 'afghan'
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    const result = await new BreedImageStorage().getBySubBreed(breed, subBreed)
    expect(result.isRight()).toBeTruthy()
    expect(JSON.stringify(result.value)).toEqual(
      JSON.stringify({ breed, images: expectedImages })
    )
  })

  it('should return the correct random breed and images', async () => {
    const expectedImages = ['image1', 'image2']
    const axiosResponse = { data: { message: expectedImages } }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse)
    const result = await new BreedImageStorage().getAll()
    expect(result.isRight()).toBeTruthy()
    expect(JSON.stringify(result.value)).toEqual(
      JSON.stringify({ breed: 'random', images: expectedImages })
    )
  })
})
