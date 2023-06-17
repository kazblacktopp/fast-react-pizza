import { Link } from 'react-router-dom';

export default function CartOverview() {
	return (
		<div>
			<p>
				<span>3 pizzas</span>
				<span>$23.45</span>
			</p>
			<Link to="/cart">Open cart &rarr;</Link>
		</div>
	);
}
