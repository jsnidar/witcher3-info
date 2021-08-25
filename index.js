
//MVP
let charactersArr = []
let startIndex = 0
let endIndex = startIndex + 29

//When DOM Content is loaded fetch characters from the Witcher Api
document.addEventListener('DOMContentLoaded', () => {
    const charactersUrl = `http://witcher3api.com/api/characters`  
    


    fetchCharacters(charactersUrl, charactersArr, startIndex, endIndex)
})
function fetchCharacters(url, charactersArr, startIndex, endIndex) {
    fetch(url)
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => charactersArr.push(character))
        renderCharacterList(charactersArr, startIndex, endIndex)
    })
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
        const liId = event.target.id
        const characterInfo = charactersArr[liId - 1]

        const characterDiv = document.querySelector('#character-info')
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
        name.innerText = characterInfo.name
        gender.innerText = 'Gender: ' + characterInfo.gender
        race.innerText = "Race: " + characterInfo.race
        profession.innerText = 'Profession: ' + characterInfo.profession
        nationality.innerText = 'Nationality: ' + characterInfo.nationality
        appearance.innerText = "First Appearance: " + characterInfo.appearance
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

//Event Listener 3: create a form that has a button filter characters
    //the form has:
        //a dropdown list of character traits to search within
            //options: name, gender, race, profession, nationality, appearance
        //text input where they can type in text and search for that attribute name


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


