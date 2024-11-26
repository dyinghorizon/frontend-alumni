import React from 'react';
import Navbar from '../components/layout/Navbar';
import ProfileInfo from '../components/profile/ProfileInfo';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
    const { profile, loading, error, updateContact } = useProfile();

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

    if (error) {
        return (
            <>
                <Navbar />
                <div className="container mt-4">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <ProfileInfo 
                    profile={profile}
                    onUpdateContact={updateContact}
                />
            </div>
        </>
    );
};

export default ProfilePage;