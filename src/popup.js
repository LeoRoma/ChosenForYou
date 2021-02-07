// pop up

const popup = document.getElementById("popup");
const $track = $('.track');
const $popupCard = $('.popup-card');

$track.delegate('#popup-open', 'click', function () {
    let index = $(this).data('index');
    let currentProduct = productDataWomens[index];
    getCurrentProduct(currentProduct);
    popup.style.display = "block";
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


$('.close').click(function () {
    popup.style.display = "none";
})
























