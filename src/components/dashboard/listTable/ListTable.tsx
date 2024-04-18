import '@/app/dashboard/globalDashboard.scss';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TbTrash } from "react-icons/tb";
import { MdSettingsBackupRestore } from "react-icons/md";
import { FaPen } from "react-icons/fa6";

interface TableProps {
	Data: any;
	type: string;
	loading?: boolean;
	isTrash?: boolean;
	isMainPage?: boolean;
	trashHandler?: (id: string, isPublished: boolean) => void;
	restoreHandler?: (id: string, isPublished: boolean) => void;
	setShowDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
	setItemToBeDeleted?: React.Dispatch<React.SetStateAction<string>>;
}

function ListTable({
	Data,
	trashHandler,
	type,
	loading,
	isTrash,
	isMainPage,
	restoreHandler,
	setShowDeleteModal,
	setItemToBeDeleted,
}: TableProps) {
	const deleteItem = (id: string) => {
		if (setShowDeleteModal && setItemToBeDeleted) {
			setShowDeleteModal(true);
			setItemToBeDeleted(id);
		}
	};

	const isTool = type === 'tool';
	const isBlog = type === 'blog';
	const isMedia = type === 'media';

	return (
		<table className="table">
			<thead>
				<tr>
					{!isMedia && (
						<th scope="col" className="col-1 clearfix text-gray">
							<span className="col-6 d-block float-start ps-3">Sr</span>
						</th>
					)}
					{isMedia && (
						<>
							<th scope="col" className="col-2 clearfix text-gray">
								<span className="col-6 d-block float-start">Image</span>
							</th>
							<th scope="col" className="col-5 clearfix text-gray">
								<span className="col-6 d-block float-start">Url</span>
							</th>
						</>
					)}
					{(isTool || isBlog) && (
						<>
							<th scope="col" className="col-3 clearfix text-gray">
								<span className="col-6 d-block float-start">{isTool ? 'Tool Name' : 'Blog Name'}</span>
							</th>
							<th scope="col" className="col-4 clearfix text-gray">
								<span className="col-6 d-block float-start">Parent</span>
							</th>
						</>
					)}
					{!isMedia && (
						<th scope="col" className="col-2 clearfix text-gray">
							<span className="col-6 d-block float-start">Language</span>
						</th>
					)}
					{!isMainPage && (
						<th scope="col" className="col-2 clearfix text-gray">
							<span className="col-6 d-block float-start">Actions</span>
						</th>
					)}
				</tr>
			</thead>
			<tbody className="p-5">
				{(!loading && Data && Data.length > 0) ? (
					Data.map((item: any, index: number) => (
						<tr key={index}>
							{isMedia && (
								<>
									<td className="text-gray align-middle">
										<Image width={100} height={100} src={`/${item.url}`} className='h-100 object-fit-contain ' alt={item.name} />
										{item.image}
									</td>
									<td className="text-gray align-middle">{item.url}</td>
								</>
							)}
							{!isMedia && (
								<td scope="row" className="text-gray align-middle fw-bold ps-3">
									#{index + 1}
								</td>
							)}
							{type === 'blog' && (
								<td className="text-gray align-middle">{item.title}</td>
							)}
							{type === 'tool' && (
								<td className="text-gray align-middle">{item.name}</td>
							)}
							{!isMedia && (isTool || isBlog) && (
								<td className="text-gray align-middle">{item.parentId ? item.parentId : "N/A"}</td>
							)}
							{!isMedia && (
								<td className="text-gray align-middle">{item.language.name}</td>
							)}
							{!isMainPage && (
								<td className={`align-middle`}>
									{!isMedia && (
										<Link href={`/dashboard/invoicedashboard/${type === 'blog' ? 'blog' : 'tool'}/update/${item.id}`} data-toggle="tooltip" data-placement="top" title="Edit">
											<button type="button" className="btn btn-primary btn-purple button-hover me-2" >
												<FaPen />
											</button>
										</Link>
									)}
									{isTrash && restoreHandler && (
										<button
											onClick={() => restoreHandler(item.id, isBlog || isTool ? true : false)}
											type="button"
											data-toggle="tooltip" data-placement="top" title="Restore"
											className="btn btn-primary mt-2 mt-xl-0">
											<MdSettingsBackupRestore />
										</button>
									)}
									{!isTrash && trashHandler && (
										<button
											onClick={() => trashHandler(item.id, isBlog || isTool ? false : true)}
											type="button"
											data-toggle="tooltip" data-placement="top" title="Trash"
											className="btn btn-warning  mt-2 mt-xl-0 ">
											<TbTrash />
										</button>
									)}
									{isTrash && (
										<button
											onClick={() => deleteItem(item.id)}
											type="button"
											data-toggle="tooltip" data-placement="top" title="Delete"
											className="btn btn-danger mt-2 ms-2 mt-xl-0">
											<TbTrash />
										</button>
									)}
								</td>
							)}
						</tr>
					))
				) : (
					<tr>
						{!isMedia ? (
							<td colSpan={5} className="text-center py-5">
								{`No ${isTool ? 'tools' : 'blogs'} found`}
							</td>
						) : (
							<td colSpan={5} className="text-center py-5">
								{`No Media found`}
							</td>
						)}
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default ListTable;
