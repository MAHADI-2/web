import {useState} from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout/Layout.jsx";

const Checkout = () => {


    const [loading, setLoding] = useState(false);
    const [error, setError] = useState("");

    
const handlePlaceOrder=async()=>{
setError("")
setLoding(true)
try {
    const {data}=await api.post("/createInvoice")
  if(data.status==="success"){
      window.location.href=data.data
  }else{
       setError(data.message || "Could not start payment");
  }


} catch (error) {
 setError(error.message || "Could not start payment");
}finally{
    setLoding(false)
}


}


    return (
        <Layout>
            <div className="max-w-lg mx-auto px-4 p-16 text-center ">

        <h1 className="text-2xl text-shadow-2xs font-bold mb-5">Check Out</h1>

        <p className="text-gray-600 mb-2 mt-5">
          Make sure your <Link to="/profile" className="text-teal-600 underline">profile</Link> has
          your billing and shipping address saved before continuing...
        </p>

         <p className="text-gray-500 text-sm mb-8">
          You'll be redirected to SSLCommerz to complete payment.
        </p>
 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

       <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-teal-600 text-white px-8 py-3 rounded-md text-sm hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Pay Now"}
        </button>
            </div>
          
        </Layout>
    );
};

export default Checkout;