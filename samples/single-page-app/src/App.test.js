import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn more link', () => {
  render(<App />);
  const linkElement = screen.getByText("Visit the FullStory Developer Guide");
  expect(linkElement).toBeInTheDocument();
});
