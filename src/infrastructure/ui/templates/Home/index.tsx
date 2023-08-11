import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import { Breed, BreedImages, BreedTransferDTO } from '~/domain/entities'
import BreedFilter from '../../components/BreedFilter'
import { labels } from '~/shared/labels/labels'
import ActiveFilters from '../../components/ActiveFilter'
import { Gallery } from '../../components/Gallery'
import { BreedImageFactory } from '~/infrastructure/factories/breed-image-factory'

export interface IHomeTemplateProps {
  data?: Array<Breed>
  defaultImages?: BreedImages
}
const filterByIndex = (index: number, indexToRemove: number) =>
  index !== indexToRemove

export const HomeTemplate: FunctionComponent<IHomeTemplateProps> = ({
  data,
  defaultImages,
}) => {
  const breedImageFactory = BreedImageFactory()
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [breedSelected, setBreedSelected] = useState<Breed | null>(null)
  const [subBreeds, setSubBreeds] = useState<string[]>([])
  const [subBreedsSelected, setSubBreedsSelected] = useState<string | null>(
    null
  )
  const [breedsFilter, setBreedsFilter] = useState<BreedTransferDTO[]>([])
  const [galleries, setGalleries] = useState<BreedImages[]>([])
  useEffect(() => {
    if (data?.length) setBreeds(data)
  }, [data])

  const handleSelectBreed = (event: ChangeEvent<HTMLSelectElement>) => {
    const breed = event.target.value
    const selectedBreed = breeds.find((element) => element.breed === breed)
    if (selectedBreed) {
      setBreedSelected(selectedBreed)
      setSubBreeds(selectedBreed.subBreeds)
    }
  }

  const handleSelectSubBreed = (event: ChangeEvent<HTMLSelectElement>) => {
    const subBreed = event.target.value
    const selectedBreed = subBreeds.find((element) => element === subBreed)
    setSubBreedsSelected(selectedBreed ?? '')
  }

  const fetchBreedsImages = async (breedImage: BreedTransferDTO) => {
    const { breed, subBreed } = breedImage
    const res = subBreed
      ? await breedImageFactory.handleBySubBreed(breed, subBreed)
      : await breedImageFactory.handleByBreed(breed)

    if (res.isRight()) {
      setGalleries((prevState) => [...prevState, res.value])
    }
  }
  const handleFilterChange = () => {
    if (
      !breedsFilter.some(
        (element) =>
          element.breed === breedSelected?.breed &&
          element.subBreed === subBreedsSelected
      ) &&
      breedSelected
    ) {
      const newBreedFilter = {
        breed: breedSelected?.breed ?? '',
        subBreed: subBreedsSelected ?? '',
      }
      setBreedsFilter((prevState) => [...prevState, newBreedFilter])
      setBreedSelected(null)
      setSubBreeds([])
      setSubBreedsSelected('')
      fetchBreedsImages(newBreedFilter)
    }
  }
  const filterPrevStateByIndex = <T,>(
    prevState: Array<T>,
    indexToRemove: number
  ) => prevState.filter((_, index) => filterByIndex(index, indexToRemove))

  const handleDeleteBreed = (indexToRemove: number) => {
    setBreedsFilter((prevState) =>
      filterPrevStateByIndex(prevState, indexToRemove)
    )
    setGalleries((prevState) =>
      filterPrevStateByIndex(prevState, indexToRemove)
    )
  }
  return (
    <>
      <div>
        <div className=" w-full flex flex-col md:flex-row justify-center items-center md:justify-start md:items-end gap-2 mx-5">
          <BreedFilter
            id="breed"
            value={breedSelected?.breed ?? ''}
            title={labels.select_breed}
            breeds={breeds.map((element) => element.breed)}
            handleFilterChange={handleSelectBreed}
          />
          {subBreeds.length > 0 && (
            <BreedFilter
              id="subBreed"
              value={subBreedsSelected ?? ''}
              title={labels.select_sub_breed}
              breeds={subBreeds}
              handleFilterChange={handleSelectSubBreed}
            />
          )}
          <button
            onClick={handleFilterChange}
            className=" w-1/2 md:w-24 md:h-10 drop-shadow-md bg-gray-600 rounded-lg text-white"
          >
            Add Filter
          </button>
        </div>
        <ActiveFilters
          selectedBreeds={breedsFilter}
          handleRemoveFilter={handleDeleteBreed}
        />
      </div>
      <main className="flex flex-col min-h-full items-start justify-start gap-4 m-3">
        {galleries.length > 0 ? (
          breedsFilter.map(({ breed, subBreed }, index: number) => (
            <div key={breed}>
              <Gallery
                title={`${breed} ${subBreed}`}
                images={galleries[index]?.images ?? []}
              />
            </div>
          ))
        ) : (
          <Gallery
            title={defaultImages?.breed ?? ''}
            images={defaultImages?.images ?? []}
          />
        )}
      </main>
    </>
  )
}
