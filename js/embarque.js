const form =document.querySelector('#embarque');
const contenido=document.querySelector('.info-pasajero');


let config={
    headers: new Headers({
        "Content-Type":"application/json"
    }),
}




const buscarUser=async (data)=>{
    config.method="GET";
    data = await((await fetch(`http://localhost:3001/ticketes?id_like=${data.documento}`,config)).json());
    contenido.innerHTML=
    `
    <div class="servicio">
        <h3>${data[0].nombre}</h3>
        <div class="datos">
            <p><span class="info">Cedula: </span>${data[0].documento}</p>
            <p><span class="info">Apellidos: </span>${data[0].apellido}</p>
            <p><span class="info">Correo: </span>${data[0].correo}</p>
            <p><span class="info">Ciudad origen:</span> ${data[0].ciudado}</p>
            <p><span class="info">Ciudad destino:</span> ${data[0].ciudadd}</p>
        </div>
        </div>
    `;
 
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    buscarUser(data);
    
}
);