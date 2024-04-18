import React, { FormEvent, useContext } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';

type AddTaxProps = {};

interface FormValues {
	name: string;
	tax: number;
}

function AddTaxForm() {
	const { addNewTax, cancelFormHandler } = useContext(InvoiceContext);

	const onSubmit = (
		values: FormValues,
		{ setSubmitting }: FormikHelpers<FormValues>,
	) => {
		addNewTax({ name: values.name, tax: values.tax });
		setSubmitting(false);
		cancelFormHandler();
	};

	return (
		<div className="bg-white px-3 tax-form pt-5 pb-2">
			<Formik
				initialValues={{ name: '', tax: 0 }}
				enableReinitialize={true}
				name="AddTax"
				onSubmit={onSubmit}>
				{({ errors, touched, values, handleSubmit, isSubmitting }) => (
					<Form
						onSubmit={(e: FormEvent) => {
							e.preventDefault();
							handleSubmit();
						}}>
						<h5 className="font-bold">Add Tax</h5>
						<div className="border p-3">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<br />
								<Field type="text" name="name" className="item-field col-12" />
								{errors.name && touched.name && (
									<div className="text-red-700">{errors.name}</div>
								)}
							</div>
							<div className="mb-3">
								<label htmlFor="tax">Tax</label>
								<br />
								<Field type="text" name="tax" className="item-field col-12" />
								{errors.tax && touched.tax && (
									<div className="text-red-700">{errors.tax}</div>
								)}
							</div>
						</div>
						<div className="py-3 d-flex gap-3">
							<div className="btn btn-light border" onClick={cancelFormHandler}>
								Cancel
							</div>
							<button className="btn btn-primary">Set Tax</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AddTaxForm;
