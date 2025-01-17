document.addEventListener("DOMContentLoaded",async()=>{
    //affichage categories
    const gallery=document.querySelector(".gallery")

    if(!verifLog()){
    
        const portfolio=document.querySelector("#portfolio")
        if(portfolio){
            const cats=await allcats()
            if(cats){
                const buttons=document.createElement("div")
                buttons.classList.add("flex")
                buttons.classList.add("justify-center")
                buttons.id="buttons"
                
                const buttonAll=document.createElement("button")
                buttonAll.classList.add("button")
                buttonAll.innerText="Tous"
              
                buttons.append(buttonAll)
                buttonAll.addEventListener("click", async ()=>{
                    await showGallery()
                })
    
                for (const cat of cats){
                const button=document.createElement("button")
                button.classList.add("button")
                button.innerText= cat.name
           
                buttons.append(button)
                button.addEventListener("click", async ()=>{
                    await showGallery(cat.name)
                })
                }
                
                const existingsbuttons=document.querySelector("#buttons")
                if(existingsbuttons){
                    portfolio.removeChild(existingsbuttons)
                }
                portfolio.insertBefore(buttons, gallery)
                
                const elements = document.querySelectorAll(`#portfolio button`)
                if(elements){
                    for(const element of elements){
                        element.classList.add("button")
                    }
                }
            
            }
    
        }
        
    }
    
    //affichage gallery
    const showGallery=async (catname)=>{
    
    if(gallery){
        let works=await allworks()
        if(works){
            if(catname&&catname!=="Tous"){
                works=works.filter(work=>work.category.name===catname)
            }
            let html=""
            for (const work of works){
                html+=`
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>
                `
            }
            gallery.innerHTML=html
        }
        
}
    
    }
    await showGallery()

    //login
    const loginForm = document.querySelector("#login-form")
    const loginEmail = document.querySelector("#email")
    const loginPassword = document.querySelector("#password")

    if (loginForm){
        if(verifLog()){
            window.location.href="./index.html"
        }
        else{
        loginForm.addEventListener("submit",async (event)=>{
            event.preventDefault()
            const response = await login(loginEmail.value,loginPassword.value)
            if(response.token){
                localStorage.setItem("token",response.token)
                window.location.href="./index.html"
            }
            else{
                alert("identifiant incorrect")
            }
            
        })}
    }
    // bouton menu log
    const loginLink=document.querySelector("#login-link")
    const logoutLink=document.querySelector("#logout-link")
    const editionMode=document.querySelector(".edition")

    if(loginLink && logoutLink && editionMode){
            
        if (verifLog()){
            loginLink.style.display="none"
        }
        else{
            logoutLink.style.display="none"
            editionMode.style.display="none"
            
        }
    }

    // bouton logout
    if (logoutLink){
        logoutLink.addEventListener("click",()=>{
            localStorage.removeItem("token")
            window.location.href="./index.html"
        })
    }
   
    // bouton modifier
    const modif=document.querySelector("#buttonmodify")
    if (modif) {
        if (!verifLog()){
            modif.style.display="none"
        }
    }

    // modal 1ere
    const modalone=document.querySelector("#modalone")

    if(modif && modalone){
        
        modif.addEventListener("click", ()=>{
            modalone.style.display="flex"
        }) 
    }
    
    const closemodalone=document.querySelector("#close-modalone")

    if(modif && closemodalone){
   
        closemodalone.addEventListener("click", ()=>{
            modalone.style.display="none"
        }) 
    }

    // modal 2ème

    const addphoto=document.querySelector("#creatework")
    const modaltwo=document.querySelector("#modaltwo")
    
    if(addphoto && modaltwo && modalone){
        
        addphoto.addEventListener("click", ()=>{
            modaltwo.style.display="flex"
            modalone.style.display="none"
        }) 
    }

    // bouton retour vers modalone

    const backone=document.querySelector("#backone")

    if(backone){
        backone.addEventListener("click", ()=>{
            modalone.style.display="flex"
            modaltwo.style.display="none"
        }

        )
    }
     const closemodaltwo=document.querySelector("#close-modaltwo")

     if(closemodaltwo) {
        closemodaltwo.addEventListener("click", ()=>{
            modalone.style.display="none"
            modaltwo.style.display="none"
        })
     }

//affichage mini galerie(modaltwo)
if(verifLog()){

const showminigal=async ()=>{
const minigalerie=document.querySelector("#minigalerie")    
    if(minigalerie){
        minigalerie.innerHTML=""
        const works=await allworks()
        if(works){
            
            for (const work of works){
                
        const figure=document.createElement("figure")
        const imgal=document.createElement("img")
        imgal.src=work.imageUrl
        imgal.alt=work.title

        figure.append(imgal)

        const butgalclose=document.createElement("button")
        butgalclose.innerHTML='<i class="fa-solid fa-trash-can"></i>'
        butgalclose.classList.add("delete")
        figure.append(butgalclose)
        minigalerie.append(figure)

        butgalclose.addEventListener("click",async ()=>{

            
        await deletework(work.id)
        await showGallery()
        await showminigal()
        })
            }
            
        }
        
}
    
    }
    await showminigal()
   

// alimentation champs categories

    const photoCategories=document.querySelector("#photocategories")
    if (photoCategories){
        let html="<option></option>"
        const cats=await allcats()
        if (cats){
            for(const cat of cats){
                html+=`<option value="${cat.id}">${cat.name}</option>`
            }
        }

    photoCategories.innerHTML=html
    }


// formulaire ajout work + previsu photo(259 à 272)

    const addphotochamps=document.querySelector("#addphoto")
    const phototitlechamps=document.querySelector("#phototitle")
    const modaltwoForm=document.querySelector("#modaltwo-form")

if (addphotochamps && phototitlechamps && modaltwoForm){
        const icon=document.querySelector(".modaltwo-icon")
        const label=document.querySelector(".modaltwo-textaddphoto")
        const desc=document.querySelector(".modaltwo-desc")
        const imgcontainer=document.querySelector(".modaltwo-imgcontainer")
        const imgdiv=document.querySelector("#modaltwo-img")
    addphotochamps.addEventListener("change", ()=>{
        
        if (icon && label && desc && imgcontainer){
            icon.style.display="none"
            label.style.display="none"
            desc.style.display="none"

            const img=document.createElement("img")
            img.src=URL.createObjectURL(addphotochamps.files[0])
            img.style.width="150px"
            imgcontainer.style.padding="0"
            imgdiv.style.display="block"
            imgdiv.innerHTML=""
            imgdiv.append(img)
        }
    })
    modaltwoForm.addEventListener("submit",async (event)=>{
        event.preventDefault()
    
        const formData = new FormData()
        formData.append("image", addphotochamps.files[0])
        formData.append("title", phototitlechamps.value)
        formData.append("category", photoCategories.value)
       
        await creatework(formData)
       
        icon.style.display="block"
        label.style.display="block"
        desc.style.display="block"
        imgdiv.style.display="none"
        imgcontainer.style.padding="20px"
        phototitlechamps.value=""
        photoCategories.value=""

        await showGallery()
        await showminigal()

        modaltwo.style.display="none"
        modalone.style.display="flex"
    })
}
}
    
    }

)


