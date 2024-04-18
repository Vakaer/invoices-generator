'use client';
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import axios from 'axios';

import SearchForm from '@/components/dashboard/searchForm/SearchForm';
import SelectForm from '@/components/dashboard/selectForm/SelectForm';
import ListTable from '@/components/dashboard/listTable/ListTable';

import '@/app/dashboard/globalDashboard.scss';
import { getDataApiCall } from '@/utils/getData';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

function Page() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);
	const [allToolsList, setAllToolsList] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getAllTools();
		setIsLoading(false);
	}, []);

	// function use for getAllblog

	const getAllTools = async () => {
		setIsLoading(true);
		const response = await getDataApiCall('/api/tool');
		if (response) {
			setAllToolsList(response.tools);
		} else {
			toast.error(`${response.data}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
		setIsLoading(false);
	};

	// function use for Delete blog

	const trashToolhandler = async (id: string, isPublished: boolean) => {
		setIsLoading(true);
		try {
			const response = await axios.patch(
				`/api/tool/trashed?id=${id}&=isPublish=${isPublished}`,
			);
			if (response && response.status === 200) {
				if (response.data.error) {
					toast.error(`${response.data?.data?.error}`, {
						position: toast.POSITION.TOP_RIGHT,
					});
					throw new Error(response.data?.data?.error);
				} else {
					getAllTools();
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
				<div className="col-12 mt-3">
					{isLoading && <Loader />}
					<ListTable
						Data={allToolsList}
						trashHandler={trashToolhandler}
						type="tool"
					/>
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
		</div>
	);
}

export default Page;
