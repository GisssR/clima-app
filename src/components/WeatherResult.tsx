// src/components/WeatherResult.tsx
import { WeatherResponse } from '../dtos/weather.dto';
import '../styles.css';

type Props = {
  weather: WeatherResponse;
};

export default function WeatherResult({ weather }: Props) {
  return (
    <div className="weather-card">
      <h3 className="weather-title">🌤️ Clima actual</h3>
      <p className="weather-data"><strong>🌡️ Temperatura:</strong> {weather.temperature} °C</p>
      <p className="weather-data"><strong>💨 Viento:</strong> {weather.windspeed} km/h</p>
    </div>
  );
}
