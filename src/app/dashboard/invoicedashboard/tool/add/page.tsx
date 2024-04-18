import React from 'react';
import dynamic from 'next/dynamic';

import ToolForm from '@/components/dashboard/toolForm/ToolForm';
import Loader from '@/components/ui/Loader';

const ToolFormPage = dynamic(
	() => import('@/components/dashboard/toolForm/ToolForm'),
	{
		loading: () => (
			<div className="d-flex justify-content-center mt-5">
				<Loader />
			</div>
		),
		ssr: false,
	},
);
function page() {
	return <ToolFormPage />;
}

export default page;
