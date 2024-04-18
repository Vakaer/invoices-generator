import React from 'react';
import dynamic from 'next/dynamic';

import Loader from '@/components/ui/Loader';

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

function AddBlogPage() {
	return <BlogFormPage />;
}

export default AddBlogPage;
