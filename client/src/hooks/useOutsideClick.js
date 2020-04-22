// ----------------- Dependencies ------------------

import { useEffect } from 'react';

// ----------------- useOutsideClick ------------------

const useOutsideClick = (ref, cb) => {
	const handleClick = e => {
		if (ref.current && !ref.current.contains(e.target)) {
			cb();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	});
};

export default useOutsideClick;
