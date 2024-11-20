import { useState } from 'react';
import './index.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Static weather data for testing
  const staticWeatherData = {
    temperature: 22, // Celsius
    location: 'New York',
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    icon: 'https://openweathermap.org/img/wn/04d.png', // A placeholder icon
    condition: 'Partly cloudy',
  };

  const handleSearch = async () => {
    if (!location) {
      setError('Please enter a location'); // Better error message for empty input
      return;
    }

    console.log('Fetching weather for location:', location); // Debugging log

    // Clear previous weather data and errors before fetching new data
    setWeatherData(null);
    setError(null);

    try {
      // Use the static data instead of an API request
      // Here, you can add more locations and conditions as needed
      if (location.toLowerCase() === 'new york') {
        setWeatherData(staticWeatherData);
      } else {
        // Simulate weather data for other locations
        setWeatherData({
          temperature: 18,
          location: location,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          icon: 'https://openweathermap.org/img/wn/01d.png', // Placeholder sunny icon
          condition: 'Sunny',
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <header className="header">
        <div className="input-container">
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter Location"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update location state
            onKeyDown={handleKeyDown} // Listen for Enter key press
          />
          <button id="search" className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>
      <main className="main-content">
        <div className="weather-container">
          {error && <div className="error">{error}</div>} {/* Display error if any */}
          {weatherData ? (
            <>
              <div className="temperature">{weatherData.temperature}°C</div>
              <div className="location-date">
                <div className="location">{weatherData.location}</div>
                <span className="time">{weatherData.time}</span>
                <br></br>
                <span className="date">{weatherData.date}</span>
              </div>
              <div className="weather-state">
                <img
                  src={weatherData.icon}
                  className="emoji"
                  alt="Weather icon"
                />
                <div className="condition">{weatherData.condition}</div>
              </div>
            </>
          ) : (
            <div>Please enter a location to get weather data.</div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
