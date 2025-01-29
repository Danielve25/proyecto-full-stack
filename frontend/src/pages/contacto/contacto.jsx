import { useState } from "react";
import { Link } from "react-router";

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
    });

    const [errors, setErrors] = useState({
        nombre: false,
        email: false,
        asunto: false,
        mensaje: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            nombre: formData.nombre.trim() === "",
            email: !emailRegex.test(formData.email),
            asunto: formData.asunto.trim() === "",
            mensaje: formData.mensaje.trim() === "",
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Mensaje enviado correctamente!");
            setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
        }
    };

    return (
        <>
            <div className="espaciado"></div>
            <div className="container">
                <div className="contact-header">
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

                <div className="contact-form">
                    <h3>Envíanos un mensaje</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.nombre && (
                                <span className="error">El nombre es requerido</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && (
                                <span className="error">Email inválido</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Asunto</label>
                            <input
                                type="text"
                                id="asunto"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.asunto && (
                                <span className="error">El asunto es requerido</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                rows="4"
                                value={formData.mensaje}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            {errors.mensaje && (
                                <span className="error">El mensaje es requerido</span>
                            )}
                        </div>

                        <button type="submit">Enviar mensaje</button>
                    </form>
                </div>

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

export default Contacto;
