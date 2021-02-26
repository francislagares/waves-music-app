import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../components/Nav';

describe('Nav Component', () => {
  test('displays navigation button', () => {
    render(<Nav />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/library/i);
  });
});
