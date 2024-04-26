export function createElem(tag, attributes = {}, textContent = '', children = []) {
	const elem = document.createElement(tag);

	// Set attributes
	for (const attr in attributes) {
		elem.setAttribute(attr, attributes[attr]);
	}

	// Set text content
	elem.textContent = textContent;

	// Append children
	children.forEach((child) => {
		!!child && elem.appendChild(child);
	});

	return elem;
}

export function calculateDiscount(current, original) {
	const currentPrice = parseFloat(current);
	const originalPrice = parseFloat(original);

	if (isNaN(currentPrice) || isNaN(originalPrice) || currentPrice > originalPrice) {
		return null;
	}

	const increase = ((originalPrice - currentPrice) / originalPrice) * 100;
	return Math.abs(increase).toFixed(0);
}
export function capitalize(word) {
	if (!word) return null;
	return word.charAt(0).toUpperCase() + word.substring(1);
}

export function changeFavicon(url) {
	let favicon = document.querySelector('link[rel="icon"]');

	// If favicon element doesn't exist, create it
	if (!favicon) {
		favicon = document.createElement('link');
		favicon.rel = 'icon';
		document.head.appendChild(favicon);
	}

	// Set the href attribute to the new favicon URL
	favicon.href = url;
}
