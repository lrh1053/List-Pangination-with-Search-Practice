
// Add variables that store DOM elements you will need to reference and/or manipulate
let studentList = document.getElementsByClassName("student-item cf");
// Use ceil to start from page 1
let totalPage = Math.ceil(studentList.length / 10);
let currentPage = 1;
let page = document.querySelector(".page");

// Create a search bar element.
let searchBar = document.createElement("INPUT");

// Add onkeyup attribute to call function and other neccesary attributes.
searchBar.setAttribute("type", "search");
searchBar.setAttribute('placeholder', 'Search by name');
searchBar.setAttribute('class', 'search-bar');
searchBar.setAttribute('onkeyup', "search()");

// Select page header and append search bar to it.
let pageHeader = document.getElementsByClassName('page-header cf')[0];
pageHeader.appendChild(searchBar);

// Function to display students.
function displayList(){
    
    // currently not at last page
    if (currentPage !== totalPage) {
        // if total page > 1, means we are in the middle pages;
        // display only the 10 students of selected page.
        if (currentPage !== 1) {
            for (let i = 0; i < currentPage * 10 - 10; i++){
                studentList[i].style.display = "none";
            }
            for (let j = currentPage * 10 - 10; j < currentPage * 10; j++){
                studentList[j].style.display = "";
            }
            for (let k = currentPage * 10; k < studentList.length; k++){
                studentList[k].style.display = "none";
            }

        // if total page > 1 and currentPage === 1, means we are at the first page
        // display only the 10 students of first page.
        } else {
            for (let i = 0; i < 10; i++){
                studentList[i].style.display = "";
            }
            for (let i = 10; i < studentList.length; i++){
                studentList[i].style.display = "none";
            }
        }

    }
    // Currently at the last page
    else {
        // if we only have one page, display to studentList.length
        if (currentPage === 1){
            for (let i = 0; i < studentList.length; i++){
                studentList[i].style.display = "";
            }
        }
        // if we have more than one page, 
        // display only the remainder of students after divided by 10
        else {
            for (let i = 0; i < currentPage * 10 - 10; i++){
                studentList[i].style.display = "none";
            }
            for (let i = currentPage * 10 - 10; i < studentList.length; i++){
                studentList[i].style.display = "";
            }
        }
    }
}
// call function to display list;
displayList();


// Create and append the pagination links - Creating a function that can do this is a good approach
function createPaginationLinks(){
    // create div element and set classname
    let div = document.createElement("DIV");
    div.className = "pagination";
    // create ul element and append to div.
    let ul = document.createElement("UL");
    div.appendChild(ul);

    // declair list of <li> and <a> element
    let lis = [];
    let aTags = []

    // loop n times (n == totalPage) to set all the elements correctly
    for (let i = 0; i < totalPage; i++) {
        lis.push(document.createElement("LI"));
        aTags.push(document.createElement("A"));
        aTags[i].setAttribute("herf", "#");
        aTags[i].textContent = (i + 1).toString();
        lis[i].appendChild(aTags[i]);
        ul.appendChild(lis[i]);
    }
    // default pagination link set to page 1
    lis[0].childNodes[0].setAttribute("class", "active");
    // return the created element because we will be append to the page.
    return div;
}

// append the created pagination links to the page.
page.appendChild(createPaginationLinks());

// get all the pagination links.
let paginationLinks = document.querySelectorAll("a");

// loop through pagination links and add eventlistner to display corresponding students.
// also add class='active' to corresponding page.
for (let i = 0; i < paginationLinks.length; i++){
    paginationLinks[i].addEventListener("click", (e) => {
        paginationLinks[currentPage - 1].classList.remove("active");
        currentPage = i + 1;
        e.target.setAttribute("class", "active");
        displayList();
    })
}

// Function to search people by name
function search() {
    // declare variables
    let input, filter, li, name, i;
    input = searchBar;
    // get the input value to uppercase makesure not case-sensitive
    filter = input.value.toUpperCase();
    li = studentList;

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        // get name of each student
        name = li[i].getElementsByTagName("h3")[0];

        // check using .indexOf: if returned value > -1 means we found a match
        if (name.textContent.toUpperCase().indexOf(filter) > -1) {
            // display the ones matched
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}




