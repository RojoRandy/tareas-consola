const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado={};
    }

    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea;
        })
    }

    crear(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, index)=>{
            const i=`${index+1}`.green;
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${i}. ${tarea.desc} :: ${estado}`);
        })
    }

    listadoTareas(completadas=true){
        console.log();
        let contador=0
        this.listadoArr.forEach(tarea=>{
            contador+=1;
            const estado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;

            if(completadas && tarea.completadoEn){
                console.log(`${(contador+'.').green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
            }
            else if(!completadas && !tarea.completadoEn){
                console.log(`${(contador+'.').green} ${tarea.desc} :: ${estado}`);
            }
        })
    }

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids=[]){

        ids.forEach(id=>{
            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                const task = this._listado[tarea.id];
                task.completadoEn = null;
            }
        })


    }
}

module.exports = Tareas;