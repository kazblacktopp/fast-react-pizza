import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

export default function UpdateCartItemQuantity({ pizzaId, quantity }) {
	const dispatch = useDispatch();

	return (
		<div
			className="flex items-center
         justify-center gap-2"
		>
			<Button
				type="round"
				onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
			>
				-
			</Button>
			<span className="text-sm">{quantity}</span>
			<Button
				type="round"
				onClick={() => dispatch(increaseItemQuantity(pizzaId))}
			>
				+
			</Button>
		</div>
	);
}
