'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { toast } from 'react-toastify';
import axios from 'axios';

import SearchForm from '@/components/dashboard/searchForm/SearchForm';
import SelectForm from '@/components/dashboard/selectForm/SelectForm';
import Loader from '@/components/ui/Loader';

import '@/app/dashboard/globalDashboard.scss';
import Modal from '@/components/ui/Modal';
import { getDataApiCall } from '@/utils/getData';

const ListTable = dynamic(
	() => import('@/components/dashboard/listTable/ListTable'),
	{
		loading: () => <div className='d-flex justify-content-center'><Loader/></div>,
		ssr: false,
	},
);

function ListBlogPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [allBlogsList, setAllBlogsList] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [itemToBeDeleted, setItemToBeDeleted] = useState('');

	useEffect(() => {
		setIsLoading(true);
		getBlogTrashedList();
		setIsLoading(false);
	}, []);

	// function use for getAllblog
	const getBlogTrashedList = async () => {
		setIsLoading(true);
		const response = await getDataApiCall('/api/blog/trashed');
		if (response) {
			setAllBlogsList(response.trashedBlogs);
		} else {
			toast.error(`${response.data}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setIsLoading(false);
	};

	// function use for Delete blog

	const deleteBloghandler = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await axios.delete(`/api/blog/${id}`);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getBlogTrashedList();
					toast.success(`${response.data?.data?.message}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
				setShowDeleteModal(false);
				setIsLoading(false);
			} else {
				throw new Error('something went wrong delete blog API');
			}
		} catch (error: any) {
			setIsError(error);
			toast.error(`${error}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setIsLoading(false);
		}
	};

	const restoreBloghandler = async (id: string, isPublished: boolean) => {
		setIsLoading(true);
		try {
			const response = await axios.patch(
				`/api/blog/trashed?id=${id}&isPublish=${isPublished}`,
			);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getBlogTrashedList();
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

	if (isLoading) {
		return <div>Loading ....</div>;
	}

	if (isError) {
		return <div>{isError}</div>;
	}

	return (
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
				<div className="col-12 mt-3 table-responsive">
					<ListTable
						setItemToBeDeleted={setItemToBeDeleted}
						setShowDeleteModal={setShowDeleteModal}
						restoreHandler={restoreBloghandler}
						isTrash={true}
						Data={allBlogsList}
						type="blog"
					/>
				</div>
				<div className="col-12 d-flex justify-content-between py-3 align-items-center">
					<div className="col-4 d-none d-sm-inline">
						<span className="text-gray">Showing 1 to 4 of 4 entries</span>
					</div>
					<div className="col-4 d-none d-sm-flex justify-content-sm-end">
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
									deleteBloghandler(itemToBeDeleted);
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

export default ListBlogPage;
