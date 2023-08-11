import { render } from '@testing-library/react'
import Header from '~/infrastructure/ui/components/Header'
import { labels } from '~/shared/labels/labels'

describe('Header', () => {
  it('should render without errors', () => {
    render(<Header />)
  })

  it('should display logo image with correct dimensions and source', () => {
    const { getByAltText } = render(<Header />)
    const logoImage = getByAltText('logo')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fassets%2Ficons%2Flogo.png&w=128&q=75'
    )
    expect(logoImage).toHaveAttribute('width', '50')
    expect(logoImage).toHaveAttribute('height', '50')
  })

  it('should display text with correct font and size', () => {
    const { getByText } = render(<Header />)
    const breedFinderText = getByText(labels.app_title)
    expect(breedFinderText).toBeInTheDocument()
  })
})
