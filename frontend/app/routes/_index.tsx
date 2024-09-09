import { useState, useEffect, useRef } from "react";
import PeopleList from "../component/PeopleList";

// Define the Person type
type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
};

// Debounce function to delay search queries
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function Index() {
  // State variables
  const [people, setPeople] = useState<Person[]>([]); // List of people
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]); // Filtered people list
  const [search, setSearch] = useState<string>(""); // Search input value
  const [error, setError] = useState<string | null>(null); // Error message
  const [showDropdown, setShowDropdown] = useState<boolean>(true); // Control dropdown visibility
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]); // Selected people to display
  const [isClient, setIsClient] = useState<boolean>(false); // Check if running on client side

  // References for search input and dropdown
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure client-side rendering to prevent SSR/CSR mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch people data from the API when the component mounts
  useEffect(() => {
    fetch("/api/people")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch people");
        return res.json();
      })
      .then((data: Person[]) => {
        setPeople(data);
        setFilteredPeople(data); // Set the initial list of people
      })
      .catch((err) => setError(err.message));
  }, []);

  // Debounced search function to filter people
  const handleSearch = debounce((query: string) => {
    if (!query) {
      setFilteredPeople(people); // Show all people if search is empty
    } else {
      const filtered = people.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPeople(filtered); // Update filtered list based on search
    }
    setShowDropdown(true); // Show dropdown on search
  }, 300);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    handleSearch(query); // Trigger debounced search
  };

  // Clear search input and reset filtered list
  const handleClearInput = () => {
    setSearch("");
    searchInputRef.current?.focus();
    handleSearch(""); // Reset to full list
  };

  // Handle search button click
  const handleSearchButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedPeople(filteredPeople); // Set filtered people as selected
    setShowDropdown(false); // Hide dropdown
  };

  // Handle item selection from dropdown
  const handleListItemClick = (person: Person) => {
    setSelectedPeople([person]); // Display selected person below
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Search People</h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <div className="flex items-center space-x-2">
          {/* Input for search */}
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              className="border border-gray-300 rounded-full w-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleInputChange}
              placeholder="Search for a person"
            />
            {search && (
              <button
                className="absolute right-4 top-3 text-gray-500"
                onClick={handleClearInput}
              >
                &#x2715;
              </button>
            )}
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
        </div>

        {/* Dropdown for search results */}
        {isClient && showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white border mt-2 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10"
          >
            <ul className="divide-y divide-gray-200">
              {filteredPeople.map((person, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleListItemClick(person)}
                >
                  <h3 className="font-bold">{person.name}</h3>
                  <p className="text-sm text-gray-500">Height: {person.height}</p>
                  <p className="text-sm text-gray-500">Mass: {person.mass}</p>
                  <p className="text-sm text-gray-500">Gender: {person.gender}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display filtered people below the search bar */}
      {selectedPeople.length > 0 && (
        <div className="mt-12 w-full max-w-lg bg-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Filtered Results</h2>
          <PeopleList people={selectedPeople} />
        </div>
      )}
    </div>
  );
}
