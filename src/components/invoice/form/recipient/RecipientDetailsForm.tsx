import React, { useContext } from 'react';

import { Formik, Form, Field } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import { recipientSchema } from '@/validationsSchema/InvoiceValidationSchema';

type IRecepientFormProps = {
	setPartyInfo: React.Dispatch<
		React.SetStateAction<'sender' | 'reciever' | null>
	>;
};

function RecipientDetailsForm({ setPartyInfo }: IRecepientFormProps) {
	const { handleRecipientFormDetails, recipientFormData, cancelFormHandler } =
		useContext(InvoiceContext);

	const initialValues = {
		companyName: recipientFormData.companyName,
		address: recipientFormData.address,
		postalCode: recipientFormData.postalCode,
		city: recipientFormData.city,
	};

	return (
		<>
			<div className="h-auto w-96 bg-white px-3 pt-5 pb-2">
				<Formik
					initialValues={initialValues}
					validationSchema={recipientSchema}
					enableReinitialize={true}
					onSubmit={(values) => {
						handleRecipientFormDetails(values);
					}}>
					{({ handleChange, handleBlur, errors, touched, values }) => (
						<Form>
							<h5 className="font-bold">Recipient Information</h5>
							<div className="border p-3 ">
								<div className="mb-3">
									<label htmlFor="companyName" className="form-label">
										Company Name
									</label>
									<Field
										type="text"
										name="companyName"
										className="border w-full"
									/>
									{errors.companyName && touched.companyName ? (
										<div className="text-danger">{errors.companyName}</div>
									) : null}
								</div>
								<div className="mb-3">
									<label htmlFor="address">Address</label>
									<Field type="text" name="address" className="border w-full" />
									{errors.address && touched.address ? (
										<div className="text-danger">{errors.address}</div>
									) : null}
								</div>
								<div className="mb-3">
									<label htmlFor="postalCode">PostalCode</label>
									<Field
										type="text"
										name="postalCode"
										className="border w-full"
									/>
									{errors.postalCode && touched.postalCode ? (
										<div className="text-danger">{errors.postalCode}</div>
									) : null}
								</div>
								<div className="mb-3">
									<label htmlFor="city">City</label>
									<Field type="text" name="city" className="border w-full" />
									{errors.city && touched.city ? (
										<div className="text-danger">{errors.city}</div>
									) : null}
								</div>
							</div>
							<div className="py-3 d-flex gap-3">
								<div
									className="btn btn-light border "
									onClick={cancelFormHandler}>
									Cancel
								</div>
								<button className="btn btn-primary">
									<i className="bi bi-check-lg me-2"></i>
									Set Recipient Data
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}

export default RecipientDetailsForm;
