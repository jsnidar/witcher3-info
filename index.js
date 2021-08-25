
//MVP
let charactersArr = []
const charactersUrl = `http://witcher3api.com/api/characters`  
let startIndex = 0
let endIndex = startIndex + 29
let characterAttributes = {gender: [], race: [], profession: [], nationality: [], fappearance: []}

//When DOM Content is loaded fetch characters from the Witcher Api
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(charactersUrl, charactersArr, startIndex, endIndex)
    handleSubmit
})
function fetchCharacters(url, charactersArr, startIndex, endIndex) {
    fetch(url)
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => charactersArr.push(character))
        renderCharacterList(charactersArr, startIndex, endIndex)
    })
    .then(createObjectOfCharacterAttributeValues)
    .then(thisAtrributeDropDown())
    .then(handleSubmit())

}

//Render a list on the left side of the screen of the first 30 characters
function renderCharacterList (charactersArr, startIndex, endIndex) {
    const ul = document.getElementById('characters-list')
    for(let i = startIndex; i < charactersArr.length; i++) {
        if(i > endIndex) {
            break;
        }else{
            const li = document.createElement('li')
            ul.appendChild(li)
            li.innerText = charactersArr[i].name
            li.id = charactersArr[i].id
            startIndex = i
            //Event Listener 2: add an event listener to each li
            li.addEventListener('click', event => handleCharLiClick(event))
        }
    }
    const backButton = document.createElement('input')
    backButton.type = 'button'
    backButton.id = 'char-back-button'
    backButton.value = 'Previous Characters'
    ul.appendChild(backButton)
    const nextButton = document.createElement('input')
    nextButton.type = 'button'
    nextButton.id = 'char-next-button'
    nextButton.value = 'Next Characters'
    ul.appendChild(nextButton)
    handleCharacterBackButton(charactersArr, startIndex, endIndex)
    handleCharacterNextButton(charactersArr,startIndex,endIndex)
}

//Event Listener 1: Render back and next buttons to scroll through pages of characters at the bottom of the list
function handleCharacterBackButton() {
    backButton = document.querySelector('#char-back-button')
    backButton.addEventListener('click', (event) => {
        if(startIndex >= 30) {
            const ul = document.getElementById('characters-list')
            ul.innerHTML = ''
            startIndex -= 30
            endIndex -= 30
            renderCharacterList(charactersArr,startIndex,endIndex)
        }
    })
}
function handleCharacterNextButton() {
    nextButton = document.querySelector('#char-next-button')
    nextButton.addEventListener('click', (event) => {
        const ul = document.getElementById('characters-list')
        ul.innerHTML = ''
        startIndex += 30
        endIndex += 30
        renderCharacterList(charactersArr,startIndex,endIndex)
    })
}

//when the li is clicked then the information about that character is rendered to the page in a section
    function handleCharLiClick(event) {
        let liId = event.target.id
        let characterInfo = {...charactersArr.find(({id}) => id === parseInt(liId))}
        const characterDiv = document.querySelector('#character-info')
        characterDiv.innerHTML = ''
        debugger
        //create elements
        const fig = document.createElement('fig')
        const img = document.createElement('img')
        const name = document.createElement('h4')
        const gender = document.createElement('p')
        const race = document.createElement('p')
        const profession = document.createElement('p')
        const nationality = document.createElement('p')
        const appearance = document.createElement('p')
        
        //assign properties to elements
        img.src = characterInfo.image
        img.style.height = '50%'
        img.style.width = '50%'
        name.innerText = characterInfo.name
        gender.innerText = 'Gender: ' + characterInfo.gender
        race.innerText = "Race: " + characterInfo.race
        profession.innerText = 'Profession: ' + characterInfo.profession
        nationality.innerText = 'Nationality: ' + characterInfo.nationality
        appearance.innerText = "First Appearance: " + characterInfo.fappearance
        //append elements to the DOM tree
        characterDiv.appendChild(fig)
        fig.appendChild(img)
        characterDiv.appendChild(name)
        characterDiv.appendChild(gender)
        characterDiv.appendChild(race)
        characterDiv.appendChild(profession)
        characterDiv.appendChild(nationality)
        characterDiv.appendChild(appearance)
    }

const createObjectOfCharacterAttributeValues = () => {
    //use an arrow function to keep the same context throughout the function
    //iterate through the charactersArr
    for(let index in charactersArr) {
        let characterObj = charactersArr[index]
        //in each index it will iterate through each key in the character object
        for (let charKey in characterObj) {
            //for each key in that object find the key in characterAttributes with the same key
            //if the value at the key in the object within the charactersArr is not present in the array at that key in the characterAttributes object
            if(charKey !== 'id' && charKey !== 'name' && charKey !== 'image') {
                let attValue = characterAttributes[charKey]
                let attributeOpt =attValue.find(element => element === characterObj[charKey])
                if (attributeOpt === undefined) {
                    //it will push the value at that key to the array located within the key with the same name
                    attValue.push(characterObj[charKey])
                }
            }
        }
    }
}

//Event Listener 3: create a form that has a button filter characters
    //the form has:
        //a dropdown list of character traits to search within
            //options: name, gender, race, profession, nationality, appearance
        //text input where they can type in text and search for that attribute name
function thisAtrributeDropDown () {
    const attType = document.querySelector('#type-dropdown')
    attType.addEventListener('change', (e) => {
        const attributeDropdown = document.querySelector('#attribute-dropdown')
        attributeDropdown.innerHTML = ''
        if(attType.value === 'all') {
            charactersArr = []
            startIndex = 0
            endIndex = 29
        fetchCharacters(charactersUrl, charactersArr, startIndex, endIndex)
        }else{
            //iterate through characterAttributes at the key that matches the value 
            for (let att of characterAttributes[attType.value]) {
                addOptiontoDropdown(att)
            }
        }
    })
}

function addOptiontoDropdown (att) {
    //create one element
    const option = document.createElement('option')
    //add properties
    option.value = att
    option.text = att
    //append to DOM Tree
    const attributeDropdown = document.querySelector('#attribute-dropdown')
    attributeDropdown.appendChild(option)
}

function handleSubmit () {
    filterForm = document.querySelector('#filter-form')
    filterForm.addEventListener('submit', e => {
        e.preventDefault()
        const attType = document.querySelector('#type-dropdown')
        const attributeDropdown = document.querySelector('#attribute-dropdown')
        const attValue = attributeDropdown.value
        //clear characters list
        const list = document.querySelector('#characters-list')
        list.innerHTML = ''
        charactersArr = []
        startIndex = 0
        endIndex = 29
        sortUrl = charactersUrl + '/' + attType.value + '/' + attValue 
        fetchCharacters(sortUrl, charactersArr, startIndex, endIndex)
    })
}


//Stretch

//add an event listener for them to like that character
    //liking it saves it to a section at the bottom of the screen titled 'Favorite Characters'
        //characters are put in a container with a thumbnail and their name.
        //they display in boxes when the boxes fill the screen horizontally they make a new row
//create a JSON.db to persist the liked characters
    //pessimistically fetch favorited characters to be displayed
        //limit to 6 per page
//limit number of favorited characters to be rendered at once to 6. 
//create previous and next buttons to scroll though pages of favorited characters.


