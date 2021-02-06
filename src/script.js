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
                    <div class="card-image"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></div>
                    <div class="card-title"><h5>${product.productTitle}</h5></div>
                    <div class="card-price"><p>£${product.price}</p></div>
                    <a href="#modal-opened" data-index="${index}" id="popup-open">More Info</a>
                </div>
            </div>
        `
        }).join(" ");
        setNextButtonHide(products)
    document.querySelector(".track").innerHTML = htmlString
}



{/* <a href="#modal-opened" data-index="${index}" id="popup-open">More Info</a> */}

// Carousel
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

const indicatorParents = document.querySelector('.nav ul');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

const setNextButtonHide = function(products){
    console.log(products.length)
    if(products.length <= 5){
        next.classList.add('hide');
    }else{
        next.classList.remove('hide');
    }
}

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



displayProducts(products);

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
const $popupCard = $('.popup-card');



$track.delegate('#popup-open', 'click', function () {
    let index = $(this).data('index');
    let currentProduct = productDataWomens[index];
    getCurrentProduct(currentProduct);
    popup.style.display = "block";
    console.log("hello")
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
}

function appendCurrentProduct(url, title, price, image, genre, industry, type) {
    $popupCard.html(
        `
        <div class="popup-image">
            <img src="${image}" alt="product"/>
        </div>
        
        <div class="popup-info">
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
   










const carouselInner = document.querySelector('.carousel-inner');
// const track = document.querySelector('.track');
const cardContainer = document.querySelectorAll('.card-container');

let width = cardContainer[0].offsetWidth + 30;
track.style.minWidth = `${cardContainer}.length * width}px`;
let start;
let change;

carouselInner.addEventListener('dragstart', (event) => {
    start = event.clientX;
})
carouselInner.addEventListener('dragover', (event) => {
    event.preventDefault();
    let touch = event.clientX;
    change = start - touch;
})
carouselInner.addEventListener('dragend', slideShow);

// touchevent

carouselInner.addEventListener('touchstart', (event) => {
    start = event.touches[0].clientX;
    console.log(start)
})

carouselInner.addEventListener('touchmove', (event) => {
    // event.preventDefault();
    let touch = event.touches[0];
    change = start - touch.clientX;
})

carouselInner.addEventListener('touchend', slideShow);

function slideShow(){
    if(change > 0){
        carouselInner.scrollLeft += width;
    }else{
        carouselInner.scrollLeft -= width;
    }
}
