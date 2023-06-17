import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';
import Order from './features/order/Order';

function App() {
	const router = createBrowserRouter([
		{
			element: <AppLayout />,
			children: [
				{ path: '/', element: <Home /> },
				{ path: '/cart', element: <Cart /> },
				{ path: '/menu', element: <Menu /> },
				{ path: '/order/new', element: <CreateOrder /> },
				{ path: '/order/:orderID', element: <Order /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

