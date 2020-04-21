import { useRef, useLayoutEffect } from 'react';

// Make sure the dom has loaded
const isBrowser = typeof window !== 'undefined';

function getScrollPosition({ element, useWindow }) {
	// return 0, 0 if not running in the browser
	if (!isBrowser) return { x: 0, y: 0 };

	// Check if scroll pos of specific element or entire page was requested
	const target = element ? element.current : document.body,
		position = target.getBoundingClientRect();

	// allow user to use window.scroll or getClientBoundingRect based on useWindow param
	// Use window.page[X|Y]Offset instead in order to support IE9 and below
	return useWindow
		? { x: window.scrollX, y: window.scrollY }
		: { x: position.left, y: position.top };
}

// useScrollPosition hook
export function useScrollPosition(
	effect,
	deps,
	element,
	useWindow,
	wait
) {
	// useRef acts like state, but without re-rendering the component
	const position = useRef(getScrollPosition({ useWindow }));

	let throttleTimeout = null;

	const cb = () => {
		const currPos = getScrollPosition({ element, useWindow });
		effect({ prevPos: position.current, currPos });
		position.current = currPos;
		throttleTimeout = null;
	};

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (wait) {
				if (throttleTimeout === null) {
					// eslint-disable-next-line
					throttleTimeout = setTimeout(cb, wait);
				}
			} else {
				cb();
			}
		};
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, deps);
}
