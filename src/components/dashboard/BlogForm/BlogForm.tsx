'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import '@/app/dashboard/globalDashboard.scss';
import './blogform.scss';
import useLanguageData from '@/cutomHooks/useLanguageData';

type BlogFormProp = {
	Id?: any;
	isBlog?: {
		id: string;
		title: string;
		excerpts: string;
		metaTitle: string;
		metaDescription: string;
		slug: string;
		ogTags: any;
		tcTags: any;
		schemaTags: any;
		isIndex: boolean;
		content: string;
		imageUrl: string;
		readingTime: number;
		isPublished: boolean;
		parentId: any;
		langaugeId: string;
		createdAt: string;
		updatedAt: string;
	};
};

interface IAddBlog {
	title: string;
	excerpts: string;
	metaTitle: string;
	metaDescription: string;
	slug: string;
	ogTags: any;
	tcTags: any;
	schemaTags: any;
	isIndex: boolean;
	content: string;
	featureImageUrl: string;
	readingTime: number;
	isPublished: boolean;
	parentId: any;
	langaugeId: string;
}

const TinyEditor = dynamic(
	() => import('@/components/dashboard/tinyEditor/TinyEditor'),
	{
		ssr: false,
	},
);

function BlogFormPage({ Id, isBlog }: BlogFormProp) {
	const { push } = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | string>(null);
	const [isContent, setIsContent] = useState<string | null>(null);
	const [isAllLanguage, setIsAllLanguage] = useState([]);
	const [isEnglish, setIsEnglish] = useState<any>({});
	const [isAllBlog, setIsAllBlog] = useState([]);

	const { allLanguages, englishLanguage } = useLanguageData();


	useEffect(() => {
		setIsLoading(true);
		getAllblog();
		setIsLoading(false);
	}, []);

	const validationSchema = Yup.object().shape({
		blogtitle: Yup.string().required('blog title is required'),
		excerpts: Yup.string().required('excerpts is required'),
		metatitle: Yup.string().required('meta title is required'),
		metadescription: Yup.string().required('meta description is required'),
		slug: Yup.string().required('slug is required'),
		reading: Yup.string().required('reading time is required'),
	});

	const handleEditorChange = (Content: string) => {
		setIsContent(Content);
	};

	// getAllblog function use for GET All Blog
	const getAllblog = async () => {
		try {
			const response = await axios.get('/api/blog');
			if (response && response.status === 200) {
				if (response.data.error) {
					throw new Error(response.data?.data?.error);
				} else {
					setIsAllBlog(response.data?.data.blogs);
				}
			} else {
				throw new Error('Failed to fetch blog data');
			}
		} catch (error: any) {
			setIsError(error);
		}
	};

	// addAndupdateBloghandler function use for POST Blog and PATCH blog
	const addAndupdateBloghandler = async (
		data: any,
		isUpdate: boolean = false,
	) => {
		const { ogtag, tctag, schemamarkup } = data;

		// use json parse
		const ogTagsParse = ogtag ? await JSON.parse(data.ogtag) : null;
		const tcTagsParse = tctag ? await JSON.parse(data.tctag) : null;
		const schemamarkupParse = schemamarkup
			? await JSON.parse(data.schemamarkup)
			: null;

		const addAndupdateBlogdata: IAddBlog = {
			title: data.blogtitle,
			excerpts: data.excerpts,
			metaTitle: data.metatitle,
			metaDescription: data.metadescription,
			slug: data.slug,
			ogTags: ogTagsParse,
			tcTags: tcTagsParse,
			schemaTags: schemamarkupParse,
			isIndex: data.isindex,
			content: data.isContent,
			featureImageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_lQX9k5LHOUEZWYI8X4Ymrh_3_dyd-9AGg&usqp=CAU',
			readingTime: Number(data.reading),
			isPublished: data.ispublish,
			parentId: data.parent ? data.parent : null,
			langaugeId: data.language ? data.language : isEnglish.id,
		};
		setIsAddLoading(true);
		try {
			const response = isUpdate
				? await axios.patch(`/api/blog/${isBlog?.id}`, addAndupdateBlogdata)
				: await axios.post('/api/blog', addAndupdateBlogdata);

			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
				} else {
					toast.success(
						isUpdate ? 'Successfully Updated!' : 'Successfully Added!',
						{
							position: toast.POSITION.TOP_RIGHT,
						},
					);
					isUpdate &&
						push(
							`/dashboard/invoicedashboard/blog/${addAndupdateBlogdata.isPublished ? 'list' : 'trashed'
							}`,
						);
				}
				setIsAddLoading(false);
			} else {
				throw new Error(
					`Something went wrong ${isUpdate ? 'Update' : 'Add'} blog API`,
				);
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsAddLoading(false);
		}
	};

	if (isLoading) {
		return <div>Loading.....</div>;
	}

	if (isError) {
		return <div>{isError}</div>;
	}

	return (
		<div className="container mt-4 px-4 add-blog-form">
			<div className="row bg-white">
				<div className="col-12 fw-bold py-3">
					{Id ? 'Update Blog:' : 'Add Blog'}
				</div>
				<div className="col-12 d-flex">
					{/*  Formik section */}
					<Formik
						initialValues={{
							blogtitle: Id ? isBlog?.title : "",
							excerpts: Id ? isBlog?.excerpts : "",
							metatitle: Id ? isBlog?.metaTitle : "",
							metadescription: Id ? isBlog?.metaDescription : "",
							slug: Id ? isBlog?.slug : "",
							ogtag: Id ? isBlog?.ogTags : "",
							tctag: Id ? isBlog?.tcTags : "",
							schemamarkup: Id ? isBlog?.schemaTags : "",
							language: Id ? isBlog?.langaugeId : "",
							parent: Id ? isBlog?.parentId : "",
							reading: Id ? isBlog?.readingTime : "",
							isindex: Id ? isBlog?.isIndex : false,
							ispublish: Id ? isBlog?.isPublished : false,
						}}
						validationSchema={validationSchema}
						enableReinitialize={true}
						onSubmit={(values, { resetForm }) => {
							const mergedData = {
								...values,
								isContent,
							};
							if (Id) {
								addAndupdateBloghandler(mergedData, true);
							} else {
								addAndupdateBloghandler(mergedData, false);
							}
							resetForm();
						}}>
						{({ values, setFieldValue }) => {
							return (
								<Form className="col-12">
									<div className="d-flex flex-column flex-sm-row justify-content-between">
										{/* blogtitle field */}
										<div className="w-48">
											<label htmlFor="blogtitle" className="block text-gray fw-500">
												Title
											</label>
											<Field
												type="text"
												id="blogtitle"
												name="blogtitle"
												placeholder="Blog Title"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="blogtitle"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/*end blogtitle field */}
										{/* Excerpts field */}
										<div className="w-48 mt-4 mt-sm-0">
											<label htmlFor="excerpts" className="block text-gray fw-500">
												Excerpts
											</label>
											<Field
												type="text"
												id="excerpts"
												name="excerpts"
												placeholder="Blog Excerpts"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="excerpts"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/* end Excerpts field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* Meta Title field */}
										<div className="w-48">
											<label htmlFor="metatitle" className="block text-gray fw-500">
												Meta Title
											</label>
											<Field
												type="text"
												id="metatitle"
												name="metatitle"
												placeholder="Blog Meta title"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="metatitle"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/* end Meta Title field */}
										{/* Meta description field */}
										<div className="w-48 mt-4 mt-sm-0">
											<label
												htmlFor="metadescription"
												className="block text-gray fw-500">
												Meta Description
											</label>
											<Field
												type="text"
												id="metadescription"
												name="metadescription"
												placeholder="Blog Meta Description"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="metadescription"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/* end Meta description field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* slug field */}
										<div className="w-48">
											<label htmlFor="slug" className="block text-gray fw-500">
												Slug
											</label>
											<Field
												type="text"
												id="slug"
												name="slug"
												placeholder="Blog Slug"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="slug"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/* end slug field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* OG field */}
										<div className="w-48">
											<label htmlFor="ogtag" className="block text-gray fw-500">
												OG Tags
											</label>
											<Field
												as="textarea"
												id="ogtag"
												name="ogtag"
												placeholder="OG tags"
												className="inputField block w-100 mt-1"
											/>
										</div>
										{/* end OG field */}
										{/* TC field */}
										<div className="w-48 mt-4 mt-sm-0">
											<label htmlFor="tctag" className="block text-gray fw-500">
												TC Tags
											</label>
											<Field
												as="textarea"
												id="tctag"
												name="tctag"
												placeholder="TC tags"
												className="inputField block w-100 mt-1"
											/>
										</div>
										{/* end TC field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* schema markup field */}
										<div className="w-48">
											<label
												htmlFor="schemamarkup"
												className="block text-gray fw-500">
												Schema Markup
											</label>
											<Field
												as="textarea"
												id="schemamarkup"
												name="schemamarkup"
												placeholder="Schema markup"
												className="inputField block w-100 mt-1"
											/>
										</div>
										{/* end schema markup field */}
										{/* reading field */}
										<div className="w-48 mt-4 mt-sm-0">
											<label htmlFor="reading" className="block text-gray fw-500">
												Reading
											</label>
											<Field
												type="number"
												id="reading"
												name="reading"
												className="inputField block w-100 mt-1"
											/>
											<ErrorMessage
												name="reading"
												component="div"
												className="text-danger fst-italic"
											/>
										</div>
										{/*end reading field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* language field */}
										<div className="w-48">
											<label htmlFor="language" className="block text-gray fw-500">
												Language
											</label>

											<Field
												as="select"
												name="language"
												id="language"
												onChange={(e: ChangeEvent<HTMLSelectElement>) => {
													setFieldValue(
														'language',
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
										{/* end language field */}
										{/* parent field */}
										<div className="w-48 mt-4 mt-sm-0">
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
												{isAllBlog &&
													isAllBlog.map((value, index) => {
														const { id, title } = value;

														return (
															<option value={id} key={index}>
																{title}
															</option>
														);
													})}
											</Field>
										</div>
										{/* end parent field */}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
										{/* is index checkbox */}
										<div className="w-48">
											<Field type="checkbox" name="isindex" className="me-1" />
											<span className="text-gray fw-500">is Index</span>
										</div>
										{/* end is index checkbox */}
										{/* publish checkbox */}
										<div className="w-48 mt-2 mt-sm-0">
											<Field type="checkbox" name="ispublish" className="me-1" />
											<span className="text-gray fw-500">is Publish</span>
										</div>
										{/* end publish checkbox */}
									</div>
									{/*  Tiny Editor section */}
									<div className="col-12 mt-3">
										<div className="col-12 py-1 text-gray fw-500">Detail</div>
										<div className="col-12">
											<TinyEditor
												content={`${Id ? isBlog?.content : ''}`}
												onContentChange={(newContent) =>
													handleEditorChange(newContent)
												}
											/>
										</div>
									</div>
									{/* end Tiny Editor section */}
									{/* Featured Image URL section */}
									<div className="col-12">
										<div className="col-12 py-4 text-gray fw-500">
											Featured Image URL
										</div>
										<div className="col-12 d-flex flex-column justify-content-end insert-media-form">
											<div className="col-12 insert-media-text bg-blueviolet text-white d-flex justify-content-center">
												<span>Insert Media</span>
											</div>
										</div>
									</div>
									{/*End Featured Image URL section */}
									{/* submit button section */}
									<div className="col-12 py-3 d-flex justify-content-end">
										<button type="submit" className="text-white submit-button">
											{isAddLoading ? 'loading' : 'Submit'}
										</button>
									</div>
									{/*End submit button section */}
								</Form>

							)
						}}
					</Formik>
					{/* End Formik section */}
				</div>
			</div>
		</div>
	);
}

export default BlogFormPage;
