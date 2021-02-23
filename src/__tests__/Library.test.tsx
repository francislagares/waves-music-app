import React from 'react';
import { render, screen } from '@testing-library/react';
import Library from '../components/Library';
import getSongs from '../data';

const data = getSongs();

describe('Library Component', () => {
  test('render a list of songs', async () => {
    render(<Library songs={data} />);

    const songs = await screen.findAllByRole('listitem');

    expect(songs).toHaveLength(6);
  });
});
