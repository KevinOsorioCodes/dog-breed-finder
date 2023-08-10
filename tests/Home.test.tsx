import Home from '~/pages'
import { render } from '@testing-library/react'

describe('Home', () => {
  it('should render the main component without errors', () => {
    render(<Home />)
  })

  it('should display the welcome message', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Welcome to Dog Finder App')).toBeInTheDocument()
  })

  it('should have the flex class', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toHaveClass('flex')
  })

  it('should have the correct class', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toHaveClass(
      ' w-full flex flex-col md:flex-row justify-center items-center md:justify-start md:items-center gap-2'
    )
  })

  it('should have the flex-col class', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toHaveClass('flex-col')
  })

  it('should have the items-center and justify-center classes', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toHaveClass('items-center')
    expect(container.firstChild).toHaveClass('justify-center')
  })
})
