import { Link } from 'react-router-dom';

export default function Cart() {
	return (
		<div>
			<Link to="/menu">&larr; Back to menu</Link>

			<h2>Your cart, %NAME%</h2>

			<div>
				<Link to="/order/new">Order pizzas</Link>
				<button>Clear cart</button>
			</div>
		</div>
	);
}
