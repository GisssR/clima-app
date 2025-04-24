import { useState } from 'react';
import WeatherResult from './WeatherResult';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';
import { WeatherResponse } from '../dtos/weather.dto';
import '../styles.css';

const cities = [
  { name: 'Tegucigalpa', lat: 14.0723, lon: -87.1921 },
  { name: 'San Pedro Sula Centro', lat: 15.5062, lon: -88.0251 },
  { name: 'San Pedro Sula Sur', lat: 15.5, lon: -88.03 },
  { name: 'San Pedro Sula Este', lat: 15.51, lon: -88.02 },
  { name: 'La Ceiba', lat: 15.7597, lon: -86.7822 },
  { name: 'Choluteca', lat: 13.3007, lon: -87.1907 }
];

export default function WeatherForm() {
  const [mode, setMode] = useState<'city' | 'coords'>('city');
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [searchKey, setSearchKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCitySearch = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeatherByCity(selectedCity.lat, selectedCity.lon);
      setWeather(data);
      setSearchKey(Date.now());
    } catch {
      setError('Hubo un error al obtener el clima. Intente de nuevo.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async () => {
    if (!latitude || !longitude) {
      setError('Por favor ingresa ambos valores: latitud y longitud.');
      setWeather(null);
      return;
    }
  
    try {
      setLoading(true);
      setError('');
      const data = await getWeatherByCoords(Number(latitude), Number(longitude));
      setWeather(data);
      setSearchKey(Date.now());
    } catch {
      setError('Error con las coordenadas ingresadas.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather-form">
      <h2 className="form-title">¿Cómo deseas consultar el clima?</h2>
      <div className="mode-toggle">
        <button
          onClick={() => {
            setMode('city');
            setWeather(null);
            setError('');
          }}
          className={`toggle-button ${mode === 'city' ? 'active' : ''}`}
        >
          Por Ciudad
        </button>
        <button
          onClick={() => {
            setMode('coords');
            setWeather(null);
            setError('');
          }}
          className={`toggle-button ${mode === 'coords' ? 'active' : ''}`}
        >
          Por Coordenadas
        </button>
      </div>

      {mode === 'city' ? (
        <div className="city-select">
          <label htmlFor="citySelect">Selecciona una ciudad:</label>
          <select
            id="citySelect"
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find(c => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <button onClick={handleCitySearch} className="search-button">Buscar</button>
        </div>
      ) : (
        <div className="coord-inputs">
          <input
            type="number"
            placeholder="Latitud"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="number"
            placeholder="Longitud"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button onClick={handleManualSearch} className="search-button">Buscar</button>
        </div>
      )}

      {loading && <p className="loading">Cargando clima...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherResult key={searchKey} weather={weather} />}
    </section>
  );
}