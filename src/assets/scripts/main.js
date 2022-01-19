function changementAffichage() {
	const mosaiqueBouton = document.querySelector('#btn_mosaique');
	const mosaiqueListe = document.querySelector('#btn_liste');
	const affichageConteneurMosaique = document.querySelector('#container-mosaique');
	const affichageConteneurListe = document.querySelector('#container-liste');
	const lienNavigationVelos = document.querySelector('.lien-1');
	const lienNavigationPatins = document.querySelector('.lien-2');

	mosaiqueBouton.addEventListener('click', afficherMosaique);

	mosaiqueListe.addEventListener('click', afficherListe);

	function afficherMosaique() {

			affichageConteneurMosaique.style.display = 'initial';
			affichageConteneurListe.style.display = 'none';

			lienNavigationVelos.setAttribute('href', '#velos');
			lienNavigationPatins.setAttribute('href', '#patins');

	}

	function afficherListe() {

			if (affichageConteneurListe.classList.contains('d-none')) {

			affichageConteneurListe.classList.remove('d-none');

			}

			affichageConteneurMosaique.style.display = 'none';
			affichageConteneurListe.style.display = 'initial';

			lienNavigationVelos.setAttribute('href', '#velos2');
			lienNavigationPatins.setAttribute('href', '#patins2');
	}
}

function ajoutItemsPanier() {
	const boutonsAcheter = document.querySelectorAll('.acheter');

	boutonsAcheter.forEach(ajoutItems);

	function ajoutItems(item) {
		item.addEventListener('click', function() {

			let prix = item.closest('.le_produit').querySelector('.prix_produit').innerHTML;

			let nomItem = item.closest('.le_produit').querySelector('.nomItem').innerHTML;

			let imageItemSrc = item.closest('.le_produit').querySelector('.imageItem').src;
			let imageItemAlt = item.closest('.le_produit').querySelector('.imageItem').alt;

			let newTR = document.createElement('tr');
			newTR.classList.add('conteneurItem');
		
			let panier = document.querySelector('.produitDuPanier');
		
			newTR.innerHTML = (`<td class="d-flex flex-column align-items-center">
									<img src="${imageItemSrc}" class="card-img-top" alt="${imageItemAlt}">
								</td>
								<td class="produit-desc">
									${nomItem}
								</td>
								<td class="produit-prix-panier" data-prix="${prix}">
									<p>${prix}$<p>
								</td>
								<td>
									<div class="d-flex flex-column">
										<button type="button" class="btn btn-danger my-1 item_panier">
											<i class="bi bi-cart-x"></i>
										</button>
									</div>
								</td>`);

			panier.append(newTR);

			afficherNombreItem();

		})
	}

}

function supprimerItemPanier() {
	let boutonPanier = document.querySelector('.panier');

	boutonPanier.addEventListener('click', afficherElementASupprimer);

	function afficherElementASupprimer() {
		
		const boutonsEnleverItemPanier = document.querySelectorAll('.item_panier');

		boutonsEnleverItemPanier.forEach(supprimerItem);

		function supprimerItem(item) {
			item.addEventListener('click', function() {
				item.closest('.conteneurItem').remove();
				calculerTotalPrix();

				afficherNombreItem();
			})
		}
	}
}

function calculerTotal() {
	const boutonPanier = document.querySelector('.panier');

	boutonPanier.addEventListener('click', calculerTotalPrix);
}

function calculerTotalPrix() {
	let prixItems = document.querySelectorAll('.produit-prix-panier');
	let PrixTotalPanier = document.querySelector('.le-prix-total');
	let total = 0;

	for (let i = 0; i < prixItems.length; i++) {
		total = total + parseFloat(prixItems[i].dataset.prix);
	}

	PrixTotalPanier.innerHTML = `Prix: ${total.toFixed(2)}$`;
}

function afficherNombreItem() {
	let iconeNombreItems = document.querySelector('.panierIcone');
	let boutonsEnleverItemPanier = document.querySelectorAll('.item_panier');
	iconeNombreItems.innerHTML = boutonsEnleverItemPanier.length;

	if (iconeNombreItems.innerHTML < 1) {
		iconeNombreItems.style.display = 'none';
	} else {
		iconeNombreItems.style.display = 'initial';
	}
}

afficherNombreItem();
calculerTotal();
ajoutItemsPanier();
supprimerItemPanier();
changementAffichage();