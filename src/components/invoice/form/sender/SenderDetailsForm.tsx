import InvoiceContext from '@/context/invoice/InvoiceContext';
import { senderSchema } from '@/validationsSchema/InvoiceValidationSchema';
import { Formik, Field, Form } from 'formik';
import React, { useContext } from 'react';

type ISenderDetailsFormProps = {
	setPartyInfo: React.Dispatch<
		React.SetStateAction<'sender' | 'reciever' | null>
	>;
};

function SenderDetailsForm({ setPartyInfo }: ISenderDetailsFormProps) {
	const { handleSenderFormDetails, senderFormData, cancelFormHandler } =
		useContext(InvoiceContext);

	const initialValues = {
		companyName: senderFormData.companyName,
		address: senderFormData.address,
		postalCode: senderFormData.postalCode,
		city: senderFormData.city,
	};

	return (
		<>
			<div className="bg-white px-3 pt-5 pb-2">
				<Formik
					initialValues={initialValues}
					validationSchema={senderSchema}
					enableReinitialize={true}
					onSubmit={(values) => {
						handleSenderFormDetails(values);
					}}>
					{({ handleChange, handleBlur, errors, touched, values }) => (
						<Form>
							<h5 className="font-bold">Sender Information</h5>
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
									Set Sender Data
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}

export default SenderDetailsForm;
