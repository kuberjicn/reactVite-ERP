import React, { useState, useEffect } from 'react';
import axios from "../AxiosConfig";
import './component.css';
import { useGlobleInfoContext } from "../GlobleInfoProvider";

function SearchableMaterialChange({ initialvalue, isread, handleMaterialChange, isall = false }) {
  const [data, setData] = useState([]); // For dropdown data
  const [mat_id, setMat_id] = useState(initialvalue || 0); // Selected material ID
  const [searchQuery, setSearchQuery] = useState(''); // For search query
  const [isSelected, setIsSelected] = useState(false); // To track if an item is selected
  const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility
  const { myState, updateProperty } = useGlobleInfoContext(); // Global state (if needed)
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (initialvalue) {
      setMat_id(initialvalue);
      fetchMaterialById(initialvalue); // Fetch the material name for the initial value
    }
  }, [initialvalue]);

  useEffect(() => {
    if (searchQuery && !isSelected) {
      fetchMaterials(); // Fetch materials when search query is entered
    }
  }, [searchQuery]);

  // Fetch materials based on the search query
  const fetchMaterials = async () => {
    try {
      const response = await axios.get("/material/", {
        params: { search: searchQuery }
      });

      const responseData = response && response.data ? response.data.results : [];
      setData(responseData);
      //setShowDropdown(true); // Show dropdown when results are fetched
    } catch (error) {
      console.error("Error fetching material data:", error);
    }
  };

  // Fetch material by id for the initial value
  const fetchMaterialById = async (id) => {
    try {
      const response = await axios.get(`/material/${id}/`); // Assuming there is an API endpoint for this
      if (response && response.data) {
        setSearchQuery(response.data.mat_name); // Set the material name in the search input
        // setIsSelected(true); // Mark the material as selected
      }
    } catch (error) {
      console.error("Error fetching material by ID:", error);
    }
  };

  // Handle selecting a material from the dropdown
  const handleSelect = (id, name) => {
    setMat_id(id);
    setSearchQuery(name); // Set the selected material's name in the input
    //setIsSelected(true); // Disable further typing
    const selectedItem = data.find((item) => item.mat_id === id);
    handleMaterialChange(selectedItem); // Send the selected material to the parent component
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedIndex(-1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    //setIsSelected(false); // Allow typing again
    setSearchQuery(newQuery); // Update the search query as user types.
    setHighlightedIndex(-1);
  };

  // Clear the input and allow the user to search again
  const clearInput = () => {
    setSearchQuery('');
    // setIsSelected(false);
    setMat_id(0); // Clear the selected material ID
  };

  const handleKeyDown = (e) => {
    console.log(highlightedIndex);
    
    if (showDropdown && data.length > 0) {
      if (e.key === 'ArrowDown') {
        // Move highlight down
        setHighlightedIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === 'ArrowUp') {
        // Move highlight up
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        // Select the highlighted item when Enter is pressed
        const selectedItem = data[highlightedIndex];
        handleSelect(selectedItem.mat_id, selectedItem.mat_name);
        e.preventDefault();
      }
    }
  };

  return (
    <div className="material-search">
      <label htmlFor="material" className="form-label">
        Material:<span style={{ color: 'red' }}>*</span>
      </label>
      
      <input
      style={{textTransform:'uppercase'}}
        type="text"
        id="material"
        name="material"
        value={searchQuery} // Display search query or selected material name
        onChange={handleSearchChange}
        placeholder="Search material..."
        className="form-input"
        disabled={isread || isSelected} // Disable input if a material is selected
        onFocus={() => setShowDropdown(true)}
       autoComplete='off'
       onKeyDown={handleKeyDown}
      />

      {isSelected && (
        <button onClick={clearInput} className="clear-btn">Clear</button>
      )}

      {showDropdown && data.length > 0 && (
        <ul className="dropdown">
          {isall && <li onClick={() => handleSelect(0, 'ALL')}>ALL</li>}
          {data.map((item) => (
            <li
              key={item.mat_id}
              onClick={() => handleSelect(item.mat_id, item.mat_name)}
              className="dropdown-item"
            >
              {item.mat_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableMaterialChange;
