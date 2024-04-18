'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import axios from 'axios';

import ContentFields from './ContentFields';
import ToolInputField from './ToolInputField';
import useLanguageData from '@/cutomHooks/useLanguageData';
import { useRouter } from 'next/navigation';
import { getDataApiCall } from '@/utils/getData';
import { ITool } from '@/types/toolTypes';
import Loader from '@/components/ui/Loader';

import '@/app/dashboard/globalDashboard.scss';
import { createSlug } from '@/utils/createSlug';

// Define validation schema using Yup
const toolValidationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	metaTitle: yup.string().required('Meta Title is required'),
	metaDescription: yup.string().required('Meta Description is required'),
	slug: yup.string().required('Slug is required'),
});

// Define the props for the ToolForm component
type ToolFormProps = {
	Id?: any;
	toolsList?: ITool;
};

// Main ToolForm component
function ToolForm({ Id, toolsList }: ToolFormProps) {
	// Destructure variables from React Router
	const { push } = useRouter();

	// State variables
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | string>(null);
	const [allToolsList, setAllToolsList] = useState([]);
	const toolSlug = createSlug(toolsList?.slug)
	
	// Custom hook to fetch language data
	const { allLanguages, englishLanguage } = useLanguageData();

	// Fetch all tools on component mount
	useEffect(() => {
		setIsLoading(true);
		getAllTools();
		setIsLoading(false);
	}, []);

	// Fetch all tools function
	const getAllTools = async () => {
		const response = await getDataApiCall('/api/tool');
		if (response) {
			setAllToolsList(response.tools);
		}
	};

	// Add or update tool function
	const addOrUpdateToolhandler = async (data: any, isUpdate: boolean) => {

		const { ogTags, tcTags, schemaTags, slug } = data;

		// Parse JSON strings to objects
		const ogTagsParse = ogTags ? await JSON.parse(data.ogTags) : null;
		const tcTagsParse = tcTags ? await JSON.parse(data.tcTags) : null;
		const schemaTagsParse = schemaTags
			? await JSON.parse(data.schemaTags)
			: null;
		const toolSlug = createSlug(slug);

		// Create a tool data object
		const toolData: ITool = {
			...data,
			slug: toolSlug,
			ogTags: ogTagsParse,
			tcTags: tcTagsParse,
			schemaTags: schemaTagsParse,
		};

		// Update loading state
		setIsLoading(true);

		try {
			// Make API request to add or update tool
			const response = isUpdate
				? await axios.patch(`/api/tool/${Id && Id}`, toolData)
				: await axios.post('/api/tool', toolData);

			// Check response status
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					toast.success(
						isUpdate ? 'Successfully Updated!' : 'Successfully Added!',
						{
							position: toast.POSITION.TOP_RIGHT,
						},
					);
					push('/dashboard/invoicedashboard/tool/list');
				}
			} else {
				setIsLoading(false);
				throw new Error(
					`Something went wrong ${isUpdate ? 'Update' : 'Add'} blog API`,
				);
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsLoading(false);
		}
	};

	return (
		<div className="container mt-4 px-4">
			<div className="row bg-white">
				<div className="col-12 fw-bold py-3">{Id ? 'Update' : 'Add'} Tool:</div>
				<div className="col-12 d-flex">
					{/* Formik form for tool data */}
					<Formik
						initialValues={{
							// Set initial values based on whether it's an update
							name: Id ? toolsList?.name : '',
							metaTitle: Id ? toolsList?.metaTitle : '',
							metaDescription: Id ? toolsList?.metaDescription : '',
							slug: Id ? toolSlug : '',
							ogTags: Id ? toolsList?.ogTags : '',
							tcTags: Id ? toolsList?.tcTags : '',
							schemaTags: Id ? toolsList?.schemaTags : '',
							isIndex: Id ? toolsList?.isIndex : false,
							isPublished: Id ? toolsList?.isPublished : false,
							isItHome: Id ? toolsList?.isItHome : false,
							parentId: Id ? toolsList?.parentId : '',
							langaugeId: Id ? toolsList?.langaugeId : englishLanguage.id,
							content: Id
								? toolsList?.content
								: { key: '', value: '', textFieldType: '' },
						}}
						enableReinitialize={true}
						validationSchema={toolValidationSchema}
						onSubmit={(values) => {
							if (Id) {
								addOrUpdateToolhandler(values, true);
							} else {
								addOrUpdateToolhandler(values, false);
							}
						}}>
						{({ values, setFieldValue }) => (
							<Form className="col-12">
								{/* Tool name and slug fields */}
								<div className="d-flex justify-content-between">
									<ToolInputField
										id="name"
										name="name"
										label="Tool Name"
										type="text"
									/>
									<ToolInputField
										id="slug"
										name="slug"
										label="Tool Slug"
										type="text"
									/>
								</div>

								{/* Checkbox fields */}
								<div className="w-50 d-flex mt-4">
									<ToolInputField
										id="isItHome"
										label="is it Home?"
										name="isItHome"
										type="checkbox"
										isCheckbox
									/>
									<ToolInputField
										id="isIndex"
										label="is it Index?"
										name="isIndex"
										type="checkbox"
										isCheckbox
									/>
									<ToolInputField
										id="isPublished"
										label="is it Published?"
										name="isPublished"
										type="checkbox"
										isCheckbox
									/>
								</div>

								{/* Meta title and meta description fields */}
								<div className="d-flex justify-content-between mt-4">
									<ToolInputField
										id="metaTitle"
										name="metaTitle"
										label="Meta Title"
										type="text"
									/>
									<ToolInputField
										type="textarea"
										id="metaDescription"
										name="metaDescription"
										label="Meta Description"
										isTextarea
									/>
								</div>

								{/* OG tags and TC tags fields */}
								<div className="d-flex justify-content-between mt-4">
									<ToolInputField
										id="ogTags"
										name="ogTags"
										label="OG Tags"
										type="textarea"
										isTextarea
									/>
									<ToolInputField
										id="tcTags"
										name="tcTags"
										label="TC Tags"
										type="textarea"
										isTextarea
									/>
								</div>

								{/* Schema tags field */}
								<div className="d-flex justify-content-between mt-4">
									<ToolInputField
										type="textarea"
										id="schemaTags"
										name="schemaTags"
										label="Schema Tags"
										isTextarea
									/>
								</div>

								{/* Language and parent fields */}
								<div className="d-flex justify-content-between mt-4">
									<div className="w-48">
										<label
											htmlFor="language"
											className="block text-gray fw-500">
											Language
										</label>
										<Field
											as="select"
											name="langaugeId"
											id="langaugeId"
											onChange={(e: ChangeEvent<HTMLSelectElement>) => {
												setFieldValue(
													'langaugeId',
													e.target.value || englishLanguage?.id,
												);
											}}
											className="inputField block w-100 text-gray mt-1 select-dropdown">
											<option value="" disabled hidden>
												Select Language
											</option>
											{allLanguages &&
												allLanguages.map((value, index) => {
													const { id, name } = value;

													return (
														<option value={id} key={index}>
															{name}
														</option>
													);
												})}
										</Field>
									</div>
									<div className="w-48">
										<label htmlFor="parent" className="block text-gray fw-500">
											Parent
										</label>
										<Field
											as="select"
											name="parent"
											id="parent"
											className="inputField block w-100 text-gray mt-1 select-dropdown">
											<option value="" disabled hidden>
												This is parent
											</option>
											{allToolsList.length > 0 &&
												allToolsList.map((value, index) => {
													const { id, name } = value;

													return (
														<option value={id} key={index}>
															{name}
														</option>
													);
												})}
										</Field>
									</div>
								</div>

								{/* Content fields */}
								<div className="col-12 fw-bold py-3">Content:</div>
								<ContentFields contentData={toolsList?.content} />

								{/* Submit button */}
								<div className="col-12 py-3 d-flex justify-content-end">
									<button type="submit" className="submit-button text-white">
										Submit
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default ToolForm;
