
let charactersArr = []
const charactersUrl = `http://witcher3api.com/api/characters`  
let startIndex = 0
let endIndex = 30
let getEndIndex = () => endIndex = startIndex + 30
let characterAttributes = {gender: [], race: [], profession: [], nationality: [], fappearance: []}

const whenDomLoads = () => {
    document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(charactersUrl, charactersArr)
    handleSubmit()
    })
}

whenDomLoads()

const fetchCharacters = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => charactersArr.push(character))
        renderCharacterList(charactersArr)
    })
    .then(createObjectOfCharacterAttributeValues)
    .then(thisAtrributeDropDown())
}

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

const handleCharacterBackButton = () => {
    backButton = document.querySelector('#char-back-button')
    backButton.addEventListener('click', (event) => {
        event.preventDefault()
        if(startIndex -30 > 29) {
            const ul = document.getElementById('characters-list')
            ul.innerHTML = ''
            startIndex -= 60
            getEndIndex()
            renderCharacterList(charactersArr)
        }else if(startIndex - 30 > 0) {
            const ul = document.getElementById('characters-list')
            ul.innerHTML = ''
            startIndex = 0
            getEndIndex()
            renderCharacterList(charactersArr)
        }
    })
}
const handleCharacterNextButton = () => {
    nextButton = document.querySelector('#char-next-button')
    nextButton.addEventListener('click', (event) => {
        debugger
        if(startIndex < charactersArr.length -1) {
            event.preventDefault()
            getEndIndex()
            const ul = document.getElementById('characters-list')
            ul.innerHTML = ''
            renderCharacterList(charactersArr,startIndex,endIndex)
        }
    })
}

    function handleCharLiClick(event) {
        const liId = event.target.id
        const characterInfo = charactersArr.find(({id}) => id === parseInt(liId))
        const {name, gender, race, profession, fappearance, image, nationality} = characterInfo
        const characterDiv = document.querySelector('#character-info')
        characterDiv.innerHTML = ''
        const fig = document.createElement('fig')
        const figCaption = document.createElement('figcaption')
        const img = document.createElement('img')
        const nm = document.createElement('h4')
        const gndr = document.createElement('p')
        const rc = document.createElement('p')
        const prof = document.createElement('p')
        const nat = document.createElement('p')
        const app = document.createElement('p')
                
        img.src = image
        img.className = 'img-fluid'
        img.alt = 'Responsive image'
        nm.innerText = name
        gndr.innerText = 'Gender: ' + gender
        rc.innerText = "Race: " + race
        prof.innerText = 'Profession: ' + profession
        nat.innerText = 'Nationality: ' + nationality
        app.innerText = "First Appearance: " + fappearance

        characterDiv.appendChild(fig)
        fig.appendChild(img)
        fig.appendChild(figCaption)
        figCaption.appendChild(nm)
        figCaption.appendChild(gndr)
        figCaption.appendChild(rc)
        figCaption.appendChild(prof)
        figCaption.appendChild(nat)
        figCaption.appendChild(app)
    }

const createObjectOfCharacterAttributeValues = () => {
    for(let index in charactersArr) {
        let characterObj = charactersArr[index]
        for (let charKey in characterObj) {
            if(charKey !== 'id' && charKey !== 'name' && charKey !== 'image') {
                let attValue = characterAttributes[charKey]
                let objAtKey = characterObj[charKey]
                let attributeOpt =attValue.find(element => element === objAtKey)
                if (attributeOpt === undefined) {
                    attValue.push(objAtKey)
                }
            }
        }
    }
}

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
            for (let att of characterAttributes[attType.value]) {
                addOptiontoDropdown(att)
            }
        }
    })
}

function addOptiontoDropdown (att) {
    const option = document.createElement('option')
    option.value = att
    option.text = att
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
        const list = document.querySelector('#characters-list')
        if(attValue === 'Male') {
            const males = charactersArr.filter(({gender}) => gender === 'Male')
            charactersArr = males
            list.innerHTML = ''
            startIndex = 0
            renderCharacterList(charactersArr)
        }else if(attValue !== '') {
            list.innerHTML = ''
            charactersArr = []
            startIndex = 0
            sortUrl = charactersUrl + '/' + attType.value + '/' + attValue 
            fetchCharacters(sortUrl)
        }else if(attValue === '') {
            list.innerHTML = ''
            charactersArr = []
            startIndex = 0
            sortUrl = charactersUrl 
            fetchCharacters(sortUrl)
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


