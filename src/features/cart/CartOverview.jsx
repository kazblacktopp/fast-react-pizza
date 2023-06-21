import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

export default function CartOverview() {
	const cartQuantity = useSelector(getTotalCartQuantity);

	const cartTotal = useSelector(getTotalCartPrice);

	if (!cartTotal) return null;

	return (
		<div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
			<p className="space-x-4 font-semibold uppercase text-stone-300 sm:space-x-6">
				<span>{cartQuantity} pizzas</span>
				<span>{formatCurrency(cartTotal)}</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}
