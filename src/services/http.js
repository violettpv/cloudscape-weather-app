import axios from 'axios';
const API_URL = 'http://api.weatherapi.com/v1/';
const API_KEY = '9c8d8360794342f089191046242109';
// const currentWeather = 'current.json';
const forecastWeather = 'forecast.json';

const getWeatherByLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${API_URL}${forecastWeather}?key=${API_KEY}&q=${latitude},${longitude}&days=3&aqi=no&alerts=yes`
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

// const createUser = async (userData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.post(API_URL + 'newuser', userData, config);
//   return response.data;
// };

// const deleteUser = async (uuid, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.delete(API_URL + 'delete/' + uuid, config);
//   return response.data;
// };

export { getWeatherByLocation };
