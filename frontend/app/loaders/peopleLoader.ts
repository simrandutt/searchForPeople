// Fetch the list of people from the backend API.
export const loader = async () => {
  const response = await fetch('http://localhost:3000/api/people'); // Request to API
  const people = await response.json(); // Parse JSON response
  return { people }; // Return fetched people data
};
