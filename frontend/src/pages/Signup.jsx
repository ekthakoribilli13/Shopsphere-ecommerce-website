import { useState } from "react";

function Signup({ onSignup, onGoToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Signup failed"
                );
            }

            setSuccess(
                "Account created successfully! 🎉"
            );

            setTimeout(() => {
                onSignup();
            }, 1000);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <h1>Create Account ✨</h1>

                    <p>
                        Join ShopSphere and start shopping.
                    </p>

                </div>


                {error && (

                    <div className="auth-error">
                        {error}
                    </div>

                )}


                {success && (

                    <div className="auth-success">
                        {success}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            minLength="6"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                </form>


                <div className="auth-switch">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        onClick={onGoToLogin}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Signup;

