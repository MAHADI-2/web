import ParticleView from "./animition";

const Hero = () => {
    return (
        <section className="relative w-full h-[clamp(360px,calc(100svh-80px),560px)] overflow-hidden">
           <img className="w-full h-full object-cover object-center" src="https://png.pngtree.com/background/20231017/original/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-picture-image_5591437.jpg" alt="Featured electronics and gadgets" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/35 to-transparent" />
            

<div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center text-white">


<ParticleView 
text="Welcome to Our Site" 
          particleCount={100} 
          particleColor="#3b82f6"

/>

<p className="mt-2 text-base sm:text-lg text-white font-bold">Discover amazing things here</p>
</div>


        </section>
    );
};

export default Hero;