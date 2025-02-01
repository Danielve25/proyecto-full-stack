import React from "react";
import {useForm, ValidationError} from "@formspree/react";
import {Link} from "react-router";
function ContactForm() {
    const [state, handleSubmit, reset] = useForm(import.meta.env.VITE_FORM_ID);
    if (state.succeeded) {
        return (
            <>
                <div className="espaciado"></div>
                <div className="Confirm-mensaje">
                    <h1>gracias por elegirnos</h1>
                    <button onClick={reset}>Enviar otro formulario</button>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="espaciado"></div>
            <div className="container">
                <div div className="contact-header">
                    <h1>Contacto</h1>
                    <p>¿Tienes preguntas? Y Quieres adquirir un producto ¡Estamos aquí para ayudarte!</p>
                </div>
                <div className="contact-info">
                    <h3>Información de Contacto</h3>
                    <p>📍 Dirección: carrera 60 #26-38</p>
                    <p>📞 Teléfono: 3195252639</p>
                    <p>✉️ Email: dulzura.vallecaucana@gmail.com</p>
                    <p>⏰ Horario: Lunes a Domingo de 8:00 AM a 6:00 PM</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/*correo electronico */}
                    <label htmlFor="email">Correo Electronico</label>
                    <input id="email" type="email" name="email" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                    {/*Asunto del correo */}
                    <label htmlFor="asunto">Asunto</label>
                    <textarea name="asunto" id="asunto" />
                    <ValidationError prefix="asunto" field="asunto" />

                    {/*mensaje del formulario */}
                    <label htmlFor="message">Mensaje</label>
                    <textarea id="message" name="message" />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                    <button type="submit" disabled={state.submitting}>
                        Enviar
                    </button>
                </form>
                <div className="social-links">
                    <Link to="http://wa.link/ztvomc" className="whatsapp" title="whatsapp">
                        <i className="fa-brands fa-whatsapp"></i>
                    </Link>
                    <Link to="#" className="facebook" title="facebook">
                        <i className="fa-brands fa-facebook"></i>
                    </Link>
                    <Link to="#" className="twitter" title="twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                    <Link to="#" className="instagram" title="instagram">
                        <i className="fa-brands fa-square-instagram"></i>
                    </Link>
                </div>
            </div>
        </>
    );
}

function Contacto() {
    return <ContactForm />;
}

export default Contacto;
