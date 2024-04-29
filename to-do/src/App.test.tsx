import React from 'react';
import App from './App';
import { render } from 'react-dom';

test('renders learn react link', () => {
    const { getByText } = render(<App></App>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
})