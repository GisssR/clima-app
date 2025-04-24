import { WeatherResponse } from '../dtos/weather.dto';

export async function getWeatherByCity(lat: number, lon: number): Promise<WeatherResponse> {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  const json = await res.json();
  return {
    temperature: json.current_weather.temperature,
    windspeed: json.current_weather.windspeed,
  };
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherResponse> {
  return getWeatherByCity(lat, lon);
}
