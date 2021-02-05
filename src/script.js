const products = productDataWomens;

const displayProducts = (products) => {
    const htmlString = products
        .map((product, index) => {
            return `
            <div class="card-container">
                <div class="card" id="card"> 
                    <div class="card-image"><a href="#modal-opened" data-index="${index}" id="modal-open"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></a></div>
                    <div class="card-title"><a href="#modal-opened" class="link-${index} id="modal-open">${product.productTitle}</a></div>
                    <div class="card-price">${product.price}</div>
                </div>
            </div>
        `
        }).join(" ");
    document.querySelector(".track").innerHTML = htmlString
}

displayProducts(products);


// carousel transitions

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');
let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
    index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${index * carouselWidth}px)`;
    if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        next.classList.add('hide');
    }
})

prev.addEventListener('click', () => {

    index--;
    next.classList.remove('hide');

    if (index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(-${index * carouselWidth}px)`;
})


// Options types

let productTypes = []
function getProductTypes() {
    for (let i = 0; i < productDataWomens.length; i++) {
        let productUrlSplit = productDataWomens[i].productUrl.split('/');
        let item = productUrlSplit[6];
        if (!productTypes.includes(item)) {
            productTypes.push(item);
        }
    }
}
getProductTypes();


function createOptionsType() {
    let optionsType = "<option value='default'>Select type</option>";

    for (let i = 0; i < productTypes.length; i++) {
        let item = productTypes[i].charAt(0).toUpperCase() + productTypes[i].slice(1);
        optionsType += `<option value="${item.toLowerCase()}">${item}</option>`
    }
    document.getElementById("dropdown-type").innerHTML = optionsType;
}
createOptionsType()

// pop up

const modal = document.getElementById("modal");
const $track = $('.track');
const $modal = $('.modal');


$track.delegate('#modal-open', 'click', function(){
    let index = $(this).data('index');
    let currentProduct = productDataWomens[index];
    getCurrentProduct(currentProduct);
    modal.style.display = "block";
})


function getCurrentProduct(currentProduct) {
    const url = currentProduct.productUrl;
    const title = currentProduct.productTitle;
    const price = currentProduct.price;
    const image = currentProduct.imageSrc;
    const currentProductSplit = currentProduct.productUrl.split('/');
    const genre = currentProductSplit[4];
    const industry = currentProductSplit[5];
    const type = currentProductSplit[6];
    appendCurrentProduct(url, title, price, image, genre, industry, type)
}

function appendCurrentProduct(url, title, price, image, genre, industry, type) {
    $modal.html(
        `
        <span class="close">&times;</span>
        <div class="header">
            <h1>${title}</h1>
            <p>${genre}</p>
            <p>${industry}</p>
            <p>${type}</p>
            <p>${price}</p>
        </div>
        <div class="image">
            <img src="${image}" alt="product"/>
        </div>
        <div class="url">
            <a href="${url}">Visit web page</a>
        </div>
        `
    );
}
// close pop up


$modal.delegate('.close', 'click', function () {
    modal.style.display = "none";
})


// function filters(products){
//     let newProducts = products;
//     newProducts = getSelectedType(newProducts);
//     displayProducts(newProducts);
// }

// filters(productDataWomens);


