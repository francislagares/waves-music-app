import React from 'react';
import { render, screen } from '@testing-library/react';
import LibrarySong from '../components/LibrarySong';
import getSongs from '../data';

const data = getSongs();

describe('LibrarySong Component', () => {
  test('displays song metadata', async () => {
    render(<LibrarySong song={data[1]} />);

    const song = await screen.findByRole('listitem');
    const image = await screen.findByRole('img');
    const headings = await screen.findAllByRole('heading');

    expect(song).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(headings[0]).toHaveTextContent('Daylight');
    expect(headings[1]).toHaveTextContent('Aiguille');
  });
});
