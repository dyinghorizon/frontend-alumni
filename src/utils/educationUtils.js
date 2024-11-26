import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getAllEducation = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alumni/education`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch education details');
    }
};

export const addEducation = async (educationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/alumni/education`, educationData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add education');
    }
};

export const updateEducation = async (id, educationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/alumni/education/${id}`, educationData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update education');
    }
};

export const deleteEducation = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/alumni/education/${id}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete education');
    }
};