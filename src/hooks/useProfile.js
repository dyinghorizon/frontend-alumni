import { useState, useEffect } from 'react';
import { getAlumniProfile, updateContactInfo } from '../utils/profileUtils';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getAlumniProfile();
            setProfile(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateContact = async (contactData) => {
        try {
            setLoading(true);
            const updatedProfile = await updateContactInfo(contactData);
            setProfile(updatedProfile);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        updateContact,
        refreshProfile: fetchProfile
    };
};

export default useProfile;