import { NextPage, GetStaticProps } from 'next'
import { Breed, BreedImages } from '~/domain/entities'
import { BreedFactory } from '~/infrastructure/factories/breed-factory'
import { BreedImageFactory } from '~/infrastructure/factories/breed-image-factory'
import { HomeTemplate } from '~/infrastructure/ui/templates/Home'
interface IHomeProps {
  data?: Breed[]
  images?: BreedImages
}
const Home: NextPage<IHomeProps> = ({ data, images }) => {
  return <HomeTemplate data={data} defaultImages={images} />
}

export const getStaticProps: GetStaticProps = async () => {
  const breedFactory = BreedFactory()
  const breedImageFactory = BreedImageFactory()
  const result = await breedFactory.handle()
  const imagesResult = await breedImageFactory.handleAll()

  if (result.isLeft() || imagesResult.isLeft()) {
    return { notFound: true }
  }

  return {
    props: {
      data: result.value,
      images: imagesResult.value,
    },
  }
}
export default Home
