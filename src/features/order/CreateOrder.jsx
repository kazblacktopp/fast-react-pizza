import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import {
	clearCart,
	getCart,
	getCartPriority,
	getTotalCartPrice,
	toggleCartPriority,
} from '../cart/cartSlice';
import { formatCurrency } from '../../utilities/helpers';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number
function isValidPhone(str) {
	return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);
}

export default function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const { username } = useSelector(state => state.user);

	const formErrors = useActionData();

	const dispatch = useDispatch();

	const cart = useSelector(getCart);

	const hasPriority = useSelector(getCartPriority);

	const cartTotalPrice = useSelector(getTotalCartPrice);

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="mb-8 text-xl font-semibold">
				Ready to order? Let's go!
			</h2>

			<Form method="POST">
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40" htmlFor="firstName">
						First Name
					</label>
					<input
						className="input grow"
						type="text"
						id="firstName"
						name="customer"
						defaultValue={username}
						autoComplete="off"
						required
					/>
				</div>

				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40" htmlFor="phoneNumber">
						Phone number
					</label>
					<div className="grow">
						<input
							className="input w-full"
							type="tel"
							id="phoneNumber"
							name="phone"
							autoComplete="off"
							required
						/>
						{formErrors?.phone && (
							<p className="mt-2 rounded-md bg-red-100 px-4 py-2 text-xs text-red-700 md:px-6 md:py-3">
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40" htmlFor="address">
						Address
					</label>
					<div className="grow">
						<input
							className="input w-full"
							type="text"
							id="address"
							name="address"
							autoComplete="off"
							required
						/>
					</div>
				</div>

				<div className="mb-12 flex items-center gap-5">
					<input
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
						type="checkbox"
						name="priority"
						id="priority"
						checked={hasPriority}
						onChange={() => dispatch(toggleCartPriority())}
					/>
					<label className="font-medium" htmlFor="priority">
						Want to give your order priority?
						<span className="ml-2 text-sm opacity-70">
							(20% of cart total)
						</span>
					</label>
				</div>

				<div>
					<input
						type="hidden"
						name="cart"
						value={JSON.stringify(cart)}
					/>
					<Button type="primary" disabled={isSubmitting}>
						{isSubmitting
							? 'Placing order...'
							: `Order Now ${formatCurrency(cartTotalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export async function action({ request }) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'on',
	};

	const errors = {};

	if (!isValidPhone(order.phone))
		errors.phone =
			'Please enter your correct phone number. We might need to contact you.';

	if (Object.keys(errors).length > 0) return errors;

	// If no input errors, create new order and redirect
	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
}
