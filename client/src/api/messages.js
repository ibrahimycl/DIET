import { apiService } from "./apiService";
export const sendMessage = async (body) => {
    try {
      const { data } = await apiService.post('/api/message/', body);
      return data;
    } catch (error) {
      console.log('error in sendmessage api' + error);
    }
  };
  export const fetchMessages = async (id) => {
    try {
      const { data } = await apiService.get(`/api/message/${id}`);
      return data;
    } catch (error) {
      console.log('error in fetch Message API ' + error);
    }
  };