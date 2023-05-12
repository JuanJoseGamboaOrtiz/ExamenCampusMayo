//Elementos
const form=document.querySelectorAll('.formulario');
const borrar=document.querySelector('.borrar');
const borrar2=document.querySelector('.borrar2');
const relleno= document.querySelector('.clientes');
const relleno2= document.querySelector('.cliente');

let config={
    headers: new Headers({
        "Content-Type":"application/json"
    }),
}

const postUser=async (data)=>{
    config.method="POST";
    config.body=JSON.stringify(data);
    (await fetch("http://localhost:3001/clientes",config));
    alert("Usuario Agregado");
}

const putUser= async (data)=>{
    const {documento}=data;
    data.id=documento;
    config.method="PUT";
    config.body=JSON.stringify(data);
    (await fetch(`http://localhost:3001/clientes/${documento}`,config));
    alert("Usuario Actualizado");
}

const deleteUser= async (data)=>{
    const {documento}=data;
    data.id=documento;
    config.method="DELETE";
    delete config.body;
    (await fetch(`http://localhost:3001/clientes/${documento}`,config));
    alert("Usuario Eliminado")
}

const getUsers= async()=>{
    config.method="GET";
    delete config.body;
    let data = await ((await fetch("http://localhost:3001/clientes",config)).json());
    data.forEach(cliente=>{
        relleno.innerHTML+=`
        <div class="row">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="../img/usuario.webp">
                        <span class="card-title indigo lighten-3">${cliente.nombre}</span>
                    </div>
                    <div class="card-content">
                        <p>Identificado con el número de cedula ${cliente.documento} y fecha de nacimiento ${cliente.fecha},número de telefono ${cliente.telefono} y correo ${cliente.correo}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
}

const buscarUser=async (data)=>{
    config.method="GET";
    data = await((await fetch(`http://localhost:3001/clientes?nombre_like=${data.nombre}&apellido_like=${data.apellido}&id_like=${data.documento}`,config)).json());
    relleno2.innerHTML+=`
        <div class="row">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-image">
                        <img src="../img/usuario.webp">
                        <span class="card-title indigo lighten-3">${data[0].nombre}</span>
                    </div>
                    <div class="card-content">
                        <p>Identificado con el número de cedula ${data[0].documento} y fecha de nacimiento ${data[0].fecha},número de telefono ${data[0].telefono} y correo ${data[0].correo}</p>
                    </div>
                </div>
            </div>
        </div>
        `
}

form.forEach(formulario=>{
    formulario.addEventListener('submit',(e) =>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        let opc=e.submitter.dataset.accion;

        switch (opc){
            case "POST":
                postUser(data);
                break
            case "PUT":
                putUser(data);
                break
            case "GET":
                getUsers();
                break
            case "DELETE":
                deleteUser(data);
                break
            case "SEARCH":
                buscarUser(data);
                break
        }

    })
})

borrar.addEventListener('click',e=>{
    e.preventDefault();
    relleno.innerHTML='';
});

borrar2.addEventListener('click',e=>{
    e.preventDefault();
    relleno2.innerHTML='';
});


