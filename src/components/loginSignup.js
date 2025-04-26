import { useState } from "react";
import "../styles/loginSignup.css";
import { SIGNIN_URL, SIGNUP_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    vehicle_no: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let newErrors = {};
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (isSignUp && !formData.vehicle_no.trim()) {
      newErrors.vehicle_no = "Vehicle number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const apiUrl = isSignUp ? SIGNUP_URL : SIGNIN_URL;
    const payload = isSignUp
      ? {
          username: formData.name,
          email: formData.email,
          number: formData.number,
          password: formData.password,
          vehicle_no: formData.vehicle_no,
        }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(apiUrl, {
        method: isSignUp ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      const text = await response.text(); // get raw text first

      try {
        data = JSON.parse(text); // try parsing
      } catch (err) {
        console.warn("Response is not valid JSON:", text);
      }

      if (data?.token) {
        Cookies.set("token", data.token);
        navigate("/map");
      }

      if (response.ok) {
        setMessage(isSignUp ? "Sign-up successful!" : "Sign-in successful!");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className='main-container d-flex-full'>
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
        <div className='form-container sign-up-container'>
          <form onSubmit={handleSubmit}>
            <h2>Sign in to create account</h2>

            <input
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <small className='error'>{errors.name}</small>}
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.number && <small className='error'>{errors.number}</small>}
            <input
              type='text'
              placeholder='Mobile'
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
            />
            {errors.vehicle_no && (
              <small className='error'>{errors.vehicle_no}</small>
            )}
            <input
              type='text'
              placeholder='Vehicle Number'
              value={formData.vehicle_no}
              onChange={(e) =>
                setFormData({ ...formData, vehicle_no: e.target.value })
              }
            />

            {errors.email && <small className='error'>{errors.email}</small>}
            <input
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <small className='error'>{errors.password}</small>
            )}
            <button type='submit'>Create Account</button>
            {message && <p className='message'>{message}</p>}
          </form>
        </div>

        <div className='form-container sign-in-container'>
          <form onSubmit={handleSubmit}>
            <h1>Welcome Back!</h1>
            <p>Log in to manage your fines, violations, and much more.</p>

            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <small className='error'>{errors.email}</small>}
            <input
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <small className='error'>{errors.password}</small>
            )}
            <button type='submit'>Sign In</button>
            {message && <p className='message'>{message}</p>}
          </form>
        </div>

        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please log in with your personal
                details.
              </p>
              <button className='ghost' onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us!</p>
              <button className='ghost' onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
