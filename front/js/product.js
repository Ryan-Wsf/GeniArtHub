const url = window.location.href;
// Obtenir l'URL actuelle de la page.
const string = new URL(url);
// Créer un nouvel objet URL à partir de l'URL actuelle.
const id = string.searchParams.get('id');
// Extraire le paramètre 'id' des paramètres de recherche de l'URL.
console.log(id);
// Afficher le paramètre 'id' dans la console.
async function afficherProduit(){
// Définir une fonction asynchrone nommée 'afficherProduit'.
    const request = await fetch(`http://localhost:3000/api/products/${id}`);
    // Envoyer une requête pour récupérer les données du produit pour l'id donné.
    try{
        const datas = await request.json();
        // Analyser les données récupérées en JSON et les stocker dans 'datas'.
        const img = document.querySelector(".image_div1");
        // Sélectionner l'élément avec la classe 'image_div1'.
        img.innerHTML = `<img src="${datas.image}" alt="${datas.shorttitle}">`;
        // Définir le contenu HTML interne de 'img' à un élément image avec l'image et le titre court du produit.
        const titleH1 = document.querySelector("h1");
        // Sélectionner le premier élément 'h1'.
        titleH1.innerHTML = datas.titre;
        // Définir le contenu HTML interne de 'titleH1' au titre du produit.
        const description = document.querySelector("p");
        // Sélectionner le premier élément 'p'.
        description.innerHTML = datas.description;
        // Définir le contenu HTML interne de 'description' à la description du produit.
        const buy = document.querySelector(".button-buy");
        // Sélectionner l'élément avec la classe 'button-buy'.
        buy.innerHTML = `Buy ${datas.shorttitle}`;
        // Définir le contenu HTML interne de 'buy' à une chaîne incluant le titre court du produit.
        const titleH2 = document.querySelector("h2");
        // Sélectionner le premier élément 'h2'.
        titleH2.innerHTML = `Description de l’oeuvre : ${datas.titre}`;
        // Définir le contenu HTML interne de 'titleH2' à une chaîne incluant le titre du produit.
        const input_quantity = document.getElementById("quantity");
        // Sélectionner l'élément avec l'id 'quantity'.
        input_quantity.addEventListener('input', (event) => {
        // Ajouter un écouteur d'événement d'entrée à 'input_quantity'.
            let quantity = parseInt(event.target.value)
            // Analyser la valeur de l'entrée en tant qu'entier et la stocker dans 'quantity'.
            if  (quantity <= 0){
                event.target.value = 1;
                // Si 'quantity' est inférieur ou égal à 0, définir la valeur de l'entrée à 1.
            } else if (quantity > 100){
                event.target.value = 100;
                // Si 'quantity' est supérieur à 100, définir la valeur de l'entrée à 100.
            } else {
                event.target.value = quantity;
                // Sinon, définir la valeur de l'entrée à 'quantity'.
            }
        });
        const price = document.querySelector(".showprice");
        // Sélectionner l'élément avec la classe 'showprice'.
        const select = document.querySelector("#format");
        // Sélectionner l'élément avec l'id 'format'.
        const btn_envoyer_panier = document.querySelector(".button-buy");
        // Sélectionner l'élément avec la classe 'button-buy'.
        price.innerHTML = datas.declinaisons[0].prix + "€";
        // Définir le contenu HTML interne de 'price' au prix de la première variante de produit plus le symbole euro.
        for (let declinaison of datas.declinaisons){
            // Boucler à travers chaque variante dans 'datas.declinaisons'.
            select.innerHTML += `<option value="${declinaison.taille}">${declinaison.taille}</option>`;
            // Ajouter un élément option pour chaque variante à l'élément 'select'.
        }
        select.addEventListener("change", (e)=> {
            // Ajouter un écouteur d'événement de changement à 'select'.
            const formatSelectionne = e.target.value;
            // Obtenir la valeur du format sélectionné depuis la cible de l'événement.
            const prixFormatSelectionne = datas.declinaisons.find(declinaison => declinaison.taille === formatSelectionne).prix;
            // Trouver le prix de la variante de format sélectionnée.
            price.innerHTML = prixFormatSelectionne + "€";
            // Définir le contenu HTML interne de 'price' au prix de la variante de format sélectionnée plus le symbole euro.
        });
        btn_envoyer_panier.addEventListener("click", (e) => {
            // Ajouter un écouteur d'événement de clic à 'btn_envoyer_panier'.
            e.preventDefault();
            // Empêcher l'action par défaut pour l'événement de clic.
            let panier = JSON.parse(localStorage.getItem("panier"));
            // Récupérer et analyser l'élément 'panier' du stockage local.
            if (panier === null){
                panier = [];
                // Si 'panier' est nul, l'initialiser comme un tableau vide.
            }
            const formatSelectionne = select.value;
            // Obtenir la valeur du format sélectionné depuis 'select'.
            const produitAjoute = {
                id: datas._id,
                image: datas.image,
                titre: datas.titre,
                format: formatSelectionne,
                quantite: quantity.value
            };
            // Créer un objet 'produitAjoute' avec les détails du produit, y compris l'id, l'image, le titre, le format et la quantité.
            panier.push(produitAjoute);
            // Ajouter 'produitAjoute' au tableau 'panier'.
            localStorage.setItem("panier", JSON.stringify(panier));
            // Mettre à jour l'élément 'panier' dans le stockage local avec le tableau 'panier' modifié.
            alert("Produit ajouté au panier");
            // Afficher un message d'alerte indiquant que le produit a été ajouté au panier.
        });
    } catch (error){
        console.log("Erreur : " + error);
        // Afficher les erreurs dans la console.
    }
}
afficherProduit();

