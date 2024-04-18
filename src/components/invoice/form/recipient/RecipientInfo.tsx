import React, { useContext } from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import IInvoiceData from '@/types/invoiceTypes';
import { BsFillPersonFill } from 'react-icons/bs';

type RecipientInfoProps = {
	showRecipientForm(): void;
	isClientInfoVisible: boolean;
};

function RecipientInfo({
	showRecipientForm,
	isClientInfoVisible,
}: RecipientInfoProps) {
	const { recipientFormData, updateFormField } = useContext(InvoiceContext);
	const { values, handleChange, handleBlur } = useFormikContext<IInvoiceData>();
	const iconStyle = {
		width: '30px',
		height: '30px',
	};

	return (
		<div
			onClick={showRecipientForm}
			className="p-3 col-xl-6 col-lg-6 recipient-info hover-dashed-border">
			<h6>To</h6>
			{recipientFormData.companyName ? (
				<div>
					<p className="fw-bold">{recipientFormData.companyName}</p>
					<p>{recipientFormData.address}</p>
					<p>{recipientFormData.city}</p>
					<p>{recipientFormData.postalCode}</p>
				</div>
			) : (
				<div className="p-0 m-0 d-flex gap-3 align-items-center  ">
					<BsFillPersonFill style={iconStyle} />
					<div>
						<div className="fw-bold">Recipient Name</div>
						<div>Recipient Contact Details</div>
					</div>
				</div>
			)}
			{isClientInfoVisible && (
				<div onClick={(e) => e.stopPropagation()}>
					{/* This div prevents click events from reaching the input field */}

					<div className="mb-3 d-flex flex-column">
						<Field type="text" name="clientInfo">
							{(fieldProps: FieldProps<string>) => (
								<input
									type="text"
									id="clientInfo"
									placeholder="Client info"
									className="p-2 rounded-1 generic-input "
									name={fieldProps.field.name}
									value={fieldProps.field.value}
									onChange={(e) => {
										fieldProps.form.setFieldValue(
											fieldProps.field.name,
											e.target.value,
										);
										updateFormField(fieldProps.field.name, e.target.value);
									}}
									onBlur={handleBlur}
								/>
							)}
						</Field>
					</div>
				</div>
			)}
		</div>
	);
}

export default RecipientInfo;
