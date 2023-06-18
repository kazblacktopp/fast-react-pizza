import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import ErrorBoundary from './ui/ErrorBoundary';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
	action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';

function App() {
	const router = createBrowserRouter([
		{
			element: <AppLayout />,
			errorElement: <ErrorBoundary />,
			children: [
				{ path: '/', element: <Home /> },
				{ path: '/cart', element: <Cart /> },
				{
					path: '/menu',
					element: <Menu />,
					loader: menuLoader,
					errorElement: <ErrorBoundary />,
				},
				{
					path: '/order/new',
					element: <CreateOrder />,
					action: createOrderAction,
				},
				{
					path: '/order/:orderID',
					element: <Order />,
					loader: orderLoader,
					errorElement: <ErrorBoundary />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

