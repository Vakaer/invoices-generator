'use client';
import ListTable from '@/components/dashboard/listTable/ListTable';
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';

function TrashedMediaPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [mediaData, setMediaData] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [itemToBeDeleted, setItemToBeDeleted] = useState('');

	useEffect(() => {
		setIsLoading(true);
		getMediaList();
		setIsLoading(false);
	}, []);

	// function use for getAllblog

	const getMediaList = async () => {
		try {
			const response = await axios.get('/api/media/trashed');

			if (response && response.status === 200) {
				if (response.data.error) {
					throw new Error(response.data?.data?.error);
				} else {
					setMediaData(response.data?.data?.images);
				}
			} else {
				throw new Error('Failed to fetch media data');
			}
		} catch (error: any) {
			setIsError(error);
		}
	};

	// function use for Delete blog
	const restoreMediaHandler = async (id: string, isTrashed: boolean) => {
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

	const deleteMediaHandler = async (id: string) => {
		try {
			const response = await axios.delete(`/api/media/${id}`);
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
				setShowDeleteModal(false);
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
		<div>
			<div className=" mt-4 px-4 me-auto ">
				<div className="row bg-white">
					<div className="col-12 py-2">
						<span className="text-gray fw-500">Trashed Images</span>
					</div>

					<div className="col-12 mt-3">
						<ListTable
							Data={mediaData}
							isTrash={true}
							setShowDeleteModal={setShowDeleteModal}
							setItemToBeDeleted={setItemToBeDeleted}
							restoreHandler={restoreMediaHandler}
							type="media"
						/>
					</div>
				</div>
			</div>
			{showDeleteModal && (
				<Modal open={setShowDeleteModal}>
					<div className=" bg-white p-4">
						<p className="py-3 pe-5">
							Are you sure you want to delete this tool?
						</p>
						<div className="d-flex justify-content-end gap-2">
							<button
								className="btn btn-danger"
								onClick={() => {
									deleteMediaHandler(itemToBeDeleted);
								}}>
								Confirm
							</button>
							<button
								className="btn btn-primary"
								onClick={() => setShowDeleteModal(false)}>
								Cancel
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default TrashedMediaPage;
