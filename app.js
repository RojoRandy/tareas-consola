require('colors');
const {
        menu, 
        pausa,
        leerInput
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const {saveFile, readFile} = require('./helpers/filesystem');

const main = async()=>{
    let opt='';
    const tareas = new Tareas();
    
    const tareasDB = readFile();

    console.log(tareasDB)
    if(tareasDB){
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do{
        opt = await menu();

        switch(opt){
            case '1':
                //crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crear(desc);
                saveFile(tareas.listadoArr)
                break;
            case '2':
                //Muestra listado de tareas
                console.log(tareas.listadoArr)
                break;
        }


        if(opt!=='0') await pausa();
    }while(opt!=='0')
}

main();