import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import Registrar from './registrar'
function Estructura_Registro() {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <div className='espaciado'></div>
    <main>
        <Registrar/>
    </main>
    <Footer/>
    </>
  )
}
export default Estructura_Registro