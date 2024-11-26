import React from 'react';

const EducationCard = ({ education, onEdit, onDelete }) => {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{education.degree}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{education.collegeName}</h6>
                <p className="card-text">
                    <strong>Address:</strong> {education.address}<br />
                    <strong>Duration:</strong> {education.joiningYear} - {education.passingYear}
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

export default EducationCard;