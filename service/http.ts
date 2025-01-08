import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://api.theclockchain.io/api/v1',
  headers: {
    'clock-api-key': process.env.NEXT_PUBLIC_CLOCKPAY_API_KEY,
  },
});

class Http {
  getCoins = async () => {
    try {
      const response = await AxiosInstance.get('/wallet/checkout/coins');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const http = new Http();
export default http;
