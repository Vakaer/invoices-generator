"use client"
import ListTable from '@/components/dashboard/listTable/ListTable';
import AddMediaForm from '@/components/dashboard/media/AddMediaForm';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MediaMainPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [mediaData, setMediaData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getMediaList();
		setIsLoading(false);
	}, []);

	// function use for getAllblog

	const getMediaList = async () => {
		try {
			const response = await axios.get('/api/media');

			

			if (response && response.status === 200) {
				if (response.data.error) {
					throw new Error(response.data?.data?.error);
				} else {
					setMediaData(response.data?.data?.images);
				}
			} else {
				throw new Error('Failed to fetch blog data');
			}
		} catch (error: any) {

			setIsError(error);
		}
	};

	// function use for Delete blog
	const trashToolhandler = async (id: string, isTrashed: boolean) => {
		setIsLoading(true);
		try {
			const response = await axios.patch(
				`/api/media/trashed?id=${id}&isTrash=${isTrashed}`,
			);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getMediaList();
					toast.success(`${response.data?.data?.message}`, {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
				}
				setIsLoading(false);
			} else {
				toast.error(`${response.data?.data?.data}`, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			setIsLoading(false);
		}
	};

	
	if (isLoading) {
		return <div>Loading ....</div>;
	}

	if (isError) {
		return <div>{isError}</div>;
	}

	return (
		<div className="media-page">
			<AddMediaForm getMediaList={getMediaList} />
			<div className=" mt-4 px-4 mb-5 me-auto ">
				<div className="row bg-white col-10">
					<div className="col-12 py-2">
						<span className="text-gray fw-500">Image Data Table</span>
					</div>
					<div className="col-12 mt-3">
						<ListTable Data={mediaData} trashHandler={trashToolhandler} type="media" />
					</div>
				</div>
			</div>
		</div>
	);
}


export default MediaMainPage;
