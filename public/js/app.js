console.log('Clientside javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent = 'Error: '+data.error
        }
        else
        {
            messageOne.textContent = 'Address: '+data.address
            messageTwo.textContent = 'Forecast: '+data.forecast
        }
    })
})
})