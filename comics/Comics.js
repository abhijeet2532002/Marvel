// URL split into two parts
let startUrl = 'https://gateway.marvel.com/v1/public/characters';
let endUrl = '?&ts=1691554560791&apikey=0b0f563536c3a57a750d7aa1bb0dab54&hash=f3171302c1c54f0268f00e08fdd14c0f&limit=100';

// read data from the local storage
const data = localStorage.getItem('details');

// card image document
var pic = document.getElementById("pic");

// Details related Variable
var detailsTitle;
var detailsDescription;
var detailsComics;
var detailsSeries;
var detailsStories;
var cardHeading;

// card menu Function
cardHeading = document.getElementById("cardHeading");

// Card menu design
cardHeading.innerHTML = `
    <ul class="nav nav-tabs card-header-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a id="details" href="#" class="nav-link active" data-bs-toggle="tab" type="button" role="tab" aria-selected="true">Details</a>
        </li>

        <li class="nav-item" role="presentation">
            <a id="${data}/stories" class="nav-link" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Stories</a>
        </li>

        <li class="nav-item" role="presentation">
            <a id="${data}/series" class="nav-link" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Series</a>
        </li>

        <li class="nav-item" role="presentation">
            <a id="${data}/comics" class="nav-link" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Comics</a>
        </li>
    </ul>
`;

// details card
function detailCard() {
    dataArea.innerHTML = `
            <h4 class="card-title"><span>Character Name : </span><span>${detailsTitle}</span></h4>
            <p class="card-text">
                <div class="row">
                    <div class="col-md-3">
                        <h5>Description : </h5>
                    </div>

                    <div class="col-8">
                        <p class="fs-6">${detailsDescription}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <h6>Series No : </h6>
                    </div>

                    <div class="col-8">
                        <p class="fs-6">${detailsSeries}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <h6>Comic No : </h6>
                    </div>

                    <div class="col-8">
                        <p class="fs-6">${detailsComics}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <h6>Stories No : </h6>
                    </div>

                    <div class="col-8">
                        <p class="fs-6">${detailsStories}</p>
                    </div>
                </div>
            </p>
        `;
}

// onload fuction 
window.onload = () => {
    let fetchRes = fetch(startUrl + "/" + data + endUrl);
    fetchRes.then(res => res.json()).then(d => {
        const { path, extension } = d.data.results[0].thumbnail;

        detailsTitle = d.data.results[0].name;
        detailsDescription = d.data.results[0].description;
        detailsComics = d.data.results[0].comics.available;
        detailsSeries = d.data.results[0].series.available;
        detailsStories = d.data.results[0].stories.available;

        pic.innerHTML = `
            <img src="${path + "." + extension}"" class="img-fluid rounded-start h-md-100" style="width: 100%;" alt="image">
        `;

        detailCard();
    });
};

// Menu Related variable
let details = document.getElementById(`details`);
let stories = document.getElementById(`${data}/stories`);
let series = document.getElementById(`${data}/series`);
let comics = document.getElementById(`${data}/comics`);

// Details Function
details.addEventListener('click', detailCard);


// Stories Function
function displayStories(e) {
    e.preventDefault();

    dataArea.innerHTML = `
        <div class="row mx-1" >
            <ul id="storyDetais" class="overflow-auto m-0 p-0" style="max-height: 500px; overflow-x: hidden !important;">
            </ul>
        </div >
    `;

    let fetchRes = fetch(startUrl + "/" + e.target.id + endUrl);

    fetchRes.then(res => res.json()).then(d => {
        var result = d.data.results;

        let storyDetais = document.getElementById("storyDetais");
        var html = "";

        result.forEach(element => {
            let items = element.creators.items;
            var innerList = "";

            items.forEach(data => {
                innerList += `<li>${data.name} (role: ${data.role})</li>`;
            });

            html += `
            <li class="border border-1 border-dark rounded-3 my-2">
                <div class="row px-2">
                    <div class="row">
                        <span class="col-sm-3 col-md-2 fs-6 fw-bolder">Title : </span>
                        <span class="col-sm-9 col-md-10 fs-6">${element.title}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-3 col-md-2 fs-6 fw-bolder">Creators : </span>
                        <ul id="storyCreater" class="col-sm-8 9ol-md-10" type="none">
                            ${innerList}
                        </ul>
                    </div>

                    <div class="row">
                        <span class="col-sm-3 col-md-2 fs-6 fw-bolder">Characters : </span>
                        <span class="col-sm-9 col-md-10">${element.characters.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-3 col-md-2 fs-6 fw-bolder">Series : </span>
                        <span class="col-sm-9 col-md-10">${element.series.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-3 col-md-2 fs-6 fw-bolder">Comics : </span>
                        <span class="col-sm-9 col-md-10">${element.comics.available}</span>
                    </div>
                </div>
            </li>`;

            storyDetais.innerHTML = html;
        });
    });
}
stories.addEventListener('click', displayStories);


