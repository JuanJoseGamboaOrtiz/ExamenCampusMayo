//Elementos
const form = document.querySelector('#registroflota');

let config={
    headers: new Headers({
        "Content-Type":"application/json"
    }),
}

const postUser=async (data)=>{
    config.method="POST";
    config.body=JSON.stringify(data);
    (await fetch("http://localhost:3001/flotaAerea",config));
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
     postUser(data);
     alert("Flota Agregada");
 })

 