import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useAuth();
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setLocalError(null);

    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      // Store the error locally to prevent it from disappearing
      setLocalError(err.message || "Login failed. Please try again.");

      // Clear password field on error
      setPassword("");
    }
  };

  const displayError = localError;

  const handleInputChange = (e, setter) => {
    // Only clear error when user starts typing
    if (displayError) {
      setLocalError(null);
    }
    setter(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              {displayError && (
                <div className="alert alert-danger" role="alert">
                  {displayError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => handleInputChange(e, setPassword)}
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;