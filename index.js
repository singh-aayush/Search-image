const searchkey = "A1SazG7wfuJvMCKTo6zrLS2TcUcn5kE6gieV1xEcbec";

const forminput = document.querySelector("form");
const inputbox = document.getElementById("search-input");
const searchResults = document.querySelector(".search-result");
const showbtn = document.getElementById("show-btn");

let inputdata = "";
let page = 1;

async function searchImages(){
    inputdata = inputbox.value;
   
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${searchkey}`;

    const response = await fetch(url);
    const data = await response.json();

    const result = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }
    result.map((result) => {
        const imagewraper = document.createElement("div");
        imagewraper.classList.add("image-container");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imagewraper.appendChild(image);
        imagewraper.appendChild(imageLink);
        searchResults.appendChild(imagewraper);
    });

    page++;
    if(page > 1){
        showbtn.style.display = "block";
    }
}

forminput.addEventListener("submit", (event) =>{
    event.preventDefault();
    page=1;
    searchImages();
});

showbtn.addEventListener("click", ()=>{
    searchImages();
});