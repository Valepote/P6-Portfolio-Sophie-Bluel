//recuperation des works
const allworks=async()=>{
return new Promise((resolve,reject)=>{
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(response=>resolve(response))
    .catch(error=>reject(error))

})

}

//recuperation des categories
const allcats=async()=>{
    return new Promise((resolve,reject)=>{
        fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(response=>resolve(response))
        .catch(error=>reject(error))
    
    })
    
    
    }

// recuperation du login
const login=async(email,password)=>{
    return new Promise((resolve,reject)=>{    
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(response=>resolve(response))
        .catch(error=>reject(error))
      
    })
}

// verif du login (deco)
const verifLog=()=>{
    if(localStorage.getItem("token")){
        return true 
    }
    else{
        return false
    }
    
}

// suppression work

const deletework= async (idwork)=>{
    return new Promise((resolve,reject)=>{ 
        fetch(`http://localhost:5678/api/works/${idwork}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }) 

        .then(response=>resolve(response))
        .catch(error=>reject(error))
    })


}
// ajout work(photoetc...)
const creatework= async (formData)=>{
    return new Promise((resolve,reject)=>{ 
        fetch(`http://localhost:5678/api/works`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body:formData
        }) 
        .then(response => response.json())
        .then(response=>resolve(response))
        .catch(error=>reject(error))
    })

    
}