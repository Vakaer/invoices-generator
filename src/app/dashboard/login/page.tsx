'use client';
import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as Yup from 'yup';

import '@/app/dashboard/globalDashboard.scss';

function LoginPage() {
	const { push } = useRouter();

	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid Email')
			.required('Email is Required')
			.matches(
				/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
				'Invalid Email Address',
			),
		password: Yup.string().required('Password is Required'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const signInhandler = async (data: any) => {
		try {
			const response = await axios.post('/api/auth/signin', data);
			if (response && response.status === 200) {
				console.log('response', response.data);
			} else {
				return Promise.reject(false);
			}
		} catch (error: any) {
			return Promise.reject(false);
		}
	};

	const onSubmit = async (values: any) => {
		signInhandler(values);
	};

	return (
		<div className="container-fluid d-flex flex-column justify-content-center g-0 min-vh-100 bg-grayish-purple">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-6 border border-1 g-0 p-3 bg-white">
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}>
							<Form>
								<p className="text-danger fst-italic">{error}</p>
								<div className="py-2 text-center text-gray fst-italic">
									Login Form
								</div>
								<div className="form-outline mb-4">
									<label htmlFor="email" className="text-gray fst-italic">
										Email address
									</label>
									<Field
										type="email"
										id="email"
										name="email"
										className="form-control inputField fst-italic text-gray"
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-danger fst-italic"
									/>
								</div>

								<div className="form-outline mb-4">
									<label htmlFor="password" className="text-gray fst-italic">
										Password
									</label>
									<Field
										type="password"
										id="password"
										name="password"
										className="form-control text-gray inputField fst-italic"
									/>
									<ErrorMessage
										name="password"
										component="div"
										className="text-danger fst-italic"
									/>
								</div>

								<div className="row mb-4">
									<div className="col d-flex ">
										<a
											href="/dashboard/signup"
											className="text-gray fst-italic">
											Do not have an account?
										</a>
									</div>
								</div>
								<div className="d-flex justify-content-end ">
									<button
										type="submit"
										className="btn btn-primary btn-purple button-hover btn-block mb-4 fst-italic">
										{isLoading ? 'loading' : 'Sign in'}
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
