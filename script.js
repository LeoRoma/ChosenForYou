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

dropDownType.addEventListener('change', () => {
    let selectedType = document.getElementById('dropdown-type').value;
    console.log(selectedType);
    const filteredProductTypes = products.filter(product => {
        return product.productUrl.includes(selectedType);
    })
    displayProducts(filteredProductTypes);
})





// sort price asc and desc
const priceLowToHigh = productDataWomens.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
const priceHighToLow = priceLowToHigh.reverse();
// console.log(priceLowToHigh, "lowhigh");
// console.log(priceHighToLow, "highlow");


var dropDownPrice = document.getElementById('dropdown-price');

dropDownPrice.addEventListener("change", function () {
    let selectedPrice = document.getElementById('dropdown-price').value;

    switch (selectedPrice) {
        case 'low-high':
            displayProducts(productDataWomens.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
            // document.querySelector(".track").innerHTML = sortedLowToHigh;
            break;
        case 'high-low':
            displayProducts(productDataWomens.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
            break;
    }
})


// filter by price range
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

const dropdownRangeButton = document.getElementById('dropdown-range-button');
dropdownRangeButton.addEventListener('click', () => {
    document.getElementById("myDropdown").classList.toggle("show");
})
  
// search
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', (event) => {
    const input = event.target.value.toString();
    const filteredProducts = productDataWomens.filter(product => {
        const productTitleLowCase = product.productTitle.toLowerCase();
        return productTitleLowCase.includes(input)
    })
    displayProducts(filteredProducts);
});



// pop up