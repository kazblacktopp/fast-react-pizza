import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';

export default function Cart() {
	return (
		<div>
			<LinkButton
				to="/menu"
				className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
			>
				&larr; Back to menu
			</LinkButton>

			<h2>Your cart, %NAME%</h2>

			<div>
				<Button to="/order/new">Order pizzas</Button>
				<button>Clear cart</button>
			</div>
		</div>
	);
}
