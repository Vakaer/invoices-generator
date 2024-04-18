import React, { useRef, useEffect } from 'react';

function useOutsideAlerter(props: any, ref: any) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			// if (ref.current && !ref.current.contains(event.target)) {
			// 	if (props.show) {
			// 		props.show(false);
			// 	}
			// }
		}
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

function HandleOutsideClick(props: boolean | any) {
	const wrapperRef = useRef(null);
	useOutsideAlerter(props, wrapperRef);

	return <div ref={wrapperRef}>{props.children}</div>;
}
export default HandleOutsideClick;
