import { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      JSON.parse(inputValue);

      // Make API call
      const result = await axios.post('http://127.0.0.1:5000/bfhl', JSON.parse(inputValue));
      setResponse(result.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or error in API call');
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const getFilteredData = () => {
    if (!response) return {};

    const filters = selectedOptions.map(option => option.value);
    const filtered = {};

    filters.forEach(filter => {
      if (response[filter]) {
        filtered[filter] = response[filter];
      }
    });

    return filtered;
  };

  return (
    <div className="container">
      <h1>Your Roll Number</h1>
      <textarea
        rows="5"
        cols="50"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Enter JSON here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
      <Select
        isMulti
        name="options"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleSelectChange}
      />
      <div>
        <h2>Response</h2>
        <pre>{JSON.stringify(getFilteredData(), null, 2)}</pre>
      </div>
    </div>
  );
}
