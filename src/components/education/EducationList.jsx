import React from 'react';
import EducationCard from './EducationCard';

const EducationList = ({ educations, onEdit, onDelete }) => {
    if (!educations.length) {
        return (
            <div className="alert alert-info" role="alert">
                No education records found. Add your first education detail!
            </div>
        );
    }

    return (
        <div className="row">
            {educations.map(education => (
                <div key={education.id} className="col-md-6 mb-3">
                    <EducationCard 
                        education={education}
                        onEdit={() => onEdit(education)}
                        onDelete={() => onDelete(education.id)}
                    />
                </div>
            ))}
        </div>
    );
};

export default EducationList;