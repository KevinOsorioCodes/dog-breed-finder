import Home from '~/pages';
import { render } from '@testing-library/react';

describe('Home', () => {
  // Tests that the main component renders without errors
  it('should render the main component without errors', () => {
    render(<Home />);
  });

  // Tests that the 'Welcome to Dog Finder App' message is displayed
  it('should display the welcome message', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to Dog Finder App')).toBeInTheDocument();
  });

  // Tests that the 'main' element has the 'flex' class
  it('should have the flex class', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('flex');
  });

  // Tests that the 'main' element has the 'min-h-screen' class
  it('should have the min-h-screen class', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('min-h-screen');
  });

  // Tests that the 'main' element has the 'flex-col' class
  it('should have the flex-col class', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  // Tests that the 'main' element has the 'items-center' and 'justify-between' classes
  it('should have the items-center and justify-between classes', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('items-center');
    expect(container.firstChild).toHaveClass('justify-between');
  });
});
