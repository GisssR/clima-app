import { WeatherResponse } from '../dtos/weather.dto';

type Props = {
  weather: WeatherResponse;
  key: string;
};

export default function WeatherResult({ weather }: Props) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>🌤️ Clima actual</h3>
      <p style={styles.data}><strong>🌡️ Temperatura:</strong> {weather.temperature} °C</p>
      <p style={styles.data}><strong>💨 Viento:</strong> {weather.windspeed} km/h</p>
    </div>
  );
}

const styles = {
  card: {
    padding: '1.5rem',
    background: '#e9f5ff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '300px',
    textAlign: 'center' as const,
    flex: 1
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#1a1a1a'
  },
  data: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
    color: '#333'
  }
};
