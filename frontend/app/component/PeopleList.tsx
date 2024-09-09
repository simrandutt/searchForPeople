// Define the type for each person object.
type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
};

export default function PeopleList({ people }: { people: Person[] }) {
  return (
    // Render an unordered list (ul) that will contain the list of people.
    <ul>
      {people.map((person, index) => (
        // 'key' is necessary in React to uniquely identify each item in the list.
        <li key={index} className="p-2">
          {/* Display person's name*/}
          <h3 className="font-bold">{person.name}</h3>
          
          {/* Display person's height, mass, and gender below the name */}
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          <p>Gender: {person.gender}</p>
        </li>
      ))}
    </ul>
  );
}
