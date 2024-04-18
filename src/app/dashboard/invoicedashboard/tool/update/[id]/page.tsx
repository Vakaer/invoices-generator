'use client';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Loader from '@/components/ui/Loader';
import dynamic from 'next/dynamic';

interface PageProps {
	params: {
		id: string;
	};
}

const ToolsFormPage = dynamic(
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

function UpdatePage({ params }: PageProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | string>(null);
	const [allToolsList, setAllToolsList] = useState<any>({});

	useEffect(() => {
		setIsLoading(true);
		getToolById();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getToolById = async () => {
		try {
			const response = await axios.get(`/api/tool/${params.id}`);
			if (response && response.status === 200) {
				if (response.data.error) {
					throw new Error(response.data?.data?.error);
				} else {
					setAllToolsList(response.data?.data.tool);
				}
			}
		} catch (error: any) {
			setIsError(error);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <div>{isError}</div>;
	}

	return <ToolsFormPage toolsList={allToolsList} Id={params.id} />;
}

export default UpdatePage;
