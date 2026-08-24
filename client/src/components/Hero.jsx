import ParticleView from "./animition";

const Hero = () => {
    return (
        <div className="relative w-full h-[400px]">
           <img className="w-full h-full object-cover" src="https://png.pngtree.com/background/20231017/original/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-picture-image_5591437.jpg" alt="hero" />
            

<div className="absolute inset-0 flex flex-col justify-center items-center text-white mb-10">


<ParticleView 
text="Welcome to Our Site" 
          particleCount={100} 
          particleColor="#3b82f6"

/>

<p className="text-1xl mt-2 text-white font-bold">Discover amazing things here</p>
</div>


        </div>
    );
};

export default Hero;