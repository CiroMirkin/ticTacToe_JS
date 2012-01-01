"use strict"

const tableGame = document.getElementById('tableGame')

const userWinsWhen = [
    'a1 a2 a3',
    'b1 b2 b3',
    'c1 c2 c3',
    'a1 b1 c1',
    'a2 b2 c2',
    'a3 b3 c2',
    'a1 b2 c3',
    'a3 b2 c1'
]

const indexCards = {
    blackPlayer: [
        '<div id="black-3" class="indexCard indexCard--black"><span class="circle"></span></div>',
        '<div id="black-2" class="indexCard indexCard--black"><span class="circle"></span></div>',
        '<div id="black-1" class="indexCard indexCard--black"><span class="circle"></span></div>'
    ],
    whitePlayer: [
        '<div id="white-3" class="indexCard indexCard--white"><span class="circle"></span></div>',
        '<div id="white-2" class="indexCard indexCard--white"><span class="circle"></span></div>',
        '<div id="white-1" class="indexCard indexCard--white"><span class="circle"></span></div>'
    ]
}

let playWhite = true
let areThereIndexCards = true

const getIndexCard = () => {
    let indexCard = ''
    if(!indexCards.whitePlayer.length) {
        areThereIndexCards = false
    }
    if (playWhite) {
        indexCard = indexCards.whitePlayer.at(-1)
        indexCards.whitePlayer.pop()
        playWhite = false
        
        return indexCard 
    }

    indexCard = indexCards.blackPlayer.at(-1)
    indexCards.blackPlayer.pop()
    playWhite = true

    return indexCard 
}

let playerMoving = false
let playerCardIndex = ''

tableGame.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'row__cell' && areThereIndexCards) {
        const cell = document.getElementById(e.target.id)
        cell.innerHTML = getIndexCard() || ''
    }

    if(e.target.classList[0] == 'row__cell' && playerMoving && !e.target.firstElementChild) {
        playerMoving = false
        e.target.innerHTML = playerCardIndex
    }

    if(e.target.classList[0] == 'indexCard' && !areThereIndexCards) {
        playerMoving = true
        playerCardIndex = e.target.outerHTML
        e.target.parentElement.innerHTML = ''
    }
})