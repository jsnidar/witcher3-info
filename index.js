
//MVP
let charactersArr = []
const charactersUrl = `http://witcher3api.com/api/characters`  
//the API wouldn't let me set a limit on the records it returns because of CORS so I had to create an array and use start and end indexes to limit the number of list items I display
let startIndex = 0
let endIndex = 29
let getEndIndex = () => endIndex = startIndex + 29
let characterAttributes = {gender: [], race: [], profession: [], nationality: [], fappearance: []}

//When DOM Content is loaded fetch characters from the Witcher Api
const whenDomLoads = () => {
    document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(charactersUrl, charactersArr)
    handleSubmit()
    })
}

whenDomLoads()

const fetchCharacters = (url, charactersArr) => {
    fetch(url)
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => charactersArr.push(character))
        renderCharacterList(charactersArr)
    })
    .then(createObjectOfCharacterAttributeValues)
    .then(thisAtrributeDropDown())
   

}

//Render a list on the left side of the screen of the first 30 characters
function renderCharacterList () {
    getEndIndex()
    const ul = document.getElementById('characters-list')
    for(let i = startIndex; i < charactersArr.length; i++) {
        if(i > endIndex) {
            break;
        }else{
            renderOneLi(charactersArr, ul, i)
        }
    }
    console.log(startIndex)
    renderBackButton(ul)
    renderNextButton(ul)
    handleCharacterBackButton()
    handleCharacterNextButton()
}

const renderOneLi = (array, ul, i) => {
    const li = document.createElement('li')
    ul.appendChild(li)
    li.innerText = array[i].name
    li.id = array[i].id
    startIndex = i
    //Event Listener 2: add an event listener to each li
    li.addEventListener('click', event => handleCharLiClick(event))
}
const renderBackButton = (ul) => {
    const backButton = document.createElement('input')
    backButton.type = 'button'
    backButton.id = 'char-back-button'
    backButton.value = 'Previous Characters'
    ul.appendChild(backButton)
}

const renderNextButton = (ul) => {
    const nextButton = document.createElement('input')
    nextButton.type = 'button'
    nextButton.id = 'char-next-button'
    nextButton.value = 'Next Characters'
    ul.appendChild(nextButton)
}

//Event Listener 1: Render back and next buttons to scroll through pages of characters at the bottom of the list
const handleCharacterBackButton = () => {
    backButton = document.querySelector('#char-back-button')
    backButton.addEventListener('click', (event) => {
        if(startIndex > 57) {
            debugger
            const ul = document.getElementById('characters-list')
            ul.innerHTML = ''
            startIndex -= 58
            getEndIndex()
            renderCharacterList(charactersArr)
        }
    })
}
const handleCharacterNextButton = () => {
    nextButton = document.querySelector('#char-next-button')
    nextButton.addEventListener('click', (event) => {
        debugger
        const ul = document.getElementById('characters-list')
        ul.innerHTML = ''
        renderCharacterList(charactersArr,startIndex,endIndex)
    })
}

//when the li is clicked then the information about that character is rendered to the page in a section
    function handleCharLiClick(event) {
        const liId = event.target.id
        const characterInfo = {...charactersArr.find(({id}) => id === parseInt(liId))}
        const {name, gender, race, profession, fappearance, image, nationality} = characterInfo
        const characterDiv = document.querySelector('#character-info')
        characterDiv.innerHTML = ''
        //create elements
        const fig = document.createElement('fig')
        const img = document.createElement('img')
        const nm = document.createElement('h4')
        const gndr = document.createElement('p')
        const rc = document.createElement('p')
        const prof = document.createElement('p')
        const nat = document.createElement('p')
        const app = document.createElement('p')
        
        //assign properties to elements
        img.src = image
        img.style.height = '50%'
        img.style.width = '50%'
        nm.innerText = name
        gndr.innerText = 'Gender: ' + gender
        rc.innerText = "Race: " + race
        prof.innerText = 'Profession: ' + profession
        nat.innerText = 'Nationality: ' + nationality
        app.innerText = "First Appearance: " + fappearance
        //append elements to the DOM tree
        characterDiv.appendChild(fig)
        fig.appendChild(img)
        characterDiv.appendChild(nm)
        characterDiv.appendChild(gndr)
        characterDiv.appendChild(rc)
        characterDiv.appendChild(prof)
        characterDiv.appendChild(nat)
        characterDiv.appendChild(app)
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
                let objAtKey = characterObj[charKey]
                let attributeOpt =attValue.find(element => element === objAtKey)
                if (attributeOpt === undefined) {
                    //it will push the value at that key to the array located within the key with the same name
                    attValue.push(objAtKey)
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
        fetchCharacters(charactersUrl, charactersArr)
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
        if(attValue === 'Male') {
            //the API returns all genders when you fetch the male gender, so I had to do this instead of the rendering process I used below. 
            const males = charactersArr.filter(({gender}) => gender === 'Male')
            charactersArr = males
            debugger
            list.innerHTML = ''
            startIndex = 0
            renderCharacterList(charactersArr, startIndex, endIndex)
        }else if(attValue !== '') {
            list.innerHTML = ''
            charactersArr = []
            startIndex = 0
            sortUrl = charactersUrl + '/' + attType.value + '/' + attValue 
        fetchCharacters(sortUrl, charactersArr, startIndex, endIndex)
        }else if(attValue === '') {
            list.innerHTML = ''
            charactersArr = []
            startIndex = 0
            sortUrl = charactersUrl 
        fetchCharacters(sortUrl, charactersArr, startIndex, endIndex)
        }  
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


