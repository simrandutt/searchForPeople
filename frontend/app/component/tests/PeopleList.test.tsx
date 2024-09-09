import React from 'react';
import { render, screen } from '@testing-library/react';
import PeopleList from '../PeopleList';

// Mock data for testing
const people = [
  { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
  { name: 'Darth Vader', height: '202', mass: '136', gender: 'male' },
];

describe('PeopleList Component', () => {
  it('renders the list of people correctly', () => {
    render(<PeopleList people={people} />);

    // Check that Luke Skywalker and Darth Vader are rendered
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('renders the height, mass, and gender of people', () => {
    render(<PeopleList people={people} />);

    // Check that the details are rendered for each person
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    
    // Use getAllByText since there are multiple occurrences of "Gender: male"
    const genders = screen.getAllByText('Gender: male');
    expect(genders).toHaveLength(2); // Expecting two occurrences of "Gender: male"
  });
});
