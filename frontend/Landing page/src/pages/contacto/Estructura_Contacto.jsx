import "../../css/contacto.css";
import Footer from "../components/footer.jsx";
import NavBar from "../components/NavBar";
import Contacto from "./contacto";
function Estructura_Contacto() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <Contacto />
            </main>
            <Footer />
        </>
    );
}
export default Estructura_Contacto;
