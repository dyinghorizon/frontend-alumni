import React, { useState } from 'react';

const ContactForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\+?[1-9][0-9]{9,14}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Invalid contact number format';
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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                    type="text"
                    className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                />
                {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
                Update
            </button>
        </form>
    );
};

export default ContactForm;