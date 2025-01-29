import Inicio from "./inicio";
import Footer from "../components/footer";
import NavBar from "../components/NavBar";
import Hero from "./hero";
import "../../css/css.css"
function Estructura_Inicio() {
    return (
        <>
            <header>
                <NavBar/>
                <Hero/>
            </header>
            <Inicio />
            <Footer />
        </>
    );
}

export default Estructura_Inicio;
