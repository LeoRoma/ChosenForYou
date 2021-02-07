const filters = {
    type: "",
    search: "",
    sort: "",
    range: { priceMin: 0, priceMax: 60 }
};

function applyFilters() {
    const products = [...productDataWomens];
    const filteredProducts = products.filter(filterByType).filter(filterByRange).filter(filterBySearch).sort(sortPrice);

    displayProducts(filteredProducts);
    ResCarouselSize()
}

// Filters
// Type
function filterByType(product) {
    let productUrlSplit = product.productUrl.split('/');
    let type = productUrlSplit[6];
    return type === filters.type || filters.type === "";
}

// Sort
function sortPrice(a, b) {
    if (filters.sort === 'low-high') {
        return parseFloat(a.price) - parseFloat(b.price);
    } else {
        return parseFloat(b.price) - parseFloat(a.price);
    }
}

// Range
function filterByRange(product) {
    const price = parseFloat(product.price);
    if (filters.range.priceMin <= price && filters.range.priceMax >= price) {
        return product;
    }
}

// Search
function filterBySearch(product) {
    const productTitleLowCase = product.productTitle.toLowerCase();
    return productTitleLowCase.includes(filters.search);
}

// Listeners


// Type
// Get options for types
let productTypes = []

for (let i = 0; i < productDataWomens.length; i++) {
    let productUrlSplit = productDataWomens[i].productUrl.split('/');
    let item = productUrlSplit[6];
    if (!productTypes.includes(item)) {
        productTypes.push(item);
    }
}

// Create options for type
let optionsType = "<option value='default'>Select type</option>";

for (let i = 0; i < productTypes.length; i++) {
    let item = productTypes[i].charAt(0).toUpperCase() + productTypes[i].slice(1);
    optionsType += `<option value="${item.toLowerCase()}">${item}</option>`
}
document.getElementById("dropdown-type").innerHTML = optionsType;


// Select Type

const dropDownType = document.getElementById('dropdown-type');
dropDownType.addEventListener('change', () => {
    filters.type = document.getElementById('dropdown-type').value;
    if (filters.type === 'default') {
        filters.type = "";
    }
    applyFilters();
})

// Sort
var dropDownPrice = document.getElementById('dropdown-price');

dropDownPrice.addEventListener("change", function () {
    filters.sort = document.getElementById('dropdown-price').value;
    applyFilters();
})

// Submit range
$('#range-button').click(function () {
    applyFilters()
})

// search
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

searchBar.addEventListener('keyup', (event) => {
    filters.search = event.target.value.toString();
});

searchButton.addEventListener('click', () => {
    applyFilters();
});

// Range Selection
$(() => {
    let priceMin, priceMax;
    $('#price-min').change(function () {
        priceMin = $('#price-min').val().toString();
        filters.range.priceMin = parseFloat(priceMin);
    })
    $('#price-max').change(function () {
        priceMax = $('#price-max').val().toString();
        filters.range.priceMax = parseFloat(priceMax);
    })
})

// Toggle range slider
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