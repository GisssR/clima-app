import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type Props = {
  lat: number;
  lon: number;
};

const containerStyle = {
  width: '400px',
  height: '300px',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

export default function Map({ lat, lon }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDK1NSLsZjyqBsOUTCNR3vuYdHlpcprkm0' 
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng: lon }}
      zoom={12}
    >
      <Marker position={{ lat, lng: lon }} />
    </GoogleMap>
  ) : <p>Cargando mapa...</p>;
}
