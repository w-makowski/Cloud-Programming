import React, { useState, useEffect } from 'react';
import './App.css';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const weatherConditions = {
  Thunderstorm: {
    gradient: 'linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%)',
    title: 'Burza',
    subtitle: 'Uważaj na błyskawice!',
    icon: <WiThunderstorm size={80} />,
    textColor: '#ffffff'
  },
  Drizzle: {
    gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    title: 'Mżawka',
    subtitle: 'Lekkie opady',
    icon: <WiRain size={80} />,
    textColor: '#ffffff'
  },
  Rain: {
    gradient: 'linear-gradient(135deg, #00cec9 0%, #0984e3 100%)',
    title: 'Deszcz',
    subtitle: 'Weź parasol',
    icon: <WiRain size={80} />,
    textColor: '#ffffff'
  },
  Snow: {
    gradient: 'linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)',
    title: 'Śnieg',
    subtitle: 'Ubierz się ciepło',
    icon: <WiSnow size={80} />,
    textColor: '#ffffff'
  },
  Clear: {
    gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
    title: 'Słonecznie',
    subtitle: 'Idealna pogoda!',
    icon: <WiDaySunny size={80} />,
    textColor: '#ffffff'
  },
  Clouds: {
    gradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
    title: 'Pochmurno',
    subtitle: 'Może przejaśni się później',
    icon: <WiCloudy size={80} />,
    textColor: '#ffffff'
  },
  Mist: {
    gradient: 'linear-gradient(135deg, #81ecec 0%, #74b9ff 100%)',
    title: 'Mgła',
    subtitle: 'Uważaj na drodze',
    icon: <WiFog size={80} />,
    textColor: '#ffffff'
  },
  Atmosphere: {
    gradient: 'linear-gradient(135deg, #81ecec 0%, #74b9ff 100%)',
    title: 'Atmosfera',
    subtitle: 'Uważaj na drodze',
    icon: <WiFog size={80} />,
    textColor: '#ffffff'
  }
};

function App() { 
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) {
      alert('Proszę wpisać nazwę miasta');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`);

      if (!response.ok) {
        throw new Error('Błąd HTTP: ${response.status}');
      }

      const data = await response.json();

      if (!data || !data.weather || data.weather.length === 0) {
        alert('Nie udało się pobrać danych pogodowych.');
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Błąd:', error);
      alert(error.message || 'Wystąpił błąd podczas pobierania danych');
    } finally {
      setIsLoading(false);
    }
  }

  const getLocationWeather = () => { 
    if (!navigator.geolocation) {
      alert('Twoja przeglądarka nie wspiera geolokalizacji');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pl`)
          if (!response.ok) {
            throw new Error('Błąd HTTP: ' + response.status);
          }

          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Błąd:', error);
          alert(error.message || 'Wystąpił błąd podczas pobierania danych');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          alert('Aby pobrać pogodę dla Twojej lokalizacji, musisz zezwolić na dostęp do lokalizacji.');
        } else {
          alert(`Błąd geolokalizacji: ${error.message}`);
        }
      }
    )
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  const condition = weatherData ? weatherConditions[weatherData.weather[0].main] || weatherConditions.Clear : weatherConditions.Clear;
  return (
    <div 
        className="App" 
        style={{ 
          background: weatherData ? condition.gradient : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: condition.textColor || '#ffffff'
        }}
      >
        <div className="container">
          <h1 className="main-title">Prognoza pogody</h1>
          
          {weatherData && (
            <div className="weather-header">
              <div className="weather-icon">
                {condition.icon}
              </div>
              <h2 className="weather-title">{condition.title}</h2>
              <p className="weather-subtitle">{condition.subtitle}</p>
            </div>
          )}

          <div className="input-section">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Wpisz nazwę miasta..."
              className="city-input"
              disabled={isLoading}
            />

            <div className="button-group">
              <button 
                onClick={getWeather} 
                className="btn btn-primary"
                disabled={isLoading}
                style={{ 
                  background: weatherData ? condition.gradient : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: condition.textColor || '#ffffff'
                }}
              >
                {isLoading ? 'Sprawdzam...' : 'Sprawdź pogodę'}
              </button>
              
              <button 
                onClick={getLocationWeather} 
                className="btn btn-location"
                disabled={isLoading}
                style={{ 
                  background: weatherData ? condition.gradient : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: condition.textColor || '#ffffff'
                }}
              >
                {isLoading ? 'Lokalizuję...' : 'Moja lokalizacja'}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {weatherData && (
            <div className="weather-info" style={{ 
              background: weatherData ? condition.gradient : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: condition.textColor || '#ffffff'
            }}>
              <h2 className="location-title">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              
              <div className="weather-grid">
                <div className="weather-item">
                  <span className="label">Opis:</span>
                  <span className="value description">
                    {weatherData.weather[0].description}
                  </span>
                </div>
                
                <div className="weather-item">
                  <span className="label">Temperatura:</span>
                  <span className="value temperature">
                    {Math.round(weatherData.main.temp)}°C
                  </span>
                </div>
                
                <div className="weather-item">
                  <span className="label">Odczuwalna:</span>
                  <span className="value">
                    {Math.round(weatherData.main.feels_like)}°C
                  </span>
                </div>
                
                <div className="weather-item">
                  <span className="label">Ciśnienie:</span>
                  <span className="value">
                    {weatherData.main.pressure} hPa
                  </span>
                </div>
                
                <div className="weather-item">
                  <span className="label">Wilgotność:</span>
                  <span className="value">
                    {weatherData.main.humidity}%
                  </span>
                </div>
                
                <div className="weather-item">
                  <span className="label">Wiatr:</span>
                  <span className="value">
                    {weatherData.wind.speed} m/s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default App;
