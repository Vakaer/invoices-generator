'use client';
import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as Yup from 'yup';

import '@/app/dashboard/globalDashboard.scss';

function SignUpPage() {
	const { push } = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string | null>(null);

	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Username is Required'),
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
		username: '',
		email: '',
		password: '',
	};

	const signUphandler = async (data: any) => {
		try {
			const response = await axios.post('/api/auth/signup', data);
			if (response && response.status === 200) {
				console.log(response.data);
			} else {
				return Promise.reject(false);
			}
		} catch (error: any) {
			return Promise.reject(false);
		}
	};

	const onSubmit = async (values: any) => {
		const dataObject = {
			userName: values.username,
			email: values.email,
			password: values.password,
		};
		signUphandler(dataObject);
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
								<p className="text-danger fst-italic">{isError}</p>
								<div className="py-2 text-center fst-italic text-gray">
									SignUp Form
								</div>
								<div className="form-outline mb-4">
									<label htmlFor="username" className="text-gray fst-italic">
										User name
									</label>
									<Field
										type="text"
										id="username"
										name="username"
										className="form-control text-gray fst-italic inputField"
									/>
									<ErrorMessage
										name="username"
										component="div"
										className="text-danger fst-italic"
									/>
								</div>
								<div className="form-outline mb-4">
									<label htmlFor="email" className="text-gray fst-italic">
										Email address
									</label>
									<Field
										type="email"
										id="email"
										name="email"
										className="form-control text-gray fst-italic inputField"
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
									<div className="col d-flex text-gray fst-italic">
										<a href="/dashboard/login">I have an account?</a>
									</div>
								</div>
								<div className="d-flex justify-content-end ">
									<button
										type="submit"
										className="btn btn-primary btn-purple button-hover btn-block mb-4 fst-italic">
										{isLoading ? 'loading' : 'Sign Up'}
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

export default SignUpPage;
