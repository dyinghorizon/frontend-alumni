import React from 'react';
import OrganizationCard from './OrganizationCard';

const OrganizationList = ({ organizations, onEdit, onDelete }) => {
    if (!organizations.length) {
        return (
            <div className="alert alert-info" role="alert">
                No organizations found. Add your first organization!
            </div>
        );
    }

    return (
        <div className="row">
            {organizations.map(organization => (
                <div key={organization.id} className="col-md-6 mb-3">
                    <OrganizationCard 
                        organization={organization}
                        onEdit={() => onEdit(organization)}
                        onDelete={() => onDelete(organization.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default OrganizationList;