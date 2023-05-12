const form= document.querySelector('#registropersonal');
const form2=document.querySelector('#eliminarpersonal');

let config={
    headers: new Headers({
        "Content-Type":"application/json"
    }),
}

const postUser=async (data)=>{
    config.method="POST";
    data.id=data.documento;
    config.body=JSON.stringify(data);
    (await fetch("http://localhost:3001/personal",config));
}

const deleteUser= async (data)=>{
    const {documento}=data;
    data.id=documento;
    config.method="DELETE";
    delete config.body;
    (await fetch(`http://localhost:3001/personal/${documento}`,config));
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    postUser(data);
    alert("Personal Agregado");
})

form2.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    deleteUser(data);
    alert("Personal eliminado");
})