// Series Function
function displaySeries(e) {
    e.preventDefault();
    
    dataArea.innerHTML = `
        <div class="row mx-1" >
            <ul id="seriesDetais" class="overflow-auto m-0 p-0" style="max-height: 500px; overflow-x: hidden !important;">
            </ul>
        </div >
    `;

    let fetchResult = fetch(startUrl + "/" + e.target.id + endUrl);
    var html = "";
    fetchResult.then(res => res.json()).then(d => {
        
        var result = d.data.results;

        let seriesDetais = document.getElementById("seriesDetais");
        var html = "";

        result.forEach(element => {
            let items = element.creators.items;
            var innerList = "";

            items.forEach(data => {
                innerList += `<li>${data.name} (role: ${data.role})</li>`;
            });

            html += `
            <li class="border border-1 border-dark rounded-3 my-2">
                <div class="row px-2">
                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Title : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.title}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Year : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.startYear} - ${element.endYear}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Rating : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.rating}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Creators : </span>
                        <ul id="storyCreater" class="col-sm-8 9ol-md-10" type="none">
                            ${innerList}
                        </ul>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Characters : </span>
                        <span class="col-sm-8 col-md-9">${element.characters.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Stories : </span>
                        <span class="col-sm-8 col-md-9">${element.stories.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Comics : </span>
                        <span class="col-sm-8 col-md-9">${element.comics.available}</span>
                    </div>
                </div>
            </li>`;

            seriesDetais.innerHTML = html;
        });
    });
}
series.addEventListener('click', displaySeries);


// Comics Function
function displayComics(e) {
    e.preventDefault();
    dataArea.innerHTML = `
        <div class="row mx-1" >
            <ul id="comicDetais" class="overflow-auto m-0 p-0" style="max-height: 500px; overflow-x: hidden !important;">
            </ul>
        </div >
    `;

    let fetchResult = fetch(startUrl + "/" + e.target.id + endUrl);
    var html = "";
    fetchResult.then(res => res.json()).then(d => {
        
        var result = d.data.results;

        let comicDetais = document.getElementById("comicDetais");
        var html = "";

        result.forEach(element => {
            let items = element.creators.items;
            var innerList = "";

            items.forEach(data => {
                innerList += `<li>${data.name} (role: ${data.role})</li>`;
            });

            html += `
            <li class="border border-1 border-dark rounded-3 my-2">
                <div class="row px-2">
                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Title : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.title}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Date : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.modified}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Digital Id : </span>
                        <span class="col-sm-8 col-md-9 fs-6">${element.digitalId}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Creators : </span>
                        <ul id="storyCreater" class="col-sm-8 9ol-md-10" type="none">
                            ${innerList}
                        </ul>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Characters : </span>
                        <span class="col-sm-8 col-md-9">${element.characters.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Stories : </span>
                        <span class="col-sm-8 col-md-9">${element.stories.available}</span>
                    </div>

                    <div class="row">
                        <span class="col-sm-4 col-md-3 fs-6 fw-bolder">Series : </span>
                        <span class="col-sm-8 col-md-9">${element.series.name}</span>
                    </div>
                </div>
            </li>`;

            comicDetais.innerHTML = html;
        });
    });;
}
comics.addEventListener('click', displayComics);
