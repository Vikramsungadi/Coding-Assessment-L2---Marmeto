export async function fetchProducts() {
	let products;
	try {
		let res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
		products = await res.json();
	} catch {
		isLoading = false;
		ErrorPage();
	}

	return products.categories;
}
