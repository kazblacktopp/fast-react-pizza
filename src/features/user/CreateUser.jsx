import { useState } from 'react';

export default function CreateUser() {
	const [username, setUsername] = useState('');

	return (
		<form>
			<p>Welcome! Please start by telling us your name:</p>

			<input
				type="text"
				placeholder="Your full name"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>

			{username !== '' && (
				<div>
					<button>Start ordering</button>
				</div>
			)}
		</form>
	);
}
