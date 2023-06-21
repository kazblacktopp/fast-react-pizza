import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
	hasPriority: false,
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

			if (cartItem.quantity === 0) {
				cartSlice.caseReducers.removeItem(state, action);
			}
		},
		clearCart(state) {
			state.cart = [];
		},
		toggleCartPriority(state) {
			state.hasPriority = !state.hasPriority;
		},
	},
});

export const {
	addItem,
	removeItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
	toggleCartPriority,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state.cart.cart;

export const getCartPriority = state => state.cart.hasPriority;

export const getTotalCartQuantity = state =>
	state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = state =>
	state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getItemQuantityById = id => state =>
	state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
