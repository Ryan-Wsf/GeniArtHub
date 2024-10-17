const url = window.location.href;
// Obtenir l'URL actuelle de la page.
const string = new URL(url);
// Créer un nouvel objet URL à partir de l'URL actuelle.
const id = string.searchParams.get('id');
// Extraire le paramètre 'id' des paramètres de recherche de l'URL.
// console.log(id);
// Afficher le paramètre 'id' dans la console.
async function afficherPrix(){
// Définir une fonction asynchrone nommée 'afficherPrix'.
    const request = await fetch('http://localhost:3000/api/products/');
    // Envoyer une requête pour récupérer les données des produits depuis l'URL spécifiée.
    const response = await request.json();
    // Analyser les données récupérées en JSON et les stocker dans 'response'.
    const local = JSON.parse(localStorage.getItem("panier"));
    // Récupérer et analyser l'élément 'panier' du stockage local.
    if (local !== null){
        // Vérifier si 'local' n'est pas nul.
        let nbProduct = 0
        // Initialiser 'nbProduct' à 0.
        for (let i = 0; i < local.length; i++){
            // Boucler à travers chaque élément dans 'local'.
            const panier = document.querySelector(".panier");
            // Sélectionner l'élément avec la classe 'panier'.
            const img = local[i].image;
            // Obtenir la propriété image de l'élément actuel.
            const titre = local[i].titre;
            // Obtenir la propriété titre de l'élément actuel.
            const format = local[i].format;
            // Obtenir la propriété format de l'élément actuel.
            const quantite = local[i].quantite;
            // Obtenir la propriété quantite de l'élément actuel.
            const id = local[i].id;
            // Obtenir la propriété id de l'élément actuel.
            nbProduct += parseInt(quantite)
            // Incrémenter 'nbProduct' par la quantité de l'élément actuel.
            const oneProduct = response.find(el => el._id == id)
            // Trouver le produit dans 'response' qui correspond à l'id de l'élément actuel.
            const product = oneProduct.declinaisons.find(el => el.taille == format)
            // Trouver la variante du produit dans 'oneProduct' qui correspond au format de l'élément actuel.
            // Afficher 'oneProduct' dans la console.
            panier.insertAdjacentHTML("afterbegin",
                `<article>
                <img src="${img}" alt="img" class="image_order">
                <h2>${titre}</h2>
                <p>${format}</p>
                <input data-id="${id}" data-format="${product.taille}" data-index="${i}" type="number" class="input_panier" value="${quantite}"></input>
                <p class="price">${product.prix} €</p>
                <button class="supprimer_panier">Supprimer</button>
                </article>
                `)
            // Insérer du HTML pour le produit dans l'élément 'panier'.
        }
        afficherPrixTotal()
        removeQuantityInput()
        const btn_supprimer = document.querySelectorAll(".supprimer_panier");
        // Sélectionner tous les éléments avec la classe 'supprimer_panier'.
        for (let i = 0; i < btn_supprimer.length; i++){
            // Boucler à travers chaque bouton 'supprimer_panier'.
            btn_supprimer[i].addEventListener("click", () => {
                // Ajouter un écouteur d'événement de clic à chaque bouton 'supprimer_panier'.
                local.splice(i, 1)
                // Supprimer l'élément actuel de 'local'.
                localStorage.setItem("panier", JSON.stringify(local));
                // Mettre à jour l'élément 'panier' dans le stockage local avec le 'local' modifié.
                const articles = document.querySelectorAll('.panier article')
                articles[i].remove();
                afficherPrixTotal()
            })
        }        
    }
}
afficherPrix();

function afficherPrixTotal(){
    const articles_dom = document.querySelectorAll('.panier article')
    let totalPrice = 0
    let totalQuantity = 0
    articles_dom.forEach(el =>{
        const prix_articles = parseFloat(el.querySelector('.price').textContent)
        const quantite_articles = parseFloat(el.querySelector('.input_panier').value)
        totalPrice += quantite_articles * prix_articles
        totalQuantity += quantite_articles 

    })
    let totalPriceFixed = totalPrice.toFixed(2)
    const articles_total = document.querySelector('.para_total');
    articles_total.innerHTML =
        `<span id="span_articles">${totalQuantity} articles</span>
        <span id="span_montant">pour ${totalPriceFixed} €</span>`;
}

function removeQuantityInput(){
    const local = JSON.parse(localStorage.getItem("panier"));
    const input_panier = document.querySelectorAll('.input_panier')

    input_panier.forEach(el => {
        el.addEventListener("change", (e) => {
            const quantite_articles = parseFloat(el.value)
            // Avant de mettre à jour sur le HTML, il faut vérifier que la nouvelle quantité ne dépasse pas 100 ou ne descend pas en dessous de 1
            if(quantite_articles > 100){
                e.target.value = 100
                return // Pour éviter que le reste soit exécuté
            }
            if (quantite_articles < 1){
                e.target.value = 1
                return
            }
            // On récupère la quantité du localStorage et on l'affiche à nouveau dans le value
            // Si on arrive ici, la quantité est bonne
            // On met à jour directement le DOM
            el.innerHTML = `${quantite_articles}`
            local[e.target.dataset.index].quantite = quantite_articles
            // On enregistre à nouveau le localStorage
            localStorage.setItem("panier", JSON.stringify(local));
            afficherPrixTotal()
        });

    })

}

// Afin de valider la commande, sur la route /order, les informations que le serveur doit recevoir doivent être :
// - Un objet contact avec les champs firstName, lastName, address, city et email
// - Le tableau contient un array de strings avec les ID des œuvres

// Pour cela, il faut récupérer les informations du formulaire et les ID des œuvres dans le panier.
// Pour récupérer les informations du formulaire, il faut écouter le clic sur le bouton de validation du formulaire et récupérer les valeurs des champs du formulaire.
function formRetrieval(){
    const submit = document.querySelector('#submit')
    submit.addEventListener("click", (e) => {
        const nom = $_POST('name')
        const prenom = $_POST('firstName')
        const adresse = $_POST('address')
        const ville = $_POST('city')
        const email = $_POST('email')
        const contact = {
            nom,
            prenom,
            adresse,
            ville,
            email
        }
        console.log(contact)
        e.preventDefault()
    })
}
formRetrieval()
// Pour récupérer les ID des œuvres, il faut parcourir le panier et récupérer les ID des œuvres.

// Une fois que vous avez les informations du formulaire et les ID des œuvres, vous pouvez les envoyer au serveur.

