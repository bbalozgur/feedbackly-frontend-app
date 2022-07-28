import { render, screen } from '@testing-library/react';
import { CharacterLimit } from '.';

describe('CharacterLimit', () => {
  it('renders the character count', () => {
    render(<CharacterLimit length={10} maxLength={20} />);
    expect(screen.getByText('10 / 20')).toBeInTheDocument();
  });

  test.each([
    { length: 5, maxLength: 10, className: 'text-gray-500' },
    { length: 8, maxLength: 10, className: 'text-orange-500' },
    { length: 11, maxLength: 10, className: 'text-red-500' }
  ])(
    'renders the character count with className ${className} when length is ${length} and maxLength is ${maxLength}',
    ({ length, maxLength, className }) => {
      render(<CharacterLimit length={length} maxLength={maxLength} />);

      expect(screen.getByText(`${length} / ${maxLength}`)).toHaveClass(
        className
      );
    }
  );
});
