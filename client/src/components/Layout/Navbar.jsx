import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass =
    "text-white font-bold text-lg border-b-2 border-transparent hover:text-purple-600 hover:border-purple-600 transition-all duration-300";
  const mobileLinkClass =
    "block w-full text-white font-bold text-lg py-2 px-2 rounded-md hover:bg-teal-600 transition-all duration-300";

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-teal-500/90 py-4 px-6 md:px-8 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo brand div */}
        <div className="flex items-center gap-3">
          <img className="w-12 h-12" src="/assert/fca5660e08f83995574974aed9bacaa2.png" alt="logo" />
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">Fasion</h1>
          </Link>
        </div>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex gap-4 items-center">
            <li className={linkClass}><Link to="/">Home</Link></li>
            <li className={linkClass}><Link to="/about">About</Link></li>
            <li className={linkClass}><Link to="/contact">Contact</Link></li>
            <li className={linkClass}><Link to="/wishlist">Wishlist</Link></li>
            <li className={linkClass}><Link to="/cart">Cart</Link></li>

            {userInfo ? (
              <>
                <li className={linkClass}><Link to="/orders">Order</Link></li>
                <li className={linkClass}><Link to="/profile">{userInfo.name}</Link></li>
                {userInfo.role === "admin" && (
                  <li className={linkClass}><Link to="/admin">Admin</Link></li>
                )}
                <li className={linkClass}>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className={linkClass}><Link to="/login">Login</Link></li>
                <li className={linkClass}><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* hamburger button - mobile only */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-2">
          <ul className="flex flex-col gap-1 bg-teal-600/95 rounded-lg p-3 shadow-lg">
            <li><Link to="/" className={mobileLinkClass} onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" className={mobileLinkClass} onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" className={mobileLinkClass} onClick={closeMenu}>Contact</Link></li>
            <li><Link to="/wishlist" className={mobileLinkClass} onClick={closeMenu}>Wishlist</Link></li>
            <li><Link to="/cart" className={mobileLinkClass} onClick={closeMenu}>Cart</Link></li>

            {userInfo ? (
              <>
                <li><Link to="/orders" className={mobileLinkClass} onClick={closeMenu}>Order</Link></li>
                <li><Link to="/profile" className={mobileLinkClass} onClick={closeMenu}>{userInfo.name}</Link></li>
                {userInfo.role === "admin" && (
                  <li><Link to="/admin" className={mobileLinkClass} onClick={closeMenu}>Admin</Link></li>
                )}
                <li>
                  <button
                    onClick={() => { logout(); closeMenu(); }}
                    className={mobileLinkClass + " text-left"}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className={mobileLinkClass} onClick={closeMenu}>Login</Link></li>
                <li><Link to="/register" className={mobileLinkClass} onClick={closeMenu}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;