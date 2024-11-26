import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import OrganizationList from '../components/organization/OrganizationList';
import OrganizationForm from '../components/organization/OrganizationForm';
import useOrganization from '../hooks/useOrganization';

const OrganizationPage = () => {
    const { 
        organizations, 
        organizationsList,
        loading, 
        error, 
        addOrganization, 
        updateOrganization, 
        deleteOrganization 
    } = useOrganization();
    
    const [showForm, setShowForm] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    const handleAdd = async (formData) => {
        const success = await addOrganization(formData);
        if (success) {
            setShowForm(false);
            setSelectedOrganization(null);
        }
    };

    const handleUpdate = async (formData) => {
        const success = await updateOrganization(selectedOrganization.id, formData);
        if (success) {
            setShowForm(false);
            setSelectedOrganization(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this organization record?')) {
            await deleteOrganization(id);
        }
    };

    const handleEdit = (organization) => {
        setSelectedOrganization(organization);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedOrganization(null);
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
                    <h2>Organization Details</h2>
                    {!showForm && (
                        <button 
                            className="btn btn-primary" 
                            onClick={() => setShowForm(true)}
                        >
                            Add Organization
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
                            <OrganizationForm 
                                organization={selectedOrganization}
                                organizations={organizationsList}
                                onSubmit={selectedOrganization ? handleUpdate : handleAdd}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
                ) : (
                    <OrganizationList 
                        organizations={organizations}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </>
    );
};

export default OrganizationPage;