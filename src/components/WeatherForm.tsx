// src/components/WeatherForm.tsx
import { useState } from 'react';
import WeatherResult from './WeatherResult';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';
import { WeatherResponse } from '../dtos/weather.dto';
import Map from './Map';

const cities = [
  { name: 'Tegucigalpa', lat: 14.0723, lon: -87.1921 },
  { name: 'Centro de San Pedro Sula', lat: 15.5062, lon: -88.0251 },
  { name: 'Sur de San Pedro Sula', lat: 15.5, lon: -88.03 },
  { name: 'Este de San Pedro Sula', lat: 15.51, lon: -88.02 },
  { name: 'La Ceiba', lat: 15.7597, lon: -86.7822 },
  { name: 'Choluteca', lat: 13.3007, lon: -87.1907 }
];

export default function WeatherForm() {
  const [mode, setMode] = useState<'city' | 'coords'>('city');
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const clearResults = () => {
    setWeather(null);
    setCoords(null);
    setError('');
  };

  const handleCitySearch = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getWeatherByCity(selectedCity.lat, selectedCity.lon);
      setWeather({ ...data });
      setCoords({ lat: selectedCity.lat, lon: selectedCity.lon });
    } catch {
      setError('Hubo un error al obtener el clima. Intente de nuevo.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const lat = Number(latitude);
      const lon = Number(longitude);
      const data = await getWeatherByCoords(lat, lon);
      setWeather({ ...data });
      setCoords({ lat, lon });
    } catch {
      setError('Error con las coordenadas ingresadas.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>¿Cómo deseas consultar el clima?</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => { setMode('city'); clearResults(); }}
          style={{ backgroundColor: mode === 'city' ? '#4caf50' : '#ccc', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', color: 'white' }}>
          Por Ciudad
        </button>
        <button
          onClick={() => { setMode('coords'); clearResults(); }}
          style={{ backgroundColor: mode === 'coords' ? '#4caf50' : '#ccc', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', color: 'white' }}>
          Por coordenadas
        </button>
      </div>

      {mode === 'city' ? (
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="citySelect">Selecciona una ciudad:</label>
          <select
            id="citySelect"
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find(c => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
            style={{ marginLeft: '0.5rem' }}
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <button onClick={handleCitySearch} style={{ marginLeft: '1rem' }}>Buscar</button>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="number"
            placeholder="Latitud"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{ marginRight: '1rem' }}
          />
          <input
            type="number"
            placeholder="Longitud"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button onClick={handleManualSearch} style={{ marginLeft: '1rem' }}>Buscar</button>
        </div>
      )}

      {loading && <p>Cargando clima...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && coords && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <WeatherResult
            key={`${weather.temperature}-${weather.windspeed}-${Date.now()}`}
            weather={weather}
          />
          <Map lat={coords.lat} lon={coords.lon} />
        </div>
      )}
    </section>
  );
}