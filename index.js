
//MVP


//When DOM Content is loaded fetch characters from the Witcher Api
document.addEventListener('DOMContentLoaded', () => {
    const charactersUrl = `http://witcher3api.com/api/characters`  
    let charactersArr = []

    fetchCharacters(charactersUrl, charactersArr)
})
function fetchCharacters(url, charactersArr) {
    fetch(url)
    .then(response => response.json())
    .then(characters => {
        let startIndex = 0
        characters.forEach(character => charactersArr.push(character))
        renderCharacterList(charactersArr, startIndex)
    })
}

//Render a list on the left side of the screen of the first 30 characters
function renderCharacterList (charactersArr, startIndex) {
    debugger
    const endIndex = startIndex + 30
    const ul = document.getElementById('characters-list')
    for(let i = startIndex; i < charactersArr.length; i++) {
        if(i > endIndex) {
            break;
        }else{
            const li = document.createElement('li')
            ul.appendChild(li)
            li.innerText = charactersArr[i].name
            li.id = charactersArr[i].id
        }
    }
}

//Event Listener 1: Render back and next buttons to scroll through pages of characters at the bottom of the list

//Event Listener 2: add an event listener to each li, when the li is clicked then the information about that character is rendered to the page in a section

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


