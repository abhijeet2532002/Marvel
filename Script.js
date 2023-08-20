// split URL into two parts
let startUrl = 'https://marvel-api-project-coding-ninja.netlify.app/gateway.marvel.com/v1/public/characters';
let endUrl = '?&ts=1691554560791&apikey=0b0f563536c3a57a750d7aa1bb0dab54&hash=f3171302c1c54f0268f00e08fdd14c0f&limit=100';

// Search bor (Input feild) varialble
var searchBox = document.getElementById('searchBox');

// get and set local storage data with key details
localStorage.setItem('details', "");

// get and set local storage data with key favourite
if (localStorage.getItem('favourite') == null) {
    localStorage.setItem('favourite', JSON.stringify([]));
}

// Fetch Home page data 
function home() {
    let fetchRes = fetch(startUrl + endUrl);
    fetchRes.then(res => res.json()).then(d => {
        var result = d.data.results;
        var html = "";

        result.forEach(element => {
            let { path, extension } = element.thumbnail;

            // check the card is listed in favourite or not
            let fav_array = JSON.parse(localStorage.getItem('favourite'));
            let favourite_icon = "";

            if (fav_array.includes("" + element.id)) {
                favourite_icon = `<i id="${element.id}"
            class="favourite fa-solid fa-heart text-danger fs-5"></i>`;
            } else {
                favourite_icon = `<i id="${element.id}"
            class="favourite fa-regular fa-heart text-danger fs-5"></i>`;
            }

            // Card design
            html += `
        <div class="col">
            <!-- Card -->
            <div class="card h-100 shadow-sm">
                <!-- Card Image -->
                <img src="${path + "." + extension}" class="card-img-top" style="height: 200px;" alt="...">

                <!-- Card Body -->
                <div class="card-body pt-2 pb-1">
                    <!-- Card Body Heading -->
                    <h6 class="card-title">${element.name}</h6>

                    <div class="d-grid gap-1 col-12 mx-auto">
                        <button id="/${element.id}/comics" class="comics btn btn-secondary fw-bolder fs-6 py-1" type="button">Comics : ${element.comics.available}</button>

                        <button id="/${element.id}/series" class="series btn btn-secondary fw-bolder fs-6 py-1" type="button">Series : ${element.series.available}</button>
                        
                        <button id="/${element.id}/stories" class="stories btn btn-secondary fw-bolder fs-6 py-1" type="button">Stories : ${element.stories.available}</button>
                    </div>
                </div>

                <!-- Card Footer -->
                <div class="card-footer bg-transparent border border-0 my-0 pt-0">
                    <!-- Details buttom -->
                    <button id="${element.id}"
                        class="viewDetails border border-top-0 border-start-0 border-end-0 border-dark border-2 bg-transparent p-0"
                        style="float: left;"> View Details</button>
                        

                    <!-- Favourite buttom -->
                    <button class="border border-0 bg-transparent p-1" style="float: right;">
                        ${favourite_icon}
                    </button>
                </div>
            </div>
        </div>`;

            document.getElementById("cardAppend").innerHTML = html;
        });
    });
}
home();

// mouse clicked event handling
function printMsg(e) {
    let id = e.target.id;

    // view Details
    if (e.target.className.includes("viewDetails")) {
        localStorage.setItem('details', id);
        window.location.href = "./comics/Comics.html";
    }

    // mark or unmark as favorite
    else if (e.target.className.includes("favourite")) {

        // get data from local storage of key favourite
        let array = JSON.parse(localStorage.getItem('favourite'));
        let index = array.indexOf(id);

        // Check id available or not
        if (array.indexOf(id) == "-1") {
            array.push(id);
        } else {
            array.splice(index, 1);
        }

        // Altering favourate data
        localStorage.setItem('favourite', JSON.stringify(array));
        home();
    }

    // favourite sidebar
    else if (e.target.id == "favourite-button") {
        // get data from local storage of key favourite
        let favourite_id = JSON.parse(localStorage.getItem('favourite'));

        // favourite card design
        var favourite_div = "";
        favourite_id.forEach(data => {

            // fetch the character API of favourite list data 
            let fetchResult = fetch(startUrl + "/" + data + endUrl);

            // Display favourite card in favourite sidebar
            fetchResult.then(res => res.json()).then(d => {
                var result = d.data.results[0];
                const { path, extension } = result.thumbnail;

                favourite_div += `
                <div class="col">
                    <div class="card my-2">
                        <img src="${path + "." + extension}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${result.name}</h5>
                            <div class="row">
                                <div class="d-flex justify-content-between">
                                    <!-- Details buttom -->
                                    <button id="${result.id}" class="viewDetails border border-top-0 border-start-0 border-end-0 border-dark border-2 bg-transparent p-0" style="float: left;"> View Details</button>
                
                                    <!-- Favourite buttom -->
                                    <button class="border border-0 bg-transparent p-1" style="float: right;">
                                        <i id="${result.id}" class="favourite fa-solid fa-heart text-danger fs-5"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                document.getElementById("favourite-card-design").innerHTML = favourite_div;
            });
        });

    }
}

// Input feild or search box handling
function handleInput(e) {
    let fetchSearch = fetch(startUrl + endUrl);
    console.log(startUrl + endUrl);
    html = "";
    fetchSearch.then(res => res.json()).then(d => {
        let data = d.data.results;

        let filterData = data.filter(item => item.name.includes(searchBox.value));

        filterData.forEach(element => {
            let { path, extension } = element.thumbnail;
            let fav_array = JSON.parse(localStorage.getItem('favourite'));
            let favourite_icon = "";

            if (fav_array.includes("" + element.id)) {
                favourite_icon = `<i id="${element.id}"
            class="favourite fa-solid fa-heart text-danger fs-5"></i>`;
            } else {
                favourite_icon = `<i id="${element.id}"
            class="favourite fa-regular fa-heart text-danger fs-5"></i>`;
            }
            html += `
                <div class="col">
                <!-- Card -->
                <div class="card h-100 shadow-sm">
                    <!-- Card Image -->
                    <img src="${path + "." + extension}" class="card-img-top" style="height: 200px;" alt="...">

                    <!-- Card Body -->
                    <div class="card-body pt-2 pb-1">
                        <!-- Card Body Heading -->
                        <h6 class="card-title">${element.name}</h6>

                        <div class="d-grid gap-1 col-12 mx-auto">
                            <button id="/${element.id}/comics" class="comics btn btn-secondary fw-bolder fs-6 py-1" type="button">Comics : ${element.comics.available}</button>

                            <button id="/${element.id}/series" class="series btn btn-secondary fw-bolder fs-6 py-1" type="button">Series : ${element.series.available}</button>
                            
                            <button id="/${element.id}/stories" class="stories btn btn-secondary fw-bolder fs-6 py-1" type="button">Stories : ${element.stories.available}</button>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="card-footer bg-transparent border border-0 my-0 pt-0">
                        <!-- Details buttom -->
                        <button id="${element.id}"
                            class="viewDetails border border-top-0 border-start-0 border-end-0 border-dark border-2 bg-transparent p-0"
                            style="float: left;"> View Details</button>
                            

                        <!-- Favourite buttom -->
                        <button class="border border-0 bg-transparent p-1" style="float: right;">
                            ${favourite_icon}
                        </button>
                    </div>
                </div>
            </div>
            `;
            document.getElementById("cardAppend").innerHTML = html;
        });
    });
}

// adding click event listerner in whole document
document.addEventListener('click', printMsg);
