import React from 'react';
import HandleOutsideClick from './HandleOutsideClick';

type OtherComponentProps = {
	open: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
};
function Modal(props: OtherComponentProps) {
	const handleClose = () => {
		props.open(false);
	};

	return (
		<>
			<div
				className="justify-content-center align-items-center d-flex overflow-x-hidden  overflow-y-auto position-fixed "
				style={{ inset: 0, zIndex: 50, outline: 'none' }}>
				<div className="position-relative w-auto my-5 mx-auto ">
					<HandleOutsideClick show={props.open}>
						<div className="border-0 rounded-lg shadow-lg position-relative d-flex flex-column w-full ">
							<div
								className="close-button position-absolute end-0"
								style={{zIndex:"99999"}}
								onClick={handleClose}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="50"
									height="50"
									fill="currentColor"
									className="bi bi-x"
									viewBox="0 0 16 16">
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
								</svg>
							</div>
							{props.children}
						</div>
					</HandleOutsideClick>
				</div>
			</div>
			<div
				className=" position-fixed bg-black "
				style={{ opacity: 0.5, inset: 0, zIndex: 40 }}></div>
		</>
	);
}

export default Modal;
