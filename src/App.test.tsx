import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the RE desktop landing page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /transforma tu cuerpo\. regula tu mente\./i })
  ).toBeInTheDocument();
  expect(screen.getByRole('region', { name: /servicios/i })).toBeInTheDocument();
});
