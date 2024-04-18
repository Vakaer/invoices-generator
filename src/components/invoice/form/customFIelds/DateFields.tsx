import React, { useContext } from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';

interface DateInputProps {
	fieldName: string;
	label: string;
}

function DateField({ fieldName, label }: DateInputProps) {
	const { updateFormField } = useContext(InvoiceContext);
	const { handleBlur, handleChange } = useFormikContext();

	return (
		<div className="mb-3 d-flex gap-2 align-items-center">
			<label htmlFor={fieldName} className="fw-bold">
				{label}
			</label>
			<Field type="date" name={fieldName}>
				{(fieldProps: FieldProps<string>) => (
					<input
						type="date"
						id={fieldName}
						className="p-2 rounded-1 generic-input"
						name={fieldProps.field.name}
						value={fieldProps.field.value}
						onChange={(e) => {
							handleChange(e); // Use Formik's handleChange
							updateFormField(fieldProps.field.name, e.target.value);
						}}
						onBlur={(e) => {
							handleBlur(e); // Use Formik's handleBlur
						}}
					/>
				)}
			</Field>
		</div>
	);
}

export default DateField;
