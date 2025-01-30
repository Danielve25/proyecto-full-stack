import {Link} from "react-router";
import React, {useState, useEffect} from "react";

function NavBar() {
    const [navActive, setNavActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setNavActive(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function toggleMenu() {
        setMenuActive(!menuActive);
    }

    return (
        <nav className={`nav ${navActive ? "active" : ""}`}>
            <div className="logo">
                <Link className="logo-btn" to="/">
                    <button></button>
                </Link>
            </div>
            <ul className={`menu ${menuActive ? "active" : ""}`}>
                <li className="btn-movil">
                    <Link className="a" to="/">
                        Inicio
                    </Link>
                    <Link className="a" to="/contacto">
                        Contacto
                    </Link>
                    <Link className="a" to="/productos">
                        Productos
                    </Link>
                    {/*<Link className="a" to="/registro">Registrar</Link>*/}
                </li>
            </ul>
            <div className="menu-btn" onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </div>
        </nav>
    );
}

export default NavBar;
