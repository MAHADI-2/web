import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import ProductCard from "../components/ProductCard";
import BannerSlider from "../components/BannerSlider";
import { Link } from "react-router-dom";

const shortcuts = [
    { label: "Electronics", to: "/#products" },
    { label: "Fashion", to: "/#products" },
    { label: "Flash Sale", to: "/#products" },
    { label: "Top Deals", to: "/#products" },
    { label: "Cart", to: "/cart" },
];

const Home = () => {













    return (
     <div>
    <Layout>

<Hero/>

<BannerSlider/>

<nav aria-label="Shop shortcuts" className="w-full border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
    <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3">
        {shortcuts.map((shortcut) => (
            <Link
                key={shortcut.label}
                to={shortcut.to}
                className="rounded-full border border-teal-200 px-5 py-2 text-sm font-semibold text-teal-700 transition hover:border-teal-600 hover:bg-teal-600 hover:text-white"
            >
                {shortcut.label}
            </Link>
        ))}
    </div>
</nav>


<ProductCard/>










                </Layout>
            
        </div>

    );
};

export default Home;