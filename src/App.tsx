import WeatherForm from "./components/WeatherForm";

function App() {
  return (
    <div style={{ fontFamily: "Segoe UI", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#213547" }}>
        Bienvenido a la App del Clima ☀️
      </h1>
      <p style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
        Consulta la temperatura actual y la velocidad del viento en ciudades de Honduras o usando coordenadas geográficas.
      </p>
      <hr style={{ margin: "2rem 0" }} />
      <WeatherForm />
    </div>
  );
}

export default App;