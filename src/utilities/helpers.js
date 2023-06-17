export function formatCurrency(value) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'AUD',
	}).format(value);
}
