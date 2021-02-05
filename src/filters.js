// dropdown filter product types


const filters = {
    type: "",
    search: "",
    sort: "",
    range: { priceMin: 0, priceMax: 60 }
};

function applyFilters() {
    const products = [...productDataWomens];
    const filteredProducts = products.filter(filterByType).filter(filterByRange).filter(filterBySearch);
    // .filter(product => {
    //     const price = parseFloat(product.price);
    //     if (filters.range.priceMin <= price && filters.range.priceMax >= price) {
    //         return product;
    //     }
    // }).filter(product => {
    //     const productTitleLowCase = product.productTitle.toLowerCase();

    //     return productTitleLowCase.includes(filters.search);
    // })

    if (filters.sort === 'low-high') {
        sortPriceLowToHigh(filteredProducts);
    } else {
        sortPriceHighToLow(filteredProducts);
    }

    displayProducts(filteredProducts);
}
// sort(funzione)
// filter(type).filter(range).filter(sort).filter(search)

// Filters
// Type
function filterByType(product) {
    // console.log(product)
    let productUrlSplit = product.productUrl.split('/');
    let type = productUrlSplit[6];
    return type === filters.type || filters.type === "";
}

// Sort
function sortPriceLowToHigh(products) {
    return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}

function sortPriceHighToLow(products) {
    return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
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
$('#range-button').click(function () {
    applyFilters()
})

// search
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

searchBar.addEventListener('keyup', (event) => {
    filters.search = event.target.value.toString();
    console.log(filters.search);
    // applyFilters();
});

searchButton.addEventListener('click', () => {
    console.log("hello")
    applyFilters();
});

// Range Selection
$(() => {
    let priceMin, priceMax;
    $('#price-min').change(function () {
        priceMin = $('#price-min').val().toString();
        filters.range.priceMin = parseFloat(priceMin);
    })
    // console.log(priceMin)
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