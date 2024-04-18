'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader';
import axios from 'axios';

interface PageProps {
	params: {
		id: string;
	};
}

const BlogFormPage = dynamic(
	() => import('@/components/dashboard/BlogForm/BlogForm'),
	{
		loading: () => (
			<div className="d-flex justify-content-center mt-5">
				<Loader />
			</div>
		),
		ssr: false,
	},
);

function UpdatePage({ params }: PageProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | string>(null);
	const [isBlog, setIsBlog] = useState<any>({});

	useEffect(() => {
		setIsLoading(true);
		getBlogById();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getBlogById = async () => {
		try {
			const response = await axios.get(`/api/blog/${params.id}`);
			if (response && response.status === 200) {
				if (response.data.error) {
					throw new Error(response.data?.data?.error);
				} else {
					setIsBlog(response.data?.data);
				}
			}
		} catch (error: any) {
			setIsError(error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>{isError}</div>;
	}

	return <BlogFormPage isBlog={isBlog.blog} Id={params.id} />;
}

export default UpdatePage;
