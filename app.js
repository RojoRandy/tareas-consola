require('colors');
const {
        menu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirm,
        listadoTareasCheckList
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
                break;
            case '2':
                //Muestra listado de tareas
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr)
                break;
            case '3':
                tareas.listadoTareas(true);
                break;
            case '4':
                tareas.listadoTareas(false);
                break;
            case '5':
                const ids = await listadoTareasCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if(id!=='0'){
                    const confirmDelete = await confirm('¿Está seguro de borrar la tarea?');
                    if(confirmDelete){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;
        }

        saveFile(tareas.listadoArr);
        if(opt!=='0') await pausa();
    }while(opt!=='0')
}

main();