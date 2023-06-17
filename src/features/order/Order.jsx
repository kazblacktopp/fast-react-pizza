import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from '../../utilities/helpers';

const order = {
	id: 'ABCDEF',
	customer: 'Karen',
	phone: '1234567890',
	address: 'Brisbane, Queensland, Australia',
	priority: true,
	estimatedDelivery: '2023-06-17T21:00:00',
	cart: [
		{
			pizzaId: 7,
			name: 'Napoli',
			quantity: 3,
			unitPrice: 16,
			totalPrice: 48,
		},
		{
			pizzaId: 5,
			name: 'Diavola',
			quantity: 2,
			unitPrice: 16,
			totalPrice: 32,
		},
		{
			pizzaId: 3,
			name: 'Romana',
			quantity: 1,
			unitPrice: 15,
			totalPrice: 15,
		},
	],
	position: '-27.000, 153.000',
	orderPrice: 95,
	priorityPrice: 19,
};

export default function Order() {
	const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
		order;

	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div>
			<div>
				<h2>Status</h2>

				<div>
					{priority && <span>Priority</span>}
					<span>{status} order</span>
				</div>
			</div>

			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${deliveryIn} minutes left.`
						: 'Order should have arrived.'}
				</p>
				<p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && (
					<p>Price priority: {formatCurrency(priorityPrice)}</p>
				)}
				<p>
					To pay on delivery:{' '}
					{formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
}
