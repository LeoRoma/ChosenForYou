// @ts-nocheck
const products = [...productDataWomens];

function getLandingPageImage() {
    $(".header-image").append(`<img src="${products[5].imageSrc}" alt="landing-image" />`);
}
getLandingPageImage();

const displayProducts = (products) => {
    const htmlString = products
        .map((product, index) => {
            return `
            <div class="card-container">
                <div class="card" id="card"> 
                    <div class="card-image"><a href="#modal-opened" data-index="${index}" id="popup-open"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></a></div>
                    <div class="card-title">${product.productTitle}</div>
                    <div class="card-price">£${product.price}</div>
                </div>
            </div>
        `
        }).join(" ");
    document.querySelector(".track").innerHTML = htmlString
}

displayProducts(products);


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
    // @ts-ignore
    for (let i = 0; i < productDataWomens.length; i++) {
        // @ts-ignore
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

const popup = document.getElementById("popup");
const $track = $('.track');
const $popupCardLaptop = $('.popup-card-laptop');
const $popupCardMobile = $('.popup-card-mobile');


$track.delegate('#popup-open', 'click', function () {
    let index = $(this).data('index');
    let currentProduct = productDataWomens[index];
    getCurrentProduct(currentProduct);
    popup.style.display = "block";
})


function getCurrentProduct(currentProduct) {
    const url = currentProduct.productUrl;
    const title = currentProduct.productTitle;
    const price = currentProduct.price;
    const image = currentProduct.imageSrc;
    const currentProductSplit = currentProduct.productUrl.split('/');
    const genre = currentProductSplit[4].charAt(0).toUpperCase() + currentProductSplit[4].slice(1);
    const industry = currentProductSplit[5].charAt(0).toUpperCase() + currentProductSplit[5].slice(1);
    const type = currentProductSplit[6].charAt(0).toUpperCase() + currentProductSplit[6].slice(1);
    appendCurrentProduct(url, title, price, image, genre, industry, type)
    appendCurrentProductMobile(url, title, price, image, genre, industry, type)
}

function appendCurrentProduct(url, title, price, image, genre, industry, type) {
    $popupCardLaptop.html(
        `
        <div class="popup-image-laptop">
            <img src="${image}" alt="product"/>
        </div>
        
        <div class="popup-info-laptop">
            <h1>${title}</h1>
            <p>${genre}</p>
            <p>${industry}</p>
            <p>${type}</p>
            <p>£${price}</p>
            <a href="${url}">Visit web page</a>
        </div>
        `
    );
}


function appendCurrentProductMobile(url, title, price, image, genre, industry, type) {
    $popupCardMobile.html(
        `
        <div class="popup-image-mobile">
            <img src="${image}" alt="product"/>
        </div>
        
        <div class="popup-info-mobile">
            <h1>${title}</h1>
            <p>${genre}</p>
            <p>${industry}</p>
            <p>${type}</p>
            <p>£${price}</p>
            <a href="${url}">Visit web page</a>
        </div>
        `
    );
}
// close pop up

$('.close').click(function(){
    popup.style.display = "none";
})
   

