import React, { useState, useEffect } from 'react';

const EducationForm = ({ education, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        degree: '',
        collegeName: '',
        address: '',
        joiningYear: '',
        passingYear: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (education) {
            setFormData({
                degree: education.degree,
                collegeName: education.collegeName,
                address: education.address,
                joiningYear: education.joiningYear,
                passingYear: education.passingYear
            });
        }
    }, [education]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.degree) newErrors.degree = 'Degree is required';
        if (!formData.collegeName) newErrors.collegeName = 'College name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.joiningYear) {
            newErrors.joiningYear = 'Joining year is required';
        } else if (formData.joiningYear < 1900 || formData.joiningYear > 2100) {
            newErrors.joiningYear = 'Invalid joining year';
        }
        
        if (!formData.passingYear) {
            newErrors.passingYear = 'Passing year is required';
        } else if (formData.passingYear < 1900 || formData.passingYear > 2100) {
            newErrors.passingYear = 'Invalid passing year';
        }

        if (formData.passingYear && formData.joiningYear && 
            parseInt(formData.passingYear) < parseInt(formData.joiningYear)) {
            newErrors.passingYear = 'Passing year must be after joining year';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
                <h3 className="card-title mb-4">
                    {education ? 'Update Education' : 'Add Education'}
                </h3>
                
                <div className="mb-3">
                    <label htmlFor="degree" className="form-label">Degree</label>
                    <input
                        type="text"
                        className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                        id="degree"
                        value={formData.degree}
                        onChange={(e) => setFormData({...formData, degree: e.target.value})}
                    />
                    {errors.degree && <div className="invalid-feedback">{errors.degree}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="collegeName" className="form-label">College Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`}
                        id="collegeName"
                        value={formData.collegeName}
                        onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
                    />
                    {errors.collegeName && <div className="invalid-feedback">{errors.collegeName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="joiningYear" className="form-label">Joining Year</label>
                        <input
                            type="number"
                            className={`form-control ${errors.joiningYear ? 'is-invalid' : ''}`}
                            id="joiningYear"
                            value={formData.joiningYear}
                            onChange={(e) => setFormData({...formData, joiningYear: e.target.value})}
                        />
                        {errors.joiningYear && <div className="invalid-feedback">{errors.joiningYear}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="passingYear" className="form-label">Passing Year</label>
                        <input
                            type="number"
                            className={`form-control ${errors.passingYear ? 'is-invalid' : ''}`}
                            id="passingYear"
                            value={formData.passingYear}
                            onChange={(e) => setFormData({...formData, passingYear: e.target.value})}
                        />
                        {errors.passingYear && <div className="invalid-feedback">{errors.passingYear}</div>}
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {education ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EducationForm;