let category="now_playing";

let imgPath = "https://image.tmdb.org/t/p/w500";
let movieContainer=[];
let linkName=document.getElementsByClassName("link-name");

async function getData(category){
    let response
    if(category == "trendingLink")
    {
        response=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=1a992e42ea2e2f4c31336ed1a99bf2ee`);
    }
    else{
        response =await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=1a992e42ea2e2f4c31336ed1a99bf2ee`);
    }
    let json=await response.json();
    movieContainer=json.results;
    console.log(movieContainer);
    displayMovies();
}

getData(category);
function displayMovies() {
    let container = '';
    for (let i = 0; i < movieContainer.length; i++) {
        container += `
        <div class="movie-card">
            <div class="content">
                <div class="layer">
                    <h4>${movieContainer[i].title}</h4>
                    <p class="vote">Vote: <span class="vote-number">${movieContainer[i].vote_average}</span></p>
                    <h5>${movieContainer[i].release_date}</h5>
                </div>
                <img src="${imgPath + movieContainer[i].poster_path}" alt="" class="w-100">
            </div>
        </div>`;
    }
    document.getElementById('dataContainer').innerHTML = container;
}

function getCategory(e){
    category = e.target.getAttribute('filmCategory');
    getData(category);
}
Array.from(linkName).forEach(function(element){
    element.addEventListener('click',getCategory);
})
let searchInput=document.getElementById("searchInput");
async function search(){
    let text=searchInput.value;
    if(text == ''){
        getData(category);
    }
    else{
         let response= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1a992e42ea2e2f4c31336ed1a99bf2ee&query=${text}`);
    let json=await response.json();
    movieContainer=json.results;
    displayMovies();
    }
   
}
