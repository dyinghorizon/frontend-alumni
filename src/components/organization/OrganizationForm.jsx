import React, { useState, useEffect } from 'react';

const OrganizationForm = ({ organization, organizations, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        organizationId: '',
        position: '',
        joiningDate: '',
        leavingDate: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (organization) {
            setFormData({
                organizationId: organization.organizationId.toString(),
                position: organization.position,
                joiningDate: organization.joiningDate ? new Date(organization.joiningDate).toISOString().split('T')[0] : '',
                leavingDate: organization.leavingDate ? new Date(organization.leavingDate).toISOString().split('T')[0] : ''
            });
        }
    }, [organization]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.organizationId) {
            newErrors.organizationId = 'Organization is required';
        }
        if (!formData.position) {
            newErrors.position = 'Position is required';
        }
        if (!formData.joiningDate) {
            newErrors.joiningDate = 'Joining date is required';
        }
        if (formData.leavingDate && new Date(formData.leavingDate) < new Date(formData.joiningDate)) {
            newErrors.leavingDate = 'Leaving date must be after joining date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                organizationId: parseInt(formData.organizationId)
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <div className="card-body">
                <h3 className="card-title mb-4">
                    {organization ? 'Update Organization' : 'Add Organization'}
                </h3>

                <div className="mb-3">
                    <label htmlFor="organizationId" className="form-label">Organization</label>
                    <select
                        className={`form-select ${errors.organizationId ? 'is-invalid' : ''}`}
                        id="organizationId"
                        value={formData.organizationId}
                        onChange={(e) => setFormData({...formData, organizationId: e.target.value})}
                    >
                        <option value="">Select Organization</option>
                        {organizations.map(org => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                    </select>
                    {errors.organizationId && <div className="invalid-feedback">{errors.organizationId}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <input
                        type="text"
                        className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                    />
                    {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`}
                            id="joiningDate"
                            value={formData.joiningDate}
                            onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                        />
                        {errors.joiningDate && <div className="invalid-feedback">{errors.joiningDate}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="leavingDate" className="form-label">Leaving Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.leavingDate ? 'is-invalid' : ''}`}
                            id="leavingDate"
                            value={formData.leavingDate}
                            onChange={(e) => setFormData({...formData, leavingDate: e.target.value})}
                        />
                        {errors.leavingDate && <div className="invalid-feedback">{errors.leavingDate}</div>}
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
                        {organization ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default OrganizationForm;