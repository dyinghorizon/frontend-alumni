import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAlumniProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alumni/profile`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
};

export const updateContactInfo = async (contactData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/alumni/profile`, contactData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update contact information');
    }
};