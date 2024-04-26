import { calculateDiscount, createElem } from './utils.js';

export function productCard(product) {
	// Create product card container
	const img = createElem('img', {
		src: product.image,
		alt: product.title,
	});
	const imgWrapper = createElem('div', { class: 'imgWrapper' }, '', [img]);
	const title = createElem('p', { class: 'title line-clamp-1' }, product.title);
	const dot = createElem('span', { class: 'dot' });
	const vendor = createElem('span', { class: 'vendor' }, product.vendor);
	const discountPrice = createElem('span', { class: 'discount-price' }, 'Rs\u00A0', [
		createElem('span', {}, product.price),
	]);
	const price = createElem('span', { class: 'price' }, product.compare_at_price);
	const discount = createElem(
		'span',
		{ class: 'discount' },
		`${calculateDiscount(product.price, product.compare_at_price)}% Off`
	);
	const addToCartBtn = createElem('button', { class: 'primary-btn' }, 'Add to Cart');

	const nameDetails = createElem('div', { class: 'name-details' }, '', [title, dot, vendor]);
	const priceDetails = createElem('div', { class: 'price-details' }, '', [discountPrice, price, discount]);
	const productDetails = createElem('div', { class: 'product-details' }, '', [nameDetails, priceDetails]);
	const badge = createElem('span', { class: 'badge' }, product.badge_text);

	const productCard = createElem('div', { class: 'product-card' }, '', [
		imgWrapper,
		productDetails,
		addToCartBtn,
		product.badge_text ? badge : undefined,
	]);

	return productCard;
}

export function loader() {
	return createElem(
		'div',
		{
			style: 'height:50vh; display:flex; margin-inline:auto; align-items:center; justify-content-center;',
		},
		'',
		[createElem('span', { class: 'loader' }, '')]
	);
}
