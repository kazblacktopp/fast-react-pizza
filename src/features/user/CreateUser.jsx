import { useState } from 'react';

export default function CreateUser() {
	const [username, setUsername] = useState('');

	return (
		<form>
			<p className="mb-4 text-sm text-stone-600 md:text-base">
				👋🏽 Welcome! Please start by telling us your name:
			</p>

			<input
				type="text"
				placeholder="Your full name"
				value={username}
				onChange={e => setUsername(e.target.value)}
				className="w-72"
			/>

			{username !== '' && (
				<div>
					<button>Start ordering</button>
				</div>
			)}
		</form>
	);
}
