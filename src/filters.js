  
const filters = {
    type: "",
    search: "",
    sort: "",
    range: { priceMin: 0, priceMax: 60 }
};

function applyFilters() {
  // @ts-ignore
    const products = [...productDataWomens];
    const filteredProducts = products.filter(filterByType).filter(filterByRange).filter(filterBySearch);

    if (filters.sort === 'low-high') {
        filteredProducts.sort(sortPriceLowToHigh);
    } else {
        filteredProducts.sort(sortPriceHighToLow);
    }

    displayProducts(filteredProducts);
}

// Filters
// Type
function filterByType(product) {
    let productUrlSplit = product.productUrl.split('/');
    let type = productUrlSplit[6];
    return type === filters.type || filters.type === "";
}

// Sort
function sortPriceLowToHigh(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
}

function sortPriceHighToLow(a, b) {
    return parseFloat(b.price) - parseFloat(a.price);
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
// @ts-ignore
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
// @ts-ignore
$(() => {
    let priceMin, priceMax;
    // @ts-ignore
    $('#price-min').change(function () {
        // @ts-ignore
        priceMin = $('#price-min').val().toString();
        filters.range.priceMin = parseFloat(priceMin);
    })
    // @ts-ignore
    $('#price-max').change(function () {
        // @ts-ignore
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