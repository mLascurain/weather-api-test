const consultar = () => {
  let userInput = prompt("Please enter a location name");
  console.log(userInput);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userInput}?key=9NVXLYRH5WCYYWHN75UX3B2GZ`;
  llamarApi(url);
};

const llamarApi = async (url) => {
  mostrarCargando(true);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    crearCheckbox();
    mostrar(data);
  } catch (error) {
    console.log(error);
  } finally {
    mostrarCargando(false);
  }
};

const mostrarCargando = (estado) => {
  const loadingIndicator = document.querySelector(".loading");
  if (estado) {
    loadingIndicator.style.display = "block";
  } else {
    loadingIndicator.style.display = "none";
  }
};

const mostrar = (data) => {
  const toggleTemp = document.querySelector("input[name=toggleTemp]");
  tempCelsius(data);
  toggleTemp.addEventListener("change", () => {
    if (toggleTemp.checked) {
      tempFahrenheit(data);
    } else {
      tempCelsius(data);
    }
  });
};

const tempFahrenheit = (data) => {
  const container = document.querySelector(".container-data");
  container.innerHTML = `
    <h2>${data.currentConditions.conditions}</h2>
    <p>Temperture: ${data.currentConditions.temp}°F</p>
    <p>Feels like: ${data.currentConditions.feelslike}°F</p>
    <p>Humidity: ${data.currentConditions.humidity}%</p>
    `;
};

const tempCelsius = (data) => {
  const tempCelsius = ((data.currentConditions.temp - 32) * 5) / 9;
  const tempFelslike = ((data.currentConditions.feelslike - 32) * 5) / 9;
  console.log(tempCelsius);
  const container = document.querySelector(".container-data");
  container.innerHTML = `
    <h2>${data.currentConditions.conditions}</h2>
    <p>Temperture: ${tempCelsius.toFixed(1)}°C</p>
    <p>Feels like: ${tempFelslike.toFixed(1)}°C</p>
    <p>Humidity: ${data.currentConditions.humidity}%</p>
    `;
};

const crearCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "toggleTemp";
  const label = document.createElement("label");
  label.textContent = "Change temperature unit measurement";
  label.htmlFor = "toggleTemp";
  const container = document.querySelector(".container");
  container.appendChild(label);
  container.appendChild(checkbox);
};

consultar();
