import { PiFacebookLogoFill } from "react-icons/pi";
import { FaLinkedinIn } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";

const Footer = () => {
    return (
        <div className="bg-black py-3 px-8 backdrop-blur-sm shadow-lg">
            <div className="border-b border-gray-800 py-12 px-6 sm:px-12 lg:px-24">
                
                {/* Main Flex Container: md:flex-row দিয়ে ৩টা কলাম পাশাপাশি করা হয়েছে */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-18 md:gap-16 px-4">
                    


            <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white">About <span className="text-blue-600">Us</span></h1>
                            <ul className="text-gray-400 space-y-2 text-sm">
                                <li>Our Story & Mission</li>
                                <li>Terms & Conditions</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>



                    {/* ১. বাম পাশের অংশ (Newsletter & About Us) */}
                    <div className="space-y-6 flex-1">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                Join Our Newsletter
                            </h3>
                            <p className="text-sm text-gray-400">
                                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                            </p>
                        </div>

                        
                       
                    </div>

                    {/* ২. মাঝখানের অংশ (Categories) */}
                    <div className="space-y-3 flex-1">
                        <h1 className="text-xl font-bold text-white">Categories</h1>
                        <ul className="text-gray-400 space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer">Electronics</li>
                            <li className="hover:text-white cursor-pointer">Fashion</li>
                            <li className="hover:text-white cursor-pointer">Groceries</li>
                            <li className="hover:text-white cursor-pointer">Home Appliances</li>
                        </ul>
                    </div>

                    {/* ৩. ডান পাশের অংশ (Contact Us & Social Icons) */}
<ul className="space-y-3">
    <li className="text-white flex items-center gap-2">
        <span className="w-20">Facebook</span> <PiFacebookLogoFill className="text-blue-600" size={30} />
    </li>
    <li className="text-white flex items-center gap-2">
        <span className="w-20">LinkedIn</span> <FaLinkedinIn className="text-blue-600" size={30} />
    </li>
    <li className="text-white flex items-center gap-2">
        <span className="w-20">Email</span> <MdMarkEmailUnread className="text-blue-600" size={30} />
    </li>
</ul>

            

                </div>


                 <div className="flex items-center pt-10">
             <p className="text-sm text-gray-400">{new Date().getFullYear()} &copy; All Rights Reserved</p>
            </div>
            </div>
        </div>
    );
};

export default Footer;