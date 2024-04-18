import InvoiceContext from '@/context/invoice/InvoiceContext';
import IInvoiceData from '@/types/invoiceTypes';
import { Field, FieldProps, useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { FaBuilding } from 'react-icons/fa';

type SenderInfoProps = {
	showSenderForm(): void;
	isCompanyInfoVisible: boolean;
};

function SenderInfo({ showSenderForm, isCompanyInfoVisible }: SenderInfoProps) {
	const { senderFormData, updateFormField } = useContext(InvoiceContext);
	const { handleBlur } = useFormikContext<IInvoiceData>();
	const iconStyle = {
		width: '30px',
		height: '30px',
	};


	return (
		<div
			onClick={showSenderForm}
			className="p-3 col-xl-6 col-lg-6 sender-info hover-dashed-border">
			<h6>From</h6>
			{senderFormData.companyName ? (
				<div>
					<p className='font-bold'>{senderFormData.companyName}</p>
					<p>{senderFormData.address}</p>
					<p>{senderFormData.city}</p>
					<p>{senderFormData.postalCode}</p>
				</div>
			) : (
				<div className="p-0 m-0 d-flex align-items-center  gap-3 ">
					<FaBuilding style={iconStyle}/>
					<div>
						<div className='fw-bold'>Sender Name</div>
						<div>Sender Contact Details</div>
					</div>
				</div>
			)}
			{isCompanyInfoVisible && (
				<div onClick={(e) => e.stopPropagation()}>
					{/* This div prevents click events from reaching the input field */}
					<div className='mb-3 d-flex flex-column'>
						<Field type='text' name='companyInfo'>
							{(fieldProps: FieldProps<string>) => (
								<input
									type='text'
									id='companyInfo'
									placeholder='Company info'
									className='p-2 rounded-1 generic-input '
									name={fieldProps.field.name}
									value={fieldProps.field.value}
									onChange={(e) => {
										fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value);
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

export default SenderInfo;
