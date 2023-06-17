import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

export default function Menu() {
	const menu = useLoaderData();

	console.log(menu);

	return <div>Menu</div>;
}

export async function loader() {
	const menu = await getMenu();
	return menu;
}
