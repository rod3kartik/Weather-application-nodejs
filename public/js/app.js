const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageone = document.querySelector('#firstpara')
const messagetwo = document.querySelector('#secondpara')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    messageone.textContent = "Loading ..."
    messageTwo.textContent = ""
    fetch("/weather?address=" + location).then((response)=>{
        response.json().then((data) =>{
            if(!data.error){
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
            console.log("Working")
        }
    
    else{
            messageone.textContent = "Please input a correct location"
    }
})
})
})