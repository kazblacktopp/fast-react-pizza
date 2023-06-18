import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

export default function Header() {
	return (
		<header className="bg-yellow-500">
			<Link to="/">Fast Pizza Co.</Link>

			<SearchOrder />

			<p>Karen Blacktopp</p>
		</header>
	);
}
