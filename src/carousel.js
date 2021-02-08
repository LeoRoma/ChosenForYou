const products = [...productDataWomens];

const displayProducts = (products) => {
    if (products.length === 0) {
        const productsNotFound = `<div class="not-found"><h2>Items not found</h2></div>`;
        document.querySelector(".track").innerHTML = productsNotFound;
    } else {
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

        document.querySelector(".track").innerHTML = htmlString;

    }
}

let bodyWidth = $('body').width();
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

const indicatorParents = document.querySelector('.nav ul');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

const setNextButtonHide = function (products) {
    
    if (bodyWidth >= 1200 && products.length <= 6) {
        next.classList.add('hide');
    }
    else if (bodyWidth >= 992 && products.length <= 5) {
        next.classList.add('hide');
    }
    else if (bodyWidth >= 468 && products.length <= 3) {
        next.classList.add('hide');
    }
    else {
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

// Touch carousel 

const carouselInner = document.querySelector('.carousel-inner');
const cardContainer = document.querySelectorAll('.card-container');

let width = cardContainer[0].offsetWidth;
track.style.minWidth = `${cardContainer}.length * width}px`;
let start;
let change;

// touchevent

carouselInner.addEventListener('touchstart', (event) => {
    start = event.touches[0].clientX;
})

carouselInner.addEventListener('touchmove', (event) => {
    let touch = event.touches[0];
    change = start - touch.clientX;
})

carouselInner.addEventListener('touchend', slideShow);

function slideShow() {
    if (change > 0) {
        carouselInner.scrollLeft += width;

    } else {
        carouselInner.scrollLeft -= width;
    }
}

// Resize carousel 

function ResizeCarousel() {
    const carouselInner = ('.carousel-inner');
    const itemsDiv = ('.track');
    const cardContainer = ('.card-container');
    let carouselInnerWidth = $(carouselInner).width();
    let cardContainerWidth = 0;

    $(itemsDiv).each(function () {
        let cardNumbers = $(this).find(cardContainer).length;

        if (bodyWidth >= 1200) {
            cardContainerWidth = carouselInnerWidth / 6;
        }
        else if (bodyWidth >= 992) {
            cardContainerWidth = carouselInnerWidth / 5;
        }
        else if (bodyWidth >= 468) {
            cardContainerWidth = carouselInnerWidth / 3;
        }
        else {
            cardContainerWidth = carouselInnerWidth;
        }
        $(this).css({ 'transform': 'translateX(0px)', 'width': cardContainerWidth * cardNumbers });
        $(this).find(cardContainer).each(function () {
            $(this).outerWidth(cardContainerWidth);
        });
    });

    width = cardContainerWidth;
}

$(document).ready(function () {
    ResizeCarousel();
    $(window).resize(function () {
        ResizeCarousel();
    });
});

