'use client';
import React from 'react';

import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

import { AiOutlineSetting } from 'react-icons/ai';
import { GiCheckboxTree } from 'react-icons/gi';
import { usePathname, useRouter } from 'next/navigation';

import '@/app/dashboard/globalDashboard.scss';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.scss';
import { IAccordionItem, ISubItem, accordionData } from '@/data/dashboard/data';
import { MdOutlineDashboard } from 'react-icons/md';
import Header from '@/components/dashboard/Header/Header';

interface Layoutprops {
	children: React.ReactNode;
}

function LayoutPage({ children }: Layoutprops) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<>
			<div className="container-fluid">
				<div className="row flex-nowrap"  >
					<div className="col-auto col-md-3 col-xl-2 px-0 navs-shadow sidenavbar" >
						<div className="d-flex flex-column align-items-center align-items-sm-start pt-2 ">
							{/* dashboard heading  */}
							<h1
								className="d-flex gap-2 justify-content-center mb-md-0 mt-3 me-md-auto w-100 fs-4 fw-bold"
								style={{ letterSpacing: '2px' }}>
								<span>INVOICE</span>
								<span className="opacity-50 ">TOOL</span>
							</h1>
							{/* side navbar items list */}
							{/* dashboard, setting and modals item are static for now   */}
							<ul
								className="nav nav-pills mt-2 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
								id="menu">
								<div className="accordion mt-2 w-100" id="accordionExample">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button collapsed border-0 shadow-none">
												<Link
													href="/dashboard/invoicedashboard"
													className={`nav-link item-list px-0  ${
														pathname === '/dashboard/invoicedashboard'
															? 'active-color'
															: 'text-black'
													} `}>
													<MdOutlineDashboard
														style={{
															color: `${
																pathname === '/dashboard/invoicedashboard'
																	? 'active-color'
																	: ''
															}`,
															marginRight: '15px',
														}}
													/>
													<span
														className={`hover-effect px-0 align-middle d-sm-inline`}>
														Dashboard
													</span>
												</Link>
											</button>
										</h2>
									</div>

									{accordionData &&
										accordionData.map((item: IAccordionItem, index: number) => {
											return (
												<div className="accordion-item" key={item.id}>
													<h2
														className="accordion-header"
														id={`heading${item.id}`}>
														<button
															className={`accordion-button collapsed border-0 shadow-none ${
																pathname === item.mainUrl && 'active-color'
															}`}
															onClick={() => {
																/* this condition was navigate in case of dashboard
															    but for now i have declared dashboard as static
																	keep it for later use
																*/
																item.id === 'dashboard' &&
																	router.push(item.mainUrl);
															}}
															type="button"
															data-bs-toggle="collapse"
															data-bs-target={`#collapse${item.id}`}
															aria-expanded="false"
															aria-controls={`collapse${item.id}`}>
															{item.icon}
															<span className="d-sm-inline">{item.title}</span>
														</button>
													</h2>
													{/* iterate over subitems for accordion  */}
													{item.items.length > 0 && (
														<div
															id={`collapse${item.id}`}
															className={`accordion-collapse collapse  ${
																pathname.includes(item.mainUrl) && 'show'
															}`}
															aria-labelledby={`heading${item.id}`}
															data-bs-parent="#accordionExample">
															<div className="accordion-body">
																<ul className="nav flex-column ps-15">
																	{item.items.length > 0 &&
																		item.items.map(
																			(subItem: ISubItem, index: number) => {
																				return (
																					<li
																						className="w-100"
																						key={subItem.id}>
																						<Link
																							href={subItem.url}
																							className={`nav-link effect px-0 ${
																								pathname === subItem.url &&
																								'active-color'
																							}`}>
																							<span className="hover-effect d-sm-inline ">
																								{subItem.label}
																							</span>
																						</Link>
																					</li>
																				);
																			},
																		)}
																</ul>
															</div>
														</div>
													)}
												</div>
											);
										})}
									{/* settings and modal item  */}
									<li className="mt-1 px-13 side-item">
										<a
											href="#"
											className="nav-link d-flex text-black align-items-center d-flex gap-2 item-list px-0 align-middle">
											<AiOutlineSetting
												style={{ color: '', marginRight: '4px' }}
											/>
											<span className="d-sm-inline ms-1">Settings</span>
										</a>
									</li>
									<li className="mt-1 px-13 side-item">
										<a
											href="#"
											className="nav-link item-list text-black align-items-center d-flex gap-2 px-0 align-middle">
											<GiCheckboxTree
												style={{ color: '', marginRight: '4px' }}
											/>
											<span className="d-sm-inline ms-1">Modals</span>
										</a>
									</li>
								</div>
							</ul>
						</div>
					</div>
					<div className="col p-0 bg-grayshade min-vh-100" style={{height:"100%"}}>
						<Header />
						{/* header is placed into sepaate component  */}
						<div >
						{children}
						</div>
						<ToastContainer
							position="top-right"
							autoClose={5000} // Adjust the autoClose time as needed
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							style={{ width: 'auto', minWidth: '350px' }} // Adjust the width and minWidth
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default LayoutPage;
