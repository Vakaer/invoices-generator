'use client';
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import axios from 'axios';

import SearchForm from '@/components/dashboard/searchForm/SearchForm';
import SelectForm from '@/components/dashboard/selectForm/SelectForm';
import ListTable from '@/components/dashboard/listTable/ListTable';

import '@/app/dashboard/globalDashboard.scss';
import { getDataApiCall } from '@/utils/getData';
import { useRouter } from 'next/router';
import Loader from '@/components/ui/Loader';
import Modal from '@/components/ui/Modal';

function Page() {
	// const { pathname } = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [allToolsList, setAllToolsList] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [itemToBeDeleted, setItemToBeDeleted] = useState('');

	useEffect(() => {
		setIsLoading(true);
		getAllTrashedTools();
		setIsLoading(false);
	}, []);

	// function use for getAllblog
	
	const getAllTrashedTools = async () => {
		setIsLoading(true);
		const response = await getDataApiCall('/api/tool/trashed');
		if (response) {
			setAllToolsList(response.trashedTools);
		} else {
			toast.error(`${response.data}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setIsLoading(false);
	};


	// function use for Delete blog

	const restoreToolHandler = async (id: string, isPublished: boolean) => {
		try {
			const response = await axios.patch(
				`/api/tool/trashed?id=${id}&isPublish=${isPublished}`,
			);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getAllTrashedTools();
					toast.success(`${response.data?.data?.message}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
				setIsLoading(false);
			} else {
				toast.error(`${response.data?.data?.data}`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsLoading(false);
		}
	};

	const deleteToolHandler = async (id: string) => {
		try {
			const response = await axios.delete(`/api/tool/${id}`);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getAllTrashedTools();
					toast.success(`${response.data?.data?.message}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
				setShowDeleteModal(false);
				setIsLoading(false);
			} else {
				toast.error(`${response.data?.data?.data}`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsLoading(false);
		}
	};
	if (isError) {
		return <div>{isError}</div>;
	}

	return (
		<>
			<div className="container mt-4 px-4">
				<div className="row bg-white">
					<div className="col-12 py-2">
						<span className="text-gray fw-500">Blog Data Table</span>
					</div>
					<div className="col-12 d-flex justify-content-sm-between mt-2">
						<div className="col-4 d-none d-sm-inline">
							<span className="col-2 text-gray me-1">Show</span>
							<SelectForm />
							<span className="col-2 text-gray ms-1">entries</span>
						</div>
						<div className="col-12 col-sm-4 d-flex justify-content-sm-end">
							<div>
								<SearchForm />
							</div>
						</div>
					</div>
					<div className="col-12 mt-3">
						{isLoading ? (
							<Loader />
						) : (
							<ListTable
								setShowDeleteModal={setShowDeleteModal}
								setItemToBeDeleted={setItemToBeDeleted}
								Data={allToolsList}
								restoreHandler={restoreToolHandler}
								type="tool"
								isTrash={true}
							/>
						)}
					</div>
					<div className="col-12 d-flex justify-content-between py-3 align-items-center">
						<div className="col-4">
							<span className="text-gray">Showing 1 to 4 of 4 entries</span>
						</div>
						<div className="col-4 d-flex justify-content-end">
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li className="page-item">
										<a className="page-link text-gray" href="#">
											Previous
										</a>
									</li>
									<li className="page-item">
										<a className="page-link text-white bg-blueviolet" href="#">
											1
										</a>
									</li>
									<li className="page-item">
										<a className="page-link text-gray" href="#">
											Next
										</a>
									</li>
								</ul>
							</nav>
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
										deleteToolHandler(itemToBeDeleted);
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
			{/* <!-- Button trigger modal --> */}
		</>
	);
}

export default Page;
