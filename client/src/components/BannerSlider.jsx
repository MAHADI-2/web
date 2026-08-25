import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BannerSlider = () => {
  return (
    <section className="w-full overflow-hidden bg-slate-900 shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[240px] sm:h-[320px] md:h-[440px]"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative">
          <img 
            src="https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
            alt="Banner 1" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 md:p-12 text-white">
            <span className="text-yellow-400 font-semibold text-sm md:text-lg mb-2">মেগা ডিসকাউন্ট!</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">লেটেস্ট টেকনোলজি ও ল্যাপটপ</h2>
            <p className="text-gray-200 text-xs md:text-sm max-w-md mb-4">আপনার পছন্দের গ্যাজেটটি কিনুন আকর্ষণীয় মূল্যে, সাথে রয়েছে দারুণ অফার।</p>
            <Link to="/#products" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-medium w-max transition">
              শপিং করুন
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative">
          <img 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
            alt="Banner 2" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 md:p-12 text-white">
            <span className="text-yellow-400 font-semibold text-sm md:text-lg mb-2">বিশেষ অফার</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">সেরা কালেকশন এখন আপনার হাতে</h2>
            <p className="text-gray-200 text-xs md:text-sm max-w-md mb-4">স্টাইলিশ ও প্রিমিয়াম প্রোডাক্টের বিশাল সমাহার।</p>
            <Link to="/#products" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-medium w-max transition">
              এখনই দেখুন
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative">
          <img 
            src="https://trekntread.com/tenancy/assets/1209/photo_2024-10-26_13-41-57-(5).jpg" 
            alt="Banner 3" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 md:p-12 text-white">
            <span className="text-yellow-400 font-semibold text-sm md:text-lg mb-2">ফ্ল্যাশ সেল</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">শীতকালীন ও ট্রেন্ডি ফ্যাশন</h2>
            <p className="text-gray-200 text-xs md:text-sm max-w-md mb-4">সেরা ব্র্যান্ডের পোশাক কিনুন ডিসকাউন্ট মূল্যে।</p>
            <Link to="/#products" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-medium w-max transition">
              অর্ডার করুন
            </Link>
          </div>
        </SwiperSlide>

      </Swiper>
    </section>
  );
};

export default BannerSlider;