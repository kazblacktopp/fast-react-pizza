import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	function handleSubmit(evt) {
		evt.preventDefault();

		if (!query) return;

		navigate(`/order/${query}`);
		setQuery('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="search"
				placeholder="Search order #"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
		</form>
	);
}
