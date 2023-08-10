import { render } from '@testing-library/react'
import { Gallery } from '~/infrastructure/ui/components/Gallery'

describe('code snippet', () => {
  it('should display gallery title with correct data-testid', () => {
    const { getByTestId } = render(<Gallery title="Test Gallery" images={[]} />)
    const galleryTitle = getByTestId('gallery-Test Gallery')
    expect(galleryTitle).toBeInTheDocument()
  })

  it('should display images with correct data-testid', () => {
    const images = ['https://example.com/image1.jpg', '/image2.jpg']
    const { getAllByTestId } = render(
      <Gallery title="Test Gallery" images={images} />
    )
    const imageElements = getAllByTestId(/image-Test Gallery-index/)
    expect(imageElements.length).toBe(images.length)
  })

  it('should have correct flexbox layout', () => {
    const { container } = render(<Gallery title="Test Gallery" images={[]} />)
    expect(container.firstChild).toHaveClass(
      'flex',
      'flex-col',
      'w-full',
      'gap-4'
    )
  })

  it('should render images with correct alt text and dimensions', () => {
    const images = ['https://example.com/image1.jpg', '/image2.jpg']
    const { getAllByAltText } = render(
      <Gallery title="Test Gallery" images={images} />
    )
    const imageElements = getAllByAltText(/Test Gallery-image/)
    expect(imageElements.length).toBe(images.length)
    imageElements.forEach((image) => {
      expect(image).toHaveAttribute('width', '200')
      expect(image).toHaveAttribute('height', '200')
    })
  })
})
