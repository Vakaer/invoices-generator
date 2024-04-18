import React, { useContext } from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';

interface InvoiceNumberInputProps {
	fieldName: string;
}

function InvoiceNumberField({ fieldName }: InvoiceNumberInputProps) {
	const { updateFormField } = useContext(InvoiceContext);
	const { handleBlur, handleChange } = useFormikContext();

	return (
		<div className="mb-3 d-flex flex-column">
			<Field type="text" name={fieldName}>
				{(fieldProps: FieldProps<string>) => (
					<input
						type="text"
						id={fieldName}
						placeholder="Invoice number"
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

export default InvoiceNumberField;
