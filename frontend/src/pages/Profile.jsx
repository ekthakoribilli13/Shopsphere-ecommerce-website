import { useEffect, useState } from "react";

function Profile({ onBack, onLogout }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login to view your profile.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/auth/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load profile"
                    );
                }

                setUser(data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Unable to load profile</h2>

                    <p className="profile-error">
                        {error}
                    </p>

                    <button
                        className="profile-back-button"
                        onClick={onBack}
                    >
                        ← Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                <button
                    className="profile-back-button"
                    onClick={onBack}
                >
                    ← Back to Shop
                </button>

                <div className="profile-card">

                    <div className="profile-avatar">
                        {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div className="profile-header">
                        <p className="profile-tag">
                            MY ACCOUNT
                        </p>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Manage your ShopSphere account.
                        </p>
                    </div>

                    <div className="profile-details">

                        <div className="profile-detail">
                            <span className="profile-detail-label">
                                👤 Name
                            </span>

                            <strong>
                                {user.name}
                            </strong>
                        </div>

                        <div className="profile-detail">
                            <span className="profile-detail-label">
                                📧 Email
                            </span>

                            <strong>
                                {user.email}
                            </strong>
                        </div>

                        <div className="profile-detail">
                            <span className="profile-detail-label">
                                📅 Member Since
                            </span>

                            <strong>
                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    }
                                )}
                            </strong>
                        </div>

                        <div className="profile-detail">
                            <span className="profile-detail-label">
                                🔐 Account Status
                            </span>

                            <strong className="account-active">
                                Active
                            </strong>
                        </div>

                    </div>

                    <div className="profile-actions">

                        <button
                            className="profile-orders-button"
                            onClick={() =>
                                alert(
                                    "My Orders will be available soon! 📦"
                                )
                            }
                        >
                            📦 My Orders
                        </button>

                        <button
                            className="profile-logout-button"
                            onClick={onLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;