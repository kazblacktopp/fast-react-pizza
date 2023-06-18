import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { formatCurrency } from '../../utilities/helpers';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
function isValidPhone(str) {
	return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);
}

const fakeCart = [
	{
		pizzaId: 12,
		name: 'Mediterranean',
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		pizzaId: 6,
		name: 'Vegetale',
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		pizzaId: 11,
		name: 'Spinach and Mushroom',
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

export default function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const formErrors = useActionData();

	const cart = fakeCart;

	return (
		<div>
			<h2>Ready to order? Let's go!</h2>

			<Form method="POST">
				<div>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						name="customer"
						required
					/>
				</div>

				<div>
					<label htmlFor="phoneNumber">Phone number</label>
					<input type="tel" id="phoneNumber" name="phone" required />
					{formErrors?.phone && <p>{formErrors.phone}</p>}
				</div>

				<div>
					<label htmlFor="address">Address</label>
					<input type="text" id="address" name="address" required />
				</div>

				<div>
					<input type="checkbox" name="priority" id="priority" />
					<label htmlFor="priority">
						Want to give your order priority?
						{formatCurrency('19.00')}
					</label>
				</div>

				<div>
					<input
						type="hidden"
						name="cart"
						value={JSON.stringify(cart)}
					/>
					<button
						disabled={isSubmitting}
						className="rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-opacity-50"
					>
						{isSubmitting ? 'Placing order...' : 'Order Now'}
					</button>
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

	const newOrder = await createOrder(order);

	return redirect(`/order/${newOrder.id}`);
}
