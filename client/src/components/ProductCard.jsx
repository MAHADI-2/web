import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
import api from "../api/axios";


const ProductCard = () => {





const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchParams] = useSearchParams();
const selectedCategory = searchParams.get("category");

useEffect(() => {

const loadProduct=async()=>{

try {
    const {data}=await api.get("/products");
    if(data.status === "fail"){
      setError(data.error || "product not yet added");
    }else{
        setProducts(data.data || data);
    }
    
} catch (error) {
    setError(error.response?.data?.message ||"something went wrong");
}finally{
    setLoading(false);
}

}

loadProduct();


}, []);



    return (

        <>
      
<section id="products" className="scroll-mt-24 pt-6">

  <h1 className="text-lg font-bold text-shadow-2xs text-center">
    {selectedCategory ? selectedCategory.replaceAll("-", " ") : "OUR PRODUCTS"}
  </h1>

{loading && <p>Loading...</p>}
{error && <p>{error}</p>}
{!loading && !error && products.length===0 && <p>N</p>}



  <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 bg-gray-100 px-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:px-8">
    
{products
  .filter((product) => {
    if (!selectedCategory) return true;
    const categoryName = typeof product.categoryID === "object"
      ? product.categoryID.categoryName
      : product.categoryID;
    const normalizedCategory = String(categoryName || "").toLowerCase().replaceAll(" ", "-");
    if (["flash-sale", "top-deals"].includes(selectedCategory)) return product.discount;
    return normalizedCategory === selectedCategory;
  })
  .map((product) => {
          // price এর হিসাব প্রতিটি product এর জন্য এখানে করতে হবে
          const price = product.discount ? product.discountPrice : product.price;

          return (
            <div key={product._id} className="bg-white px-2 py-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer " >
                
            <Link to={`/product/${product._id}`} >
                
                <img className="w-full h-40  object-cover rounded-md mb-3" src={product.image} alt={product.title} />
                <h3 className="text-sm text-center font-semibold mb-2">{product.title}</h3>
                
{product.discount ? (
  <>
    <div className="flex items-center gap-2 ml-2"> 
        <p className="text-sm">৳{price}</p>
    <p className="text-sm line-through">৳{product.price}</p>

    </div>



  </>
  ) : (
    <p className="text-sm ml-3">৳{price}</p>
  )}


{product.stock === 0 && <p className="text-red-500">Out of stock</p>}
            </Link>


            </div>
          );
        })}
              
 

   
  </div>
</section>


      </>  
        
    );
};

export default ProductCard;