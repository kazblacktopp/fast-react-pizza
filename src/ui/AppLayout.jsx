import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from './Spinner';

export default function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div>
			<Header />
			{isLoading && <Spinner />}

			<main>
				<Outlet />
			</main>

			<CartOverview />
		</div>
	);
}
