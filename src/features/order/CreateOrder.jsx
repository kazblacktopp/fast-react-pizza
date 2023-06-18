import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { formatCurrency } from '../../utilities/helpers';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

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
					/>
					<label className="font-medium" htmlFor="priority">
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
					<Button type="primary" disabled={isSubmitting}>
						{isSubmitting ? 'Placing order...' : 'Order Now'}
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

	const newOrder = await createOrder(order);

	return redirect(`/order/${newOrder.id}`);
}
