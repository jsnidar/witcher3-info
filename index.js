
//MVP


//When DOM Content is loaded fetch characters from the Witcher Api
document.addEventListener('DOMContentLoaded', () => {
    const charactersUrl = 'http://witcher3api.com/api/characters'
    fetchCharacters(charactersUrl)
})

function fetchCharacters(url) {
    fetch(url)
    .then(response => response.json())
    .then(characters => console.log(characters))
}
//Render a list on the left side of the screen of the first 30 characters
//Event Listener 1: Render back and next buttons to scroll through pages of characters at the bottom of the list

//Event Listener 2: add an event listener to each li, when the li is clicked then the information about that character is rendered to the page in a section

//Event Listener 3: create a form that has a button filter characters
    //when you click this button a form appears with:
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


