import { useState, useEffect } from 'react';
import {
    getOrganizationsList,
    getAlumniOrganizations,
    addAlumniOrganization,
    updateAlumniOrganization,
    deleteAlumniOrganization
} from '../utils/organizationUtils';
import Organization from '../models/Organization';

const useOrganization = () => {
    const [organizations, setOrganizations] = useState([]);
    const [organizationsList, setOrganizationsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrganizationsList = async () => {
        try {
            const data = await getOrganizationsList();
            setOrganizationsList(data);
            return true;
        } catch (err) {
            console.error('Failed to fetch organizations list:', err);
            setError(err.message);
            return false;
        }
    };

    const fetchAlumniOrganizations = async () => {
        try {
            const data = await getAlumniOrganizations();
            setOrganizations(data.map(org => Organization.fromResponse(org)));
            setError(null);
            return true;
        } catch (err) {
            console.error('Failed to fetch alumni organizations:', err);
            setError(err.message);
            return false;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [orgListSuccess, alumniOrgSuccess] = await Promise.all([
                    fetchOrganizationsList(),
                    fetchAlumniOrganizations()
                ]);

                if (!orgListSuccess || !alumniOrgSuccess) {
                    setError('Failed to load some data. Please refresh the page.');
                }
            } catch (err) {
                console.error('Error in useEffect:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addOrganization = async (organizationData) => {
        try {
            setLoading(true);
            const newOrganization = await addAlumniOrganization(organizationData);
            setOrganizations([...organizations, Organization.fromResponse(newOrganization)]);
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateOrganization = async (id, organizationData) => {
        try {
            setLoading(true);
            const updatedOrganization = await updateAlumniOrganization(id, organizationData);
            setOrganizations(organizations.map(org => 
                org.id === id ? Organization.fromResponse(updatedOrganization) : org
            ));
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteOrganization = async (id) => {
        try {
            setLoading(true);
            await deleteAlumniOrganization(id);
            setOrganizations(organizations.filter(org => org.id !== id));
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        organizations,
        organizationsList,
        loading,
        error,
        addOrganization,
        updateOrganization,
        deleteOrganization,
        refreshOrganizations: fetchAlumniOrganizations
    };
};

export default useOrganization;