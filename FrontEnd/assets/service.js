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