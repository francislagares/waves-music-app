import React from 'react';
import { render, screen } from '@testing-library/react';
import Song from '../components/Song';
import getSongs from '../data';

const data = getSongs();

describe('Song Component', () => {
  test('displays image and song details', async () => {
    render(<Song currentSong={data[0]} />);

    const image = await screen.findByRole('img');
    const altText = image.alt;
    const songName = await screen.findByText(/beaver creek/i);
    const artistName = await screen.findByText(/Aso, Middle School, Aviino/i);

    expect(image).toBeInTheDocument();
    expect(altText).toBe('Aso, Middle School, Aviino');
    expect(songName).toHaveTextContent('Beaver Creek');
    expect(artistName).toHaveTextContent('Aso, Middle School, Aviino');
  });
});
