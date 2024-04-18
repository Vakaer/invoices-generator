import React from 'react';

import { ErrorMessage, Field } from 'formik';

// Define props interface for ToolForm component
interface InputFieldProps {
	type: string;
	id: string;
	name: string;
	label: string;
	isCheckbox?: boolean;
	isTextarea?: boolean;
	isSelect?: boolean;
}

// Reusable InputField component
const ToolInputField = ({
	id,
	name,
	label,
	type,
	isCheckbox,
	isTextarea,
}: InputFieldProps) => {
	return (
		<div className="w-48">
			{!isCheckbox && (
				<label htmlFor={id} className="block text-gray fw-500">
					{label}
				</label>
			)}
			{isCheckbox ? (
				<Field type="checkbox" id={id} name={name} className="me-1" />
			) : isTextarea ? (
				<>
					<Field
						as="textarea"
						id={id}
						name={name}
						placeholder={label}
						className="inputField d-block w-100 mt-1"
					/>
					<ErrorMessage
						name={name}
						component="div"
						className="text-danger fst-italic"
					/>
				</>
			) : (
				<>
					<Field
						type={type}
						id={id}
						name={name}
						placeholder={label}
						className="inputField d-block w-100 mt-1"
					/>
					<ErrorMessage
						name={name}
						component="div"
						className="text-danger fst-italic"
					/>
				</>
			)}
			{isCheckbox && <span className="text-gray fw-500">{label}</span>}
		</div>
	);
};

export default ToolInputField;
