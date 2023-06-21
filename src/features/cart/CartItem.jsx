import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import { removeItem } from './cartSlice';

export default function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;

	const dispatch = useDispatch();

	function handleDeleteItem() {
		dispatch(removeItem(pizzaId));
	}

	return (
		<li className="py-3 sm:flex sm:items-center sm:justify-between">
			<p className="mb-1 sm:mb-0">
				{quantity}&times; {name}
			</p>
			<div className="flex items-center justify-between sm:gap-6">
				<p className="text-sm font-bold">
					{formatCurrency(totalPrice)}
				</p>
				<Button onClick={handleDeleteItem} type="small">
					Delete
				</Button>
			</div>
		</li>
	);
}
