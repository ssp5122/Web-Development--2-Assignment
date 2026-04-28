const form = document.querySelector('#form')
const eventCards = document.querySelector('.cards')

const eventTitle = document.querySelector('#eventTitle')
const eventDate = document.querySelector('#eventDate')
const category = document.querySelector('#category')
const description = document.querySelector('#description')

const clearBtn = document.querySelector('#clearAll')
const sampleBtn = document.querySelector('#sampleEvent')

form.addEventListener('submit', function(event){
    event.preventDefault()

    const title = eventTitle.value
    const date = eventDate.value
    const cat = category.value
    const desc = description.value

    if(title === "" || date === "" || desc === ""){
        alert("Please fill in all required fields.")
        return
    }

    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
        <h2>${title}</h2>
        <p>📅 ${date}</p>
        <button>${cat}</button>
        <p>${desc}</p>
        <div class="deleteCard">X</div>
    `
    card.querySelector('.deleteCard').addEventListener('click', function(){
        card.remove()
    })

    eventCards.appendChild(card)

    form.reset()
})
clearBtn.addEventListener('click', function(){
    eventCards.innerHTML = ""
})
sampleBtn.addEventListener('click', function(){

    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
        <h2>Sample Event</h2>
        <p>📅 2026-02-15</p>
        <button>Workshop</button>
        <p>This is a sample event description.</p>
        <div class="deleteCard">X</div>
    `

    card.querySelector('.deleteCard').addEventListener('click', function(){
        card.remove()
    })

    eventCards.appendChild(card)
})
document.addEventListener('keydown', function(event){
    document.querySelector('.key').innerText = event.key
})
