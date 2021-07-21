//  Recursos Git:
//  https://gist.github.com/juanpablogdl/7bd291e6eac6661ec0ef372ab40dcdd6
import React, {useState} from 'react';
import Error from '../Error/error';
import PropTypes from 'prop-types';



const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
   
    //  State de los errores del formulario cuando está vacío
    const [error, guardarError] = useState(false);
    

    //  Extraer o desestructurar ciudad y país
    const {ciudad, pais} = busqueda;

    //  Función que ubica los elementos en el State
    const handleChange = e => {
        // Actualizar el State
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //  Al enviar los datos con Submit
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if(ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Pasarlo al componente ppal
        guardarConsultar(true);
                
    }
     

    return ( 
        <form action="" onSubmit={handleSubmit}>

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad:</label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País:</label>
            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                />
                {/* </input> */}
            </div>
        </form>
     );
}
Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsultar : PropTypes.func.isRequired,
}
export default Formulario;