// seleccionar el formulario
const form= document.querySelector('#compra');
const apellido =document.querySelector('#apellido');
const nombre =document.querySelector('#nombre');
const correo =document.querySelector('#correo');
const select = document.querySelector('#ruta');
const infoPago=document.querySelector('.info-pago');

let config={
    headers: new Headers({
        "Content-Type":"application/json"
    }),
}

const postUser=async (data)=>{
    config.method="POST";
    config.body=JSON.stringify(data);
    (await fetch("http://localhost:3001/ticketes",config));
    alert("Vuelo Agregado");
}

const postUser2= async(data)=>{
    config.method="POST";
    config.body=JSON.stringify({
        "nombre":data.nombre,
        "apellido":data.apellido,
        "correo":data.correo,
        "documento":data.documento,
        "id":data.documento
    })
    data = await ((await fetch("http://localhost:3001/clientes",config)).json());
    
}

//LLENAR LOS VALORES DE LOS SELECTS DINAMICAMENTE
const getCiudado= async()=>{
    config.method="GET";
    let rutas = await((await fetch(`http://localhost:3001/rutasAereas`,config)).json());
    rutas.forEach(ruta=>{
        select.innerHTML+=`
        <option value="${ruta.ciudado}_${ruta.ciudadd}">${ruta.ciudado}-${ruta.ciudadd}</option>
        `;
    });
}

//DETERMINAR EL VALOR DE LA RUTA

const calcularPrecio= async(ruta)=>{
    config.method="GET";
    let ciudades=ruta.split("_");
    let rutaV = await((await fetch(`http://localhost:3001/rutasAereas?ciudado_like=${ciudades[0]}&ciudadd_like=${ciudades[1]}`,config)).json());
    valor= rutaV[0].millas*rutaV[0].valormilla;
    console.log(rutaV);
    valorIva=(valor*1.05)*(1.16);
    return valor
}

addEventListener('DOMContentLoaded',getCiudado());



//Saber si hay un usuario registrado con ese numero de cedula
const getUser=async (data)=>{
    config.method="GET";
    let usuario = await((await fetch(`http://localhost:3001/clientes?id_like=${data}`,config)).json());
    return usuario
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let opc=e.submitter.dataset.accion;

    switch(opc){
        case "COMPRA":
            compraTiquete(data);
            break
        case "REGISTRO":
            postUser2(data);
            break
    }
})


async function  compraTiquete(data){
    let usuario=await getUser(data.documento);
    
    if (usuario.length>0){
        nombre.value=usuario[0].nombre;
        apellido.value=usuario[0].apellido;
        correo.value=usuario[0].correo;
        let precio=await calcularPrecio(data.ruta);
        infoPago.innerHTML=`
        <div class="servicio">
        <h3>${nombre.value}</h3>
        <div class="fotos">
            <img src="../img/vendedor.jpg" alt="Trabajador">
        </div>
        <div class="datos">
            <p><span class="info">Cedula: </span>${usuario[0].documento}</p>
            <p><span class="info">Apellidos: </span>${usuario[0].apellido}</p>
            <p><span class="info">Correo: </span>${usuario[0].correo}</p>
            <p><span class="info">Monto a Pagar: </span> $${precio}</p>
            <p><span class="info">Ruta:</span> ${data.ruta}</p>
        </div>
        </div>
        `;

        let ciudades=data.ruta.split("_");
        vuelo={
            "nombre":usuario[0].nombre,
            "apellido":usuario[0].apellido,
            "documento":usuario[0].documento,
            "ciudado":ciudades[0],
            "ciudadd":ciudades[1],
            "id":parseInt(usuario.documento),
            "correo":usuario[0].correo
        }
        postUser(vuelo);
        dialog.showModal();
    }else{
        alert("Usuario no se encuetra registrado, ingrese su documento,nombre,apellido y correo y luego de en clcik en registrarse para poder hacer la compra");
    }

}