'use client';
import React, { ChangeEvent, useContext, useState } from 'react';

import { Form, Field, Formik } from 'formik';

import Modal from '@/components/ui/Modal';

import SenderInfo from './sender/SenderInfo';
import RecipientInfo from './recipient/RecipientInfo';
import SenderOrRecepientDetailsModal from './SenderOrRecepientDetailsModal';
import ItemFields from './items/ItemFields';
import AddTaxForm from './tax/AddTaxForm';
import InvoiceSummary from './summary/Summary';
import InvoiceActions from '../actions/InvoiceActions';
import LogoUploadField from './customFIelds/LogoUploadField';
import DateField from './customFIelds/DateFields';
import InvoiceNumberField from './customFIelds/InvoiceNumberField';

import InvoiceContext from '@/context/invoice/InvoiceContext';

import { currentDate } from '@/utils/formattedDate';
import { currencies } from '@/data/currencies';
import { invoiceSchema } from '@/validationsSchema/InvoiceValidationSchema';

import './invoiceStyle.scss';
import InvoicePreview from '../templates/InvoicePreview';

function InvoiceForm() {
	// context
	const {
		setShowModal,
		showModal,
		showAddTaxModal,
		setShowAddTaxModal,
		updatePayments,
		updateFormField,
		invoiceData,
	} = useContext(InvoiceContext);

	//states
	const [showInvoice, setShowInvoice] = useState(false);
	const [partyInfo, setPartyInfo] = useState<'sender' | 'reciever' | null>(
		null,
	);
	const [imageSource, setImageSource] = useState<any>(null);
	const [confirmedItems, setConfirmedItems] = useState<any>([]);
	const [editItemIndex, setEditItemIndex] = useState<number | null>(null);
	const [isCompanyInfoVisible, setCompanyInfoVisible] =
		useState<boolean>(false);
	const [isClientInfoVisible, setClientInfoVisible] = useState<boolean>(false);
	const [isDescriptionVisible, setDescriptionVisible] =
		useState<boolean>(false);
	const [isPaymentsVisible, setIsPaymentsVisible] = useState<boolean>(false);

	//functions

	const isItemConfirmed = (index: number) => confirmedItems.includes(index);

	const handleEdit = (index: number) => {
		const updatedConfirmedItems = confirmedItems.filter(
			(itemIndex: number) => itemIndex !== index,
		);
		setConfirmedItems(updatedConfirmedItems);
		setEditItemIndex(index);
	};

	const handlePaymentsInputChange = async (
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const payments = await parseFloat(e.target.value);
		updatePayments(payments);
	};

	function showRecipientForm() {
		setPartyInfo('reciever');
		setShowModal(true);
	}

	function showSenderForm() {
		setPartyInfo('sender');
		setShowModal(true);
		setCompanyInfoVisible(false);
	}

	const toggleCompanyInfo = () => {
		setCompanyInfoVisible(!isCompanyInfoVisible);
		setClientInfoVisible(false);
		setDescriptionVisible(false);
	};

	const toggleClientInfo = () => {
		setClientInfoVisible(!isClientInfoVisible);
		setCompanyInfoVisible(false);
		setDescriptionVisible(false);
	};

	const toggleInvoiceDescription = () => {
		setDescriptionVisible(!isDescriptionVisible);
		setCompanyInfoVisible(false);
		setClientInfoVisible(false);
	};

	const toggleIsPaymentVisible = () => {
		setIsPaymentsVisible(!isPaymentsVisible);
		setCompanyInfoVisible(false);
		setDescriptionVisible(false);
		setClientInfoVisible(false);
	};

	const handleFileChange = () => {
		console.log('file changed');
	};

	return (
		<div className="my-5">
			<Formik
				validationSchema={invoiceSchema}
				initialValues={{
					invoiceNumber: '',
					items: [],
					logo: '',
					dueDate: '',
					issueDate: currentDate(),
					companyInfo: '',
					clientInfo: '',
					description: '',
					currency: currencies[0],
					payments: 0,
				}}
				name="invoiceForm"
				enableReinitialize={true}
				onSubmit={(values: any) => {}}>
				{({ handleChange, handleBlur, values }) => (
					<Form className="invoice-form">
						<div className="row flex-column-reverse flex-xl-row flex-xxl-row">
							<div className="col-xl-8">
								<div className=" shadow-lg p-4">
									{/* <div className='border border-black	 my-3 p-4'>
										data
										<div>{JSON.stringify(values)}</div>
										<div>{JSON.stringify(invoiceData)}</div>
									</div> */}

									<div className="d-flex flex-column justify-content-lg-between flex-xl-row ">
										<LogoUploadField
											fieldName="logo"
											handleFileChange={handleFileChange}
											setImageSource={setImageSource}
											imageSource={imageSource}
										/>
										<div className="d-flex flex-column align-items-end ">
											<InvoiceNumberField fieldName="invoiceNumber" />
											<DateField label="Due Date" fieldName="dueDate" />
											<DateField label="Issue Date" fieldName="issueDate" />
										</div>
									</div>
									{/* sender and recipient info box  */}
									<div className="d-flex flex-column flex-lg-row gap-2 my-1">
										<SenderInfo
											isCompanyInfoVisible={isCompanyInfoVisible}
											showSenderForm={showSenderForm}
										/>
										<RecipientInfo
											isClientInfoVisible={isClientInfoVisible}
											showRecipientForm={showRecipientForm}
										/>
									</div>
									{isDescriptionVisible && (
										<Field
											type="text"
											values={`${values.description}`}
											name="description"
											className=" p-2 rounded-1 col-md-12 generic-input"
											placeholder="Description"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									)}
									{/* invoice items  */}
									{/* items table  */}
									<div className="d-flex mt-3">
										<table className=" table table-responsive">
											<thead>
												{values.items.length > 0 && (
													<tr className="text-left table-secondary overflow-scroll  ">
														<th className="p-3 text-lg col-2" scope="col">
															Name
														</th>
														<th className="p-3 text-lg col-2" scope="col">
															Quantity
														</th>
														<th className="p-3 text-lg col-2" scope="col">
															unit Price
														</th>
														<th className="p-3 text-lg col-2" scope="col">
															Tax
														</th>
														<th className="p-3 text-lg col-2" scope="col">
															Subtotal
														</th>
													</tr>
												)}
											</thead>

											<ItemFields
												confirmedItems={confirmedItems}
												editItemIndex={editItemIndex}
												handleEdit={handleEdit}
												isItemConfirmed={isItemConfirmed}
												setConfirmedItems={setConfirmedItems}
												setEditItemIndex={setEditItemIndex}
											/>
										</table>
									</div>

									{/* invoice items fields  */}

									{/*
									 ***uncomment if you want to watch
									 ***field item values
									 */}

									{/* <div>
										<h2>Submitted Items:</h2>
										<ul>
											{values.items.length > 0 ? (
												values.items.map((item: IItems, index: number) => (
													<li key={index}>
														Item Name: {item.name}, Quantity: {item.quantity}, Tax:
														{item.Tax && item.Tax.tax}, subTotal:{item.subtotal}, Currency:{" "}
														{values.currency.symbol}
													</li>
												))
											) : (
												<p>no items</p>
											)}
										</ul>
									</div> */}

									<InvoiceSummary />

									{showInvoice && (
										<Modal open={setShowInvoice}>
											<InvoicePreview data={invoiceData} />
										</Modal>
									)}
								</div>
							</div>
							<InvoiceActions
								isClientInfoVisible={isClientInfoVisible}
								isCompanyInfoVisible={isCompanyInfoVisible}
								isDescriptionVisible={isDescriptionVisible}
								isPaymentsVisible={isPaymentsVisible}
								handlePaymentsInputChange={handlePaymentsInputChange}
								toggleIsPaymentVisible={toggleIsPaymentVisible}
								toggleClientInfo={toggleClientInfo}
								toggleCompanyInfo={toggleCompanyInfo}
								toggleInvoiceDescription={toggleInvoiceDescription}
								setShowInvoice={setShowInvoice}
							/>
						</div>
					</Form>
				)}
			</Formik>
			{showModal && (
				<Modal open={setShowModal}>
					<SenderOrRecepientDetailsModal
						setPartyInfo={setPartyInfo}
						partyInfo={partyInfo}
					/>
				</Modal>
			)}
			{showAddTaxModal && (
				<Modal open={setShowAddTaxModal}>
					<AddTaxForm />
				</Modal>
			)}
		</div>
	);
}

export default InvoiceForm;
