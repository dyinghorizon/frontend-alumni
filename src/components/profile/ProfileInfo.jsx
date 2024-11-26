import React, { useState } from 'react';
import ContactForm from './ContactForm';

const ProfileInfo = ({ profile, onUpdateContact }) => {
    const [showContactForm, setShowContactForm] = useState(false);

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Profile Information</h3>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <p><strong>Student ID:</strong> {profile.studentId}</p>
                        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Contact Number:</strong> {profile.contactNumber}</p>
                        <p><strong>Graduation Year:</strong> {profile.graduationYear}</p>
                    </div>
                </div>
                
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => setShowContactForm(!showContactForm)}
                >
                    {showContactForm ? 'Cancel Update' : 'Update Contact Info'}
                </button>

                {showContactForm && (
                    <div className="mt-4">
                        <ContactForm 
                            initialData={{
                                email: profile.email,
                                contactNumber: profile.contactNumber
                            }}
                            onSubmit={(data) => {
                                onUpdateContact(data);
                                setShowContactForm(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;