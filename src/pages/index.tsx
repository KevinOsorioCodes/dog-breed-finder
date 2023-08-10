import { NextPage, GetStaticProps } from 'next'
import { Breed } from '~/domain/entities'
import { InfoFactory } from '~/infrastructure/factories/breed-factory'
import { HomeTemplate } from '~/infrastructure/ui/templates/Home'

const Home: NextPage<{ data?: Breed[] }> = ({ data }) => {
  return <HomeTemplate data={data} />
}

export const getStaticProps: GetStaticProps = async () => {
  const breedFactory = InfoFactory()
  const result = await breedFactory.handle()

  if (result.isLeft()) {
    return { notFound: true }
  }

  return {
    props: {
      data: result.value,
    },
  }
}
export default Home
