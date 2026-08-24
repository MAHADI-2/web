import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from 'react';
import Layout from "../components/Layout/Layout.jsx";

const Register = () => {
  const { sentOtp, register } = useAuth();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const res = await sentOtp(name, email, password);
      if (res.status === "fail") {
        setError(res.message);
        return;
      }
      if (res.status === "success") {
        setInfo("OTP sent to your email. Check your inbox");
        setStep(2);
      }
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(email, otp);
      if (res.status === "fail") {
        setError(res.message);
        return;
      }
      if (res.status === "success") {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <Layout>
      {step === 1 && (
        <form onSubmit={sendOtpHandler} className="max-w-sm space-y-4 mx-auto py-6 px-4 rounded-sm mt-5 mb-5 shadow-lg bg-white">
          {error && <p className="error text-red-500 text-sm">{error}</p>}

          <div>
            <label className="text-sm">Name</label>
            <input 
            minLength={3}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input 
            minLength={8}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button className="text-md bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-sm mt-2 w-full" type="submit">
            Send OTP
          </button>
          
          <p className="mt-2 text-sm text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyOtpHandler} className="max-w-sm space-y-4 mx-auto py-6 px-4 rounded-sm mt-5 mb-5 shadow-lg bg-white">
          {error && <p className="error text-red-400 text-sm">{error}</p>}
          {info && <p className="info text-green-600 text-sm">{info}</p>}

          <div>
            <label className="text-sm font-bold">OTP</label>
            <input 
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button type="submit" className="text-md bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded-sm mt-2 w-full">
            Verify &amp; Create Account
          </button>

          <button
            className="text-md bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-sm mt-2 w-full"
            type="button"
            onClick={() => setStep(1)}
          >
            Go Back
          </button>
        </form>
      )}
    </Layout>
  );
};

export default Register;