import { productCard, loader } from './ui.js';
import { fetchProducts } from './service.js';
import { capitalize, changeFavicon } from './utils.js';
let isLoading = true;

async function getProductsByCategory(category) {
	try {
		let products = await fetchProducts();
		switch (category) {
			case 'men':
				return products.filter((product) => product.category_name.toLowerCase() === 'men')[0].category_products;
			case 'women':
				return products.filter((product) => product.category_name.toLowerCase() === 'women')[0].category_products;
			case 'kids':
				return products.filter((product) => product.category_name.toLowerCase() === 'kids')[0].category_products;

			default:
				return [];
		}
	} catch {
		isLoading = false;
	}
}

function getSelectedCategory() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	return urlParams.get('category') ?? 'men';
}

function highlightCategoryLink(category) {
	let linkIds = ['men', 'women', 'kids'];

	linkIds.forEach((id) => {
		let element = document.getElementById(id);
		let icon = document.getElementById(`${id}-icon`);

		if (id === category) {
			element.classList.add('highlighted-nav-link');
			icon.classList.contains('hidden') && icon.classList.remove('hidden');
		} else {
			element.classList.contains('highlighted-nav-link') && element.remove('highlighted-nav-link');
			icon.classList.add('hidden');
		}
	});
}

function handleCategorySelection() {
	let productsContainer = document.getElementById('products-container');
	// ADD LOADER WHILE FETCHING
	productsContainer.appendChild(loader());

	// Highlightiing Selected Category
	let selectedCategory = getSelectedCategory();
	highlightCategoryLink(selectedCategory);

	let navContainer = document.getElementById('nav-container');
	// Created fragment to store all product cards to prevent layout shifts and repaintings.
	let fragment = document.createDocumentFragment();

	getProductsByCategory(selectedCategory)
		.then((products) => {
			products.forEach((product) => {
				let productCardElement = productCard(product);
				fragment.appendChild(productCardElement);
			});

			while (productsContainer.firstChild) {
				productsContainer.removeChild(productsContainer.firstChild);
			}
			navContainer.classList.contains('invisible') && navContainer.classList.remove('invisible');
			productsContainer.appendChild(fragment);
			document.title = `Category - ${capitalize(selectedCategory)}`;
			changeFavicon(`/icons/${selectedCategory}-icon.svg`);
		})
		.finally(() => {
			isLoading = false;
		});
}
window.addEventListener('DOMContentLoaded', () => {
	handleCategorySelection();
});
