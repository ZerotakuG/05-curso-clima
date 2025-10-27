require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



console.clear();



const main = async () => {

    const busquedas = new Busquedas();
    let opcion = '';



    do {


      opcion = await inquirerMenu();
      switch (opcion) {
        case 1:
          //mostrar mensaje
          const termino = await leerInput('Ciudad: ');
          
          //buscar lugar
          const lugares = await busquedas.ciudad( termino );

          //seleccionar lugar
          const id = await listarLugares(lugares);
          if (id === '0') continue;

          const lugarSel = lugares.find(l => l.id == id );

         //guardar en DB
         busquedas.agregarHistorial( lugarSel.nombre);


          //clima
         
          const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
          //mostrar resultados

          console.clear();
          console.log('\n infromacion de la ciudad\n'.green);
          console.log('Ciudad: ', lugarSel.nombre.green);
          console.log('Latitud: ',lugarSel.lat);
          console.log('Longitud: ',lugarSel.lng);
          console.log('Temperatura: ',clima.temp);
          console.log('Minima: ',clima.min);
          console.log('Maxima: ',clima.max);
          console.log('como esta el clima: ',clima.desc.green)

        break;


        case 2:
          busquedas.historialCapitalizado.forEach((lugar, i) => {
            const idx = `${i + 1}.`.green;
            console.log(`${ idx } ${ lugar }`);
          })

  



      }



        if (opcion !== 0) await pausa();


    }while (opcion !== 0);
}

main();