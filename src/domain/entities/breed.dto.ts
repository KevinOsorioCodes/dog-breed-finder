export interface BreedDto {
  [key: string]: string[]
}

export interface BreedResponse {
  message: BreedDto
  status: string
}

export interface BreedTransferDTO {
  breed: string
  subBreed: string
}
