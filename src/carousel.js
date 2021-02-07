const products = [...productDataWomens];

const displayProducts = (products) => {
    if (products.length === 0) {
        const productsNotFound = `<div class="not-found"><h2>Items not found</h2></div>`;
        document.querySelector(".track").innerHTML = productsNotFound;
    }else{
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


const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

const indicatorParents = document.querySelector('.nav ul');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

const setNextButtonHide = function (products) {
    if (products.length <= 5) {
        next.classList.add('hide');
    } else {
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


function ResCarouselSize() {
    const itemsMainDiv = ('.carousel-inner');
    const itemsDiv = ('.track');
    let itemWidth = "";
    let incno = 0;
    const dataItems = ("data-items");
    const itemClass = ('.card-container');
    let id = 0;
    let btnParentSb = '';
    let itemsSplit = '';
    let sampwidth = $(itemsMainDiv).width();
    let bodyWidth = $('body').width();
  
    $(itemsDiv).each(function () {
        id = id + 1;
        let itemNumbers = $(this).find(itemClass).length;
        btnParentSb = $(this).parent().attr(dataItems);
        itemsSplit = btnParentSb.split(',');
        $(this).parent().attr("id", "carousel-inner" + id);


        if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
            itemWidth = sampwidth / incno;
        }
        else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
            itemWidth = sampwidth / incno;
        }
        else if (bodyWidth >= 468) {
            incno = itemsSplit[1];
            itemWidth = sampwidth / incno;
        }
        else {
            incno = itemsSplit[0];
            itemWidth = sampwidth / incno;
        }
        $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
        $(this).find(itemClass).each(function () {
            $(this).outerWidth(itemWidth);
        });

        $(".leftLst").addClass("over");
        $(".rightLst").removeClass("over");

    });
    width = cardContainer[0].offsetWidth;
}

$(document).ready(function () {


    ResCarouselSize();

    $(window).resize(function () {
        ResCarouselSize();
    });

  
});

