import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Index from '../_index';
// import '@testing-library/jest-dom/extend-expect';

const mockPeople = [
  { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
  { name: 'Darth Vader', height: '202', mass: '136', gender: 'male' },
];

// Mock the fetch API call for people
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(mockPeople),  // Simulate a real API response
    } as Response)
  );
});

describe('Index Component', () => {
  it('renders search input and button', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search for a person');
    const searchButton = screen.getByText('Search');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('updates the search input value when typing', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search for a person');

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    expect(searchInput).toHaveValue('Luke');
  });

  it('displays filtered results in dropdown when typing', async () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search for a person');
    
    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    
    // Expect Luke Skywalker to appear in the dropdown
    const dropdownItem = await screen.findByText('Luke Skywalker');
    expect(dropdownItem).toBeInTheDocument();
  });

  it('clears the search input when the clear button is clicked', async () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search for a person');
    
    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    
    const clearButton = screen.getByText('✕');
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  it('hides the dropdown when clicking outside', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search for a person');
    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    
    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    
    // Expect dropdown to not be present
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
