import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Get all organizations for dropdown
export const getOrganizationsList = async () => {
    try {
        console.log('Fetching organizations list...');
        const response = await axios.get(`${API_BASE_URL}/organization`);
        console.log('Organizations list response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching organizations list:', error.response || error);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch organizations list');
    }
};

// Get alumni's organizations
export const getAlumniOrganizations = async () => {
    try {
        console.log('Fetching alumni organizations...');
        const response = await axios.get(`${API_BASE_URL}/alumni/organizations`); // Changed from organization to organizations
        console.log('Alumni organizations response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching alumni organizations:', error.response || error);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch alumni organizations');
    }
};

export const addAlumniOrganization = async (organizationData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/alumni/organizations`, // Changed from organization to organizations
            organizationData
        );
        return response.data;
    } catch (error) {
        console.error('Error adding organization:', error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to add organization');
    }
};

export const updateAlumniOrganization = async (id, organizationData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/alumni/organizations/${id}`, // Changed from organization to organizations
            organizationData
        );
        return response.data;
    } catch (error) {
        console.error('Error updating organization:', error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to update organization');
    }
};

export const deleteAlumniOrganization = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/alumni/organizations/${id}`); // Changed from organization to organizations
        return true;
    } catch (error) {
        console.error('Error deleting organization:', error.response || error);
        throw new Error(error.response?.data?.message || 'Failed to delete organization');
    }
};