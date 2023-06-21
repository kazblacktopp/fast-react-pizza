import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
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

export const getCart = state => state.cart.cart;

export const getTotalCartQuantity = state =>
	state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = state =>
	state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
