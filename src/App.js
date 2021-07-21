//  API key is f6d94761f8d49aec1ce88183aea49fe8
import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header/header';
import Formulario from './components/Formulario/formulario';
import Clima from './components/Clima/clima';
import Error from './components/Error/error';

function App() {

  // State del formulario en App.js (se usa el mismo State de formulario como componente)
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  // Otro useState es para controlar la cantidad de caracteres que se ven en Consola cada vez que se digita la ciudad
  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  /*===============================================*/
  /*===============FIN STATE´s=======================*/
  /*===============================================*/

  //  Extraer o desestructurar ciudad y país
  const {ciudad, pais} = busqueda;

  //  UseEffect detecta los cambios que detecta como dependencias
  useEffect (() => {
    const consultarAPI = async () => {

      if(consultar) {
        const appId = 'f6d94761f8d49aec1ce88183aea49fe8';
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    }
    consultarAPI();
    // eslint-disable-next-line 
  }, [consultar]);

  let componente;
  if(error) {
    componente = <Error mensaje="No se encuentra esa ciudad" />
  } else {
    componente = <Clima resultado={resultado} />
  }


  return (
    <Fragment>
      <Header titulo="Clima React App" />
      
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className="col m6 s12">
              {/* <Clima resultado={resultado} /> */}
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
