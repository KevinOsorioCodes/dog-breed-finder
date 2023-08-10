import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import { Breed, BreedTransferDTO } from '~/domain/entities'
import BreedFilter from '../../components/BreedFilter'
import { labels } from '~/shared/labels/labels'

export interface IHomeTemplateProps {
  data?: Array<Breed>
}
export const HomeTemplate: FunctionComponent<IHomeTemplateProps> = ({
  data,
}) => {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const [breedSelected, setBreedSelected] = useState<Breed | null>()
  const [subBreeds, setSubBreeds] = useState<string[]>([])
  const [subBreedsSelected, setSubBreedsSelected] = useState<string | null>()
  const [breedsFilter, setBreedsFilter] = useState<BreedTransferDTO[]>([])

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
    if (selectedBreed) {
      setSubBreedsSelected(selectedBreed)
    }
  }

  const handleFilterChange = () => {
    if (
      !breedsFilter.some(
        (element) =>
          element.breed === breedSelected?.breed ||
          element.subBreed === subBreedsSelected
      )
    ) {
      setBreedsFilter((prevState) => [
        ...prevState,
        {
          breed: breedSelected?.breed ?? '',
          subBreed: subBreedsSelected ?? '',
        },
      ])
    }
  }

  return (
    <>
      <div className=" w-full flex flex-col md:flex-row justify-center items-center md:justify-start md:items-center gap-2">
        <BreedFilter
          title={labels.select_breed}
          breeds={breeds.map((element) => element.breed)}
          handleFilterChange={handleSelectBreed}
        />
        {subBreeds.length > 0 && (
          <BreedFilter
            title={labels.select_sub_breed}
            breeds={subBreeds}
            handleFilterChange={handleSelectSubBreed}
          />
        )}
        <button
          onClick={handleFilterChange}
          className=" w-1/2 md:w-52 md:h-12 drop-shadow-md bg-gray-600 rounded-lg text-white"
        >
          Add Filter
        </button>
      </div>
      <main className="flex min-h-full items-start justify-start gap-4 ">
        <h1>Welcome to Dog Finder App</h1>
      </main>
    </>
  )
}
