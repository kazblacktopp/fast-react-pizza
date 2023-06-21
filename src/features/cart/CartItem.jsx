import { formatCurrency } from '../../utilities/helpers';
import DeleteCartItem from './DeleteCartItem';
import UpdateCartItemQuantity from './UpdateCartItemQuantity';

export default function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;

	return (
		<li className="py-3 sm:flex sm:items-center sm:justify-between">
			<p className="mb-1 sm:mb-0">
				{quantity}&times; {name}
			</p>
			<div className="flex items-center justify-between sm:gap-6">
				<p className="text-sm font-bold">
					{formatCurrency(totalPrice)}
				</p>
				<div className="flex gap-6">
					<UpdateCartItemQuantity
						pizzaId={pizzaId}
						quantity={quantity}
					/>
					<DeleteCartItem pizzaId={pizzaId} />
				</div>
			</div>
		</li>
	);
}
