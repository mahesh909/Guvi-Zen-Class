let booksformid = document.getElementById('books-form');
let cardhtml = document.getElementById('mytable');


booksformid.addEventListener('submit', async (e) => {
    e.preventDefault();
    
});


function bookprint(book,index) {
    return `<tr>
        <td>
        ${index+1
        }. Book Name is ${book.name}
        </td>
        <td>
        isbn is${book.isbn}
        </td>
        <td>
        Number of pages : ${book.numberOfPages}
        </td>
        <td>
        Authors: ${book.authors}
        </td>
        <td>
        Publisher: ${book.publisher}
        </td>
        <td>
        Released: ${book.released}
        </td>
        <td>
        ${
            book.charlist.map((charname,index) => {
                return  `Characters ${index+1}: <h4>${charname}</h4><br></br>`
            }) 
        }
        </td>
    </tr>
`;
}


const fetchCharNames= async(charUrl) => {
    const response = await fetch(charUrl);
    const character = await response.json();
    return character.name;
}

const fetchCharacters = async (urlList) => {

    return urlList.map((characterUrl) => {
        return fetchCharNames(characterUrl);
    })
}

async function getbooksinfo() {

    try {
        let response = await fetch(`https://anapioficeandfire.com/api/books`);
        let books = await response.json();

        let BookPromises = books.map(async (book,index) => {

            let charUrlList = book.characters.slice(0, 5);

            let charNameProimises = await fetchCharacters(charUrlList);
            

            book.charlist = await Promise.all(charNameProimises);
           
            return bookprint(book,index);

        });

        let BookCards = await Promise.all(BookPromises)

       return BookCards;

       
    } catch (error) {
        console.log(error)
    }
}


getbooksinfo().then((val) => {
    cardhtml.innerHTML = val;
});
function myFunction() {
    // Declare variables
    let input, filter, i, txtValue;
    input = document.getElementById("myinput");
    filter = input.value.toUpperCase();
    //table = document.getElementById("myTable");
    tr = cardhtml.getElementsByTagName("tr");
   
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText || td.innerHTML ;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
          tr[i].style.display = "";
          tr[i].style.backgroundColor="lightgray";
        } else {
           
          tr[i].style.display = "none";
        }
      }
    }
  }
