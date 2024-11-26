import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import EducationList from '../components/education/EducationList';
import EducationForm from '../components/education/EducationForm';
import useEducation from '../hooks/useEducation';

const EducationPage = () => {
    const { educations, loading, error, addEducation, updateEducation, deleteEducation } = useEducation();
    const [showForm, setShowForm] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState(null);

    const handleAdd = async (formData) => {
        const success = await addEducation(formData);
        if (success) {
            setShowForm(false);
            setSelectedEducation(null);
        }
    };

    const handleUpdate = async (formData) => {
        const success = await updateEducation(selectedEducation.id, formData);
        if (success) {
            setShowForm(false);
            setSelectedEducation(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this education record?')) {
            await deleteEducation(id);
        }
    };

    const handleEdit = (education) => {
        setSelectedEducation(education);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedEducation(null);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container mt-4">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Education Details</h2>
                    {!showForm && (
                        <button 
                            className="btn btn-primary" 
                            onClick={() => setShowForm(true)}
                        >
                            Add Education
                        </button>
                    )}
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {showForm ? (
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <EducationForm 
                                education={selectedEducation}
                                onSubmit={selectedEducation ? handleUpdate : handleAdd}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
                ) : (
                    <EducationList 
                        educations={educations}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </>
    );
};

export default EducationPage;