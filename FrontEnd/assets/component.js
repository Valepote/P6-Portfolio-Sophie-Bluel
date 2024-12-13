document.addEventListener("DOMContentLoaded",async()=>{
    //affichage categories
    const showCats=async (gallery)=>{
        const portfolio=document.querySelector("#portfolio")
        console.log(portfolio)
        if(portfolio){
            const cats=await allcats()
            console.log(cats)
            if(cats){
                const buttons=document.createElement("div")
                buttons.classList.add("flex")
                buttons.classList.add("justify-center")
                buttons.id="buttons"
                
                const buttonAll=document.createElement("button")
                buttonAll.innerText="Tous"
              
                buttons.append(buttonAll)
                buttonAll.addEventListener("click", async ()=>{
                    await showGallery()
                })
    
                for (const cat of cats){
                const button=document.createElement("button")
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
    const gallery=document.querySelector(".gallery")
    if(gallery){
        let works=await allworks()
        if(works){
            if(catname&&catname!=="Tous"){
                works=works.filter(work=>work.category.name===catname)
            }
            console.log(works)
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
    await showCats(gallery)
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
   
    }
)


