import React, { useEffect, useState } from 'react';
import axios from "../AxiosConfig";
import './component.css';

function MaterialGroupCombo({ initialValue = 0, GroupChange }) {
  const [data, setData] = useState([]);
  const [groupid, setGroupid] = useState(initialValue);
  const [error, setError] = useState(null);
  
  // Handle group selection change
  const handleGroupChanged = (e) => {
    const newValue = parseInt(e.target.value);
    setGroupid(newValue);
    const selectedGroup = data.find(item => item.mg_id === newValue);
    GroupChange(e, selectedGroup);
  };

  // Fetch groups and handle errors
  const fetchGroup = async () => {
    try {
      const response = await axios.get('/material-group');
      setData(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  // Use effect to fetch group data once on component mount
  useEffect(() => {
    fetchGroup();
  }, []);

  // Use effect to update group ID when initialvalue changes
  useEffect(() => {
    setGroupid(initialValue);
  }, [initialValue]);

  return (
    <div>
      <label htmlFor="group" className='form-label'>
        Group Name:<span style={{ color: 'red' }}>*</span>
      </label>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <select
          id="group"
          name="group"
          className="site-dropdown combo-fontweight form-input"
          onChange={handleGroupChanged}
          value={groupid}
        >
          <option
            style={{ fontWeight: '500', color: '#dadada', textTransform: 'capitalize' }}
            value={0}
            disabled
          >
            Select Group
          </option>
          {data.map((item) => (
            <option value={item.mg_id} key={item.mg_id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default MaterialGroupCombo;
