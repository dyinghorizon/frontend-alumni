import { useState, useEffect } from 'react';
import { getAllEducation, addEducation, updateEducation, deleteEducation } from '../utils/educationUtils';
import Education from '../models/Education';

const useEducation = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEducations = async () => {
        try {
            setLoading(true);
            const data = await getAllEducation();
            setEducations(data.map(edu => Education.fromResponse(edu)));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addNewEducation = async (educationData) => {
        try {
            setLoading(true);
            const newEducation = await addEducation(educationData);
            setEducations([...educations, Education.fromResponse(newEducation)]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateExistingEducation = async (id, educationData) => {
        try {
            setLoading(true);
            const updatedEducation = await updateEducation(id, educationData);
            setEducations(educations.map(edu => 
                edu.id === id ? Education.fromResponse(updatedEducation) : edu
            ));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeEducation = async (id) => {
        try {
            setLoading(true);
            await deleteEducation(id);
            setEducations(educations.filter(edu => edu.id !== id));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    return {
        educations,
        loading,
        error,
        addEducation: addNewEducation,
        updateEducation: updateExistingEducation,
        deleteEducation: removeEducation,
        refreshEducations: fetchEducations
    };
};

export default useEducation;