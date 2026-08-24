import Layout from "../components/Layout/Layout";
import { useState,useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const CategoryEdit = () => {

const [Form, setForm]=useState({categoryName:"",categoryImage:""});
const [error, setError]=useState(null);


const { id } = useParams();
const isNew=!id || id === "new";


const load=async()=>{
       if(!isNew){
        try {
            const {data}=await api.get("/getCategory")
            const list=data.data || data;
            const found=list.find((c) => c._id === id);
            if(found) setForm({ categoryName: found.categoryName, categoryImage: found.categoryImage || "" });
       }
        catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
       }
    }

    useEffect(() => {
        load();
      }, [id, isNew]);



      const handleSubmit=async (e)=>{

if(isNew){
    try {
        await api.post("/createCategory",Form)
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    }
}else{
    try {
        await api.put(`/updateCategory/${id}`,Form)
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    }
}

      }



    return (
        <Layout>
            <div className="max-w-3xl mx-auto  py-16 ">

        <div >


<h1 className="text-2xl font-bold mb-4 text-green-500 text-shadow-2xs mt-4 ">{isNew ? "Create Category" : "Edit Category"}</h1>

{error && <p>{error}</p>}

<div>

<form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow space-y-6">


<div >
    
<label className=" text-gray-600 text-md font-bold block mb-2 "> Category Name</label>
<input type="text" name="categoryName" 

value={Form.categoryName}

 onChange={(e) => setForm({ ...Form, categoryName: e.target.value })}
 
   className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
</div>



<div>
    
<label className=" text-gray-600 text-md font-bold block mb-2"> Category Image</label>
<input type="text" name="categoryImage" 

value={Form.categoryImage}

 onChange={(e) => setForm({ ...Form, categoryImage: e.target.value })} 
   className="bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
</div>


<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{isNew ? "Create" : "Update"}</button>




</form>


</div>

        </div>

            </div>
            
        </Layout>
    );
};

export default CategoryEdit;