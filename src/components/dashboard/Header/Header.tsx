import React from 'react'

function Header() {
  return (
    <>
    {/* <div className="container-fluid navs-shadow bg-white dashboard-header">
							<div className="container p-0">
								<div className="row">
									<div className="p-4 d-flex justify-content-end">
										<span>Admin</span>
									</div>
								</div>
							</div>
						</div> */}
						<nav className="navbar navbar-expand-lg navs-shadow bg-white">
							<div className="container-fluid">
								<a className="navbar-brand" href="#"></a>
								<button
									className="navbar-toggler"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#navbarNav"
									aria-controls="navbarNav"
									aria-expanded="false"
									aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarNav">
									<ul className="navbar-nav ms-md-auto gap-2">
										<li className="nav-item dropdown rounded justify-content-center d-flex">
											<a
												className="nav-link dropdown-toggle"
												href="#"
												id="navbarDropdown"
												role="button"
												data-bs-toggle="dropdown"
												aria-expanded="false">
												<i className="bi bi-person-fill me-2"></i>
												<img
													src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
													className="rounded-circle"
													alt="avatar"
													width={40}
													height={40}
												/>
											</a>
											<ul
												className="dropdown-menu dropdown-menu-end"
												aria-labelledby="navbarDropdown">
												<li>
													<a className="dropdown-item" href="#">
														Account
													</a>
												</li>
												<li>
													<a className="dropdown-item" href="#">
														Another action
													</a>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a className="dropdown-item" href="#">
														Logout
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</nav>
    </>
  )
}

export default Header