import productDataWomens from './data.js';
const products = productDataWomens;

const displayProducts = (products) => {
    const htmlString = products
        .map(product => {
            return `
            <div class="card-container">
                <div class="card"> 
                    <div class="card-image"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></div>
                    <div class="card-title">${product.productTitle}</div>
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


// dropdown filter product types

let productTypes = []
for (let i = 0; i < productDataWomens.length; i++) {
    let productUrlSplit = productDataWomens[i].productUrl.split('/');
    let item = productUrlSplit[6];
    if (!productTypes.includes(item)) {
        productTypes.push(item);
    }
}

var dropDownType = document.getElementById('dropdown-type');

var optionsType = "<option value='default'>Select type</option>";

for (let i = 0; i < productTypes.length; i++) {
    let item = productTypes[i].charAt(0).toUpperCase() + productTypes[i].slice(1);
    optionsType += `<option value="${item.toLowerCase()}">${item}</option>`
}
document.getElementById("dropdown-type").innerHTML = optionsType;

dropDownType.addEventListener("change", function () {
    let selectedType = document.getElementById("dropdown-type").value;
    console.log(selectedType);
    const filteredProductTypes = products.filter(product => {
        return product.productUrl.includes(selectedType);
    })
    displayProducts(filteredProductTypes);
})





//filter by price range
const priceLowToHigh = productDataWomens.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
const priceHighToLow = productDataWomens.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
console.log(priceLowToHigh, "lowhigh");
console.log(priceHighToLow, "highlow");


const sortedLowToHigh = productDataWomens.sort((a, b) => parseInt(a.price) - parseInt(b.price)).map(product => {
    return `
    <div class="card-container">
        <div class="card"> 
       
            <div class="card-image"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></div>
            <div class="card-title">${product.productTitle}</div>
            <div class="price">${product.price}</div>
        </div>
    </div>
`
}).join(" ");

const sortedHighToLow = productDataWomens.sort((a, b) => parseInt(b.price) - parseInt(a.price)).map(product => {
    return `
    <div class="card-container">
        <div class="card"> 
       
            <div class="card-image"><img src="${product.imageSrc}" width="200" height="200" style="border-radius=15%;"/></div>
            <div class="card-title">${product.productTitle}</div>
            <div class="price">${product.price}</div>
        </div>
    </div>
`
}).join(" ");

var dropDownPrice = document.getElementById('dropdown-price');

dropDownPrice.addEventListener("change", function () {
    let selectedPrice = document.getElementById("dropdown-price").value;

    switch (selectedPrice) {
        case "low-high":
            document.querySelector(".track").innerHTML = sortedLowToHigh;
            break;
        case "high-low":
            document.querySelector(".track").innerHTML = sortedHighToLow;
            break;
    }
})


// filter by price range
// create a range slider with two handle
// get the input from the slider
// loop through the product list and create an if statement by passing the two range within eg. £10 - £20
// get the items that are between those range 
// display it on html 

// search
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', function (event) {
    const input = event.target.value.toString();
    const filteredProducts = productDataWomens.filter(product => {
        const productTitleLowCase = product.productTitle.toLowerCase();
        return productTitleLowCase.includes(input)
    })
    displayProducts(filteredProducts);
});

// Range

$(document).ready(function () {
    let priceMin, priceMax;
    $('#price-min').change(function () {
        console.log(typeof $('#price-min').val());
        var number = $('#price-min').val();
        priceMin = $('#price-min').val();
       
    })
    // console.log(priceMin)
    $('#price-max').change(function () {
        priceMax = $('#price-max').val();
        console.log(priceMax);
    })

    $('#range-button').click(function(){
        const priceMinInt = parseInt(priceMin);
        const priceMaxInt = parseInt(priceMax);
        const filteredByRangeProducts = productDataWomens.filter(product => {
            const price = parseInt(product.price);
            // console.log(product)
            console.log(priceMin)
            if(priceMinInt <= price && priceMaxInt >= price){
               return product;
            }
        })
        console.log(filteredByRangeProducts)
        displayProducts(filteredByRangeProducts);
    })
})

// pop up