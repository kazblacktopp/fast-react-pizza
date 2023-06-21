import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { removeItem } from './cartSlice';

export default function DeleteItem({ pizzaId }) {
	const dispatch = useDispatch();

	function handleDeleteItem() {
		dispatch(removeItem(pizzaId));
	}

	return (
		<Button onClick={handleDeleteItem} type="small">
			Delete
		</Button>
	);
}
