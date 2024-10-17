/**
 * This function is used to call other functions
 */
async function init(){
    const datas = await getAPI()
    afficherOeuvres(datas);
}
init();
/**
 * This function calls the API and returns a response
 * @returns {Promise} returns datas from API
 */
async function getAPI(){
    const response = await fetch('http://localhost:3000/api/products/');
    return await response.json();
}

/**
 * this function retrieves data from an array and displays
 * @param {Array} datas - contain all artworks get from API
 */
function afficherOeuvres(datas) {
    try {
        for (let data of datas) {
            const products = document.querySelector(".products");
            const img = data.image;
            const shorttitle = data.shorttitle;
            const id = data._id;
            products.insertAdjacentHTML("beforeend",
                `<article>
                <img src=${img} alt="${shorttitle}">
                <a href="product.html?id=${id}">Buy ${shorttitle}</a>
                </article>`);
        }
    } catch (error) {
        console.log("Erreur : " + error);
    }
};

module.export = {
    init,
    getAPI,
    afficherOeuvres
};