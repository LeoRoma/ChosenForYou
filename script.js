import productDataWomens from './data.js';
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
    // getSelectedType(filteredProductTypes);
    // resetProductsList(filteredProductTypes);
})

// function resetProductsList(filteredProductTypes){
//     filteredProductTypes = [];
// }



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

    $('#range-button').click(function () {
        const priceMinInt = parseInt(priceMin);
        const priceMaxInt = parseInt(priceMax);
        const filteredByRangeProducts = productDataWomens.filter(product => {
            const price = parseInt(product.price);
            // console.log(product)
            console.log(priceMin)
            if (priceMinInt <= price && priceMaxInt >= price) {
                return product;
            }
        })
        console.log(filteredByRangeProducts)
        displayProducts(filteredByRangeProducts);
    })
})

const dropdownRangeButton = document.getElementById('dropdown-range-button');
dropdownRangeButton.addEventListener('click', () => {
    document.getElementById('dropdown-range').classList.toggle('show');
})

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

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

const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const $track = $('.track');
const $modal = $('.modal');

$(document).ready(function () {
    $track.delegate('#modal-open', 'click', function () {
        // console.log(i)
        let index = $(this).data('index');
        let currentProduct = productDataWomens[index];
        getCurrentProduct(currentProduct);
        modal.style.display = "block";

    })

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
    $('#modal').html(
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
span.addEventListener('click', () => {
    modal.style.display = "none";
})

$modal.delegate('.close', 'click', function () {
    modal.style.display = "none";
})
