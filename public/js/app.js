// console.log("I am a file inside directory")

// fetch("http://localhost:3005/weather?address=dhaka").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message1")
const messageTwo = document.querySelector("#message2")

// messageOne.textContent="From Javascript"
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const value = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch("/weather?address=" + value + "").then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageTwo.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                console.log(data)

                // console.log(data.location)
                // console.log(data.forecast)
            }

        })
    })
})