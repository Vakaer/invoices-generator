'use client';
import { getAllImages, saveNewImage } from '@/services/imagesServices';
import axios from 'axios';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	mediaUrl: Yup.mixed()
		.required('Media file is required')
		.test('file-type', 'Invalid file type', (value) => {
			if (value instanceof File) {
				const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

				return acceptedTypes.includes(value.type);
			}

			return false;
		}),
});
type AddMediaFormProps = {
	getMediaList: () => Promise<void>
}
function AddMediaForm({getMediaList}:AddMediaFormProps) {
	const [mediaFile, setMediaFile] = useState<any>()

	// useEffect(() => {

	// }, [mediaFile])

	async function addMediaHandler() {
		if (mediaFile) {
			const formData = new FormData();
			formData.append('file', mediaFile);
			console.log(formData)
			try {
				// Make the API call to post the image
				if (mediaFile) {

					const response = await axios.post('/api/media', formData);

					// Check the API response and show appropriate messages
					if (response && response.status === 200) {
						toast.success('Media added successfully', {
							position: toast.POSITION.TOP_RIGHT,
						});
						setMediaFile(null)
					} else {
						toast.error('Failed to add media', {
							position: toast.POSITION.TOP_RIGHT,
						});
					}
				}
			} catch (error) {
				console.error('Error adding media:', error);
				toast.error('An error occurred while adding media', {
					position: toast.POSITION.TOP_RIGHT,
				});
			}	
			getMediaList();
		}
	}

	return (
		<Formik
			initialValues={{
				mediaUrl: null,
			}}
			validationSchema={validationSchema}
			onSubmit={async (values, { resetForm }) => {
				addMediaHandler();
				resetForm();

			}}>
			{({ values, handleChange }) => {
				return (
					<Form>
						<div className="col-5 bg-white py-2 px-5 my-5 ms-2 ">
							<h5 className="mt-3 mb-4 fw-semibold ">Add Media:</h5>
							<div>
								<label htmlFor="basic-url" className="form-label text-gray">
									Feature Image
								</label>
								<div className="input-group mb-3">
									<Field
										type="file"
										name="mediaUrl"
										onChange={handleChange}>
										{(fieldProps: FieldProps<string>) => (
											<input
												type="file"
												accept=".jpg, .jpeg, .png, .webp"
												className="form-control"
												id="basic-url"
												aria-describedby="basic-addon3"
												onChange={(e) => {
													const selectedFile: any = e.currentTarget.files?.[0]; // Check for nullability
													
													if (selectedFile) {
														setMediaFile(selectedFile);
														fieldProps.form.setFieldValue(fieldProps.field.name, selectedFile);
													}
												}}
											/>
										)}
									</Field>
								</div>
								<p className="text-danger p-0 m-0">
									<ErrorMessage name="mediaUrl" />
								</p>
							</div>
							<div className="d-flex justify-content-end my-3 ">
								<button className="btn btn-purple rounded-0">Submit</button>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}

export default AddMediaForm;
