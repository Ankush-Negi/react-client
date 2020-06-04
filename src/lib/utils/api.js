import axios from 'axios';

const apiCall = async (apiData, endPoint, method) => {
  const URL = process.env.REACT_APP_BASE_URL + endPoint;
  try {
    const result = await axios({
      method,
      url: URL,
      ...apiData,
    });
    const { data } = await result;
    return data;
  } catch (error) {
    return ({ message: error.message, status: 'error' });
  }
};
export default apiCall;
