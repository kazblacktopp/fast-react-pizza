import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	// Fake initialState
	cart: [
		{
			pizzaId: 12,
			pizzaName: 'Margherita',
			unitPrice: 12,
			unitQuantity: 2,
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

			cartItem.unitQuantity++;
			cartItem.totalPrice = cartItem.unitQuantity * cartItem.unitPrice;
		},
		decreaseItemQuantity(state, action) {
			// action.payload = pizzaId
			const cartItem = state.cart.find(
				item => item.pizzaId === action.payload,
			);

			cartItem.unitQuantity--;
			cartItem.totalPrice = cartItem.unitQuantity * cartItem.unitPrice;
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
