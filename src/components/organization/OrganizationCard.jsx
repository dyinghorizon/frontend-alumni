import React from 'react';

const OrganizationCard = ({ organization, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{organization.organizationName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{organization.position}</h6>
                <p className="card-text">
                    <strong>Address:</strong> {organization.organizationAddress}<br />
                    <strong>Duration:</strong> {formatDate(organization.joiningDate)} - {formatDate(organization.leavingDate)}
                </p>
                <div className="d-flex justify-content-end mt-3">
                    <button 
                        className="btn btn-outline-primary me-2" 
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;