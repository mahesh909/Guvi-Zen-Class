let form = document.getElementById('dictform');
let wordInfo = document.getElementById('meaningforword');
let wordInput = document.getElementById('wordinput');
let searchHistory = document.getElementById('searchHistory');

let history = [];

try {
    // get the localstorage json value
    let searchHistoryJson = localStorage.getItem('searchHistory');
    // check if the key exists and the value
    // read from the local storage is valid
    if (searchHistoryJson) {
        history = JSON.parse(searchHistoryJson);
    }
} catch (error) {
    console.error(error);
}

wordInput.addEventListener('click', event => {
    // clear the search word from the input box
    wordInput.value = '';

    // show a div below the search box with the
    // search history
    // searchHistory: div reference
    searchHistory.innerHTML = '';

    // create a list
    let list = document.createElement('ul');
    list.classList.add('list-group');

    // populate the list with the list items
    // for every word in the history array
    history.forEach((word) => {
        // create a new list item
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-group-item-action');
        // set the content of the list item
        // with the value word
        listItem.textContent = word;

        // attach the event listener
        // for every item in the search history
        listItem.addEventListener('click', event => {
            // trigger the search event with
            // the value of word from the history
            wordInput.value = event.target.textContent;
            getmeaning(event.target.textContent);
            searchHistory.style.display = 'none';
        });

        // append it to the list(ul)
        list.appendChild(listItem);
    });

    // append the unordered list to the searchHistory div
    searchHistory.appendChild(list);
    // show the search history element
    searchHistory.style.display = 'block';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let word= document.getElementById('wordinput').value;
    getmeaning(word);
    if (word) {
        // check if the word exists in the history
        // array already
        if (!history.includes(word.toLowerCase())) {
            // we can push the word to the array
            history.push(word.toLowerCase());
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
    // console.log(history);
    searchHistory.style.display = 'none';
});

async function getmeaning(word) {
    // make a request to the api
    // get the details
    // parse the details to the html

    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await response.json();
        let paragraph=document.createElement('div');
        let list=document.createElement('ul');
        let meanings = data[0].meanings;
        let audioSource = data[0].phonetics[0].audio.toString();

        list.style.listStyleType='none';
        for(let partofspeech of meanings)
        {
            let listitem=document.createElement('li');
            listitem.innerHTML = `PartOfSpeech: <b>${partofspeech.partOfSpeech}</b>`;
            let definitions = partofspeech.definitions;
            let subList = document.createElement('ol');
            // subList.style.listStyleType = 'none';
            for (let definition of definitions) {
                let subListItem = document.createElement('li');
                subListItem.innerHTML = `<em>${definition.definition}</em>`;
                subList.appendChild(subListItem);
            }
            listitem.appendChild(subList);
            list.appendChild(listitem);
        }
        wordInfo.innerHTML = '';
        paragraph.innerHTML = `
            <span class='fas fa-volume-up' id='audio-icon'></span>
            <audio id='audio'>
                <source src=${audioSource} type='audio/mpeg'>
            </audio>
            Word: <b>${data[0].word}</b>`;
        
        wordInfo.appendChild(paragraph);
        wordInfo.appendChild(list);

        document.getElementById('audio-icon').addEventListener('click', event => {
                document.getElementById('audio').play();
        });
      
    } catch (error) {
        console.error('error fetching meaning for word data');
    }
}