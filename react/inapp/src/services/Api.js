import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchmovies = async (filters,token) => {
    try {
        const response = await axios.get(`${BASE_URL}/movies`, {
            params: filters,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchpersons = async (filters, token) => {
   try {
       const response = await axios.get(`${BASE_URL}/persons`, {
           params: filters,
           headers: {
               Authorization: `Bearer ${token}`
           }
       });
       return response.data;
   } catch (error) {
       throw error;
   }
};

const loginuser = async (formData) => {
   try {
      const response = await axios.post(`${BASE_URL}/token/`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      return  response.data;
   } catch (error) {
      throw error;
   }
}

const registeruser = async(username, password) => {
   try {
      const response  = await axios.post(`${BASE_URL}/register/`, {
         username,
         password
       });
       return response.data
   } catch(error){
      throw error;
   }
} 

export default {
   fetchmovies, fetchpersons, loginuser, registeruser
}

