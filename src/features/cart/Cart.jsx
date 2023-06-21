import { useDispatch, useSelector } from 'react-redux';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { getCart, clearCart } from './cartSlice';
import { getUsername } from '../user/userSlice';

export default function Cart() {
	const username = useSelector(getUsername);

	const cart = useSelector(getCart);

	const dispatch = useDispatch();

	function handleClearCart() {
		dispatch(clearCart());
	}

	return (
		<div className="px-4 py-3">
			<LinkButton
				to="/menu"
				className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
			>
				&larr; Back to menu
			</LinkButton>

			<h2 className="mt-7 text-xl font-semibold">
				Your cart, {username}
			</h2>

			<ul className="divide-y divide-stone-200 border-b">
				{cart.map(item => (
					<CartItem item={item} key={item.pizzaId} />
				))}
			</ul>

			<div className="mt-6 space-x-2">
				<Button
					disabled={cart.length === 0}
					type="primary"
					to="/order/new"
				>
					Order pizzas
				</Button>

				<Button
					onClick={handleClearCart}
					type="secondary"
					disabled={cart.length === 0}
				>
					Clear cart
				</Button>
			</div>
		</div>
	);
}
