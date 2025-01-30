import { Link } from "react-router";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Productos from "./productos";
function Estructura_Productos() {
  return (
    <>
        <header>
            <NavBar/>
        </header>
        <main>
          <Productos />
        </main>
        <Footer />
    </>
  )
}
export default Estructura_Productos