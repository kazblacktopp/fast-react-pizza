import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from './Spinner';

export default function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className="grid h-screen grid-rows-[auto_1fr_auto]">
			<Header />
			{isLoading && <Spinner />}

			<div className="overflow-scroll">
				<main className="mx-auto max-w-3xl">
					<Outlet />
				</main>
			</div>
			<CartOverview />
		</div>
	);
}
