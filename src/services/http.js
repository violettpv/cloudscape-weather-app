import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const forecastWeather = 'forecast.json';

const getWeatherByLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${API_URL}${forecastWeather}?key=${API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${API_URL}${forecastWeather}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export { getWeatherByLocation, getWeatherByCity };
