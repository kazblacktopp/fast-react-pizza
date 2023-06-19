import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// Fake initialState
	cart: [
		{
			pizzaId: 12,
			name: 'Margherita',
			quantity: 2,
			unitPrice: 12,
			totalPrice: 24,
		},
	],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			// action.payload = item
			state.cart.push(action.payload);
		},
		removeItem(state, action) {
			// action.payload = pizzaId
			state.cart = state.cart.filter(
				item => item.pizzaId !== action.payload,
			);
		},
		increaseItemQuantity(state, action) {
			// action.payload = pizzaId
			const cartItem = state.cart.find(
				item => item.pizzaId === action.payload,
			);

			cartItem.quantity++;
			cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
		},
		decreaseItemQuantity(state, action) {
			// action.payload = pizzaId
			const cartItem = state.cart.find(
				item => item.pizzaId === action.payload,
			);

			cartItem.quantity--;
			cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const {
	addItem,
	removeItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
