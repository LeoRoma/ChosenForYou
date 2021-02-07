const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

const indicatorParents = document.querySelector('.nav ul');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

const setNextButtonHide = function (products) {
    console.log(products.length)
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




// Touch carousel 

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

function slideShow() {
    if (change > 0) {
        carouselInner.scrollLeft += width;
    } else {
        carouselInner.scrollLeft -= width;
    }
}





// Resize carousel 




$(document).ready(function () {
    var itemsMainDiv = ('.carousel-inner');
    var itemsDiv = ('.track');
    var itemWidth = "";

    ResCarouselSize();

    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.card-container');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "carousel-inner" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                console.log(incno)
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
    }

});

