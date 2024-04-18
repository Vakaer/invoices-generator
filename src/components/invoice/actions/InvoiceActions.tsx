import InvoiceContext from '@/context/invoice/InvoiceContext';
import { Field, FieldProps } from 'formik';
import React, { ChangeEvent, useContext, useState, useEffect } from 'react';
import { DownloadInvoice } from './DownLoadInvoice';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import useWindowSize from '@/cutomHooks/useWindowSize';

import { HiOfficeBuilding } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';
import IInvoiceData from '@/types/invoiceTypes';

type InvoiceActionsProps = {
	toggleCompanyInfo: () => void;
	toggleClientInfo: () => void;
	toggleInvoiceDescription: () => void;
	toggleIsPaymentVisible: () => void;
	isCompanyInfoVisible: boolean;
	isClientInfoVisible: boolean;
	isDescriptionVisible: boolean;
	isPaymentsVisible: boolean;
	setShowInvoice: (value: React.SetStateAction<boolean>) => void;
	handlePaymentsInputChange: (
		e: ChangeEvent<HTMLInputElement>,
	) => Promise<void>;
};

function InvoiceActions({
	isClientInfoVisible,
	isCompanyInfoVisible,
	isDescriptionVisible,
	isPaymentsVisible,
	toggleCompanyInfo,
	toggleClientInfo,
	toggleInvoiceDescription,
	toggleIsPaymentVisible,
	handlePaymentsInputChange,
	setShowInvoice,
}: InvoiceActionsProps) {
	const { invoiceData } = useContext(InvoiceContext);
	const [actionsVisible, setActionsVisible] = useState(false);
	const { width } = useWindowSize();
	const iconStyle = {
		height: '40px',
		width: '40px',
	};
	useEffect(() => {
		if (width > 1200) {
			setActionsVisible(true);
		} else {
			setActionsVisible(false);
		}

		return () => {};
	}, [width]);

	const toggleActions = () => {
		setActionsVisible((prevState) => !prevState);
	};

	const ToggleAddOrRemoveText = (isVisible: boolean) => {
		return !isVisible ? 'Add' : 'Remove';
	};
	function validateDataAndPreviewInvoice(data: IInvoiceData) {
		// Check if the sender object properties are all empty
		const isSenderEmpty = Object.values(data.sender).every(
			(value) => value === '',
		);

		// Check if the recipient object properties are all empty
		const isRecipientEmpty = Object.values(data.recipient).every(
			(value) => value === '',
		);
		if (isRecipientEmpty) {
			alert('Recipient is not available.');

			return;
		}

		if (isSenderEmpty) {
			alert('Sender is not available.');

			return;
		}

		if (data.items.length < 1) {
			alert('At least one item is required.');

			return;
		}
		setShowInvoice(true);
	}

	return (
		<div className="col-xl-4 mb-5">
			<div
				className={`toggle-actions-btn col-10 mt-3 mb-5 text-center mx-auto ${
					actionsVisible ? ' ' : 'rotate-180'
				} `}
				onClick={toggleActions}>
				<MdKeyboardDoubleArrowDown className="text-primary w-40 h-40" />
			</div>

			<div
				className={` invoice-actions flex-column gap-3 col-10 mx-auto
						  ${actionsVisible ? 'd-flex text-center' : 'd-none d-xl-flex  '} 
						  `}>
				{/* <button className="btn btn-outline-light text-primary border-primary ">
					<i className="bi bi-box-seam-fill me-2"></i>
					Add Custom Field
				</button> */}
				<button
					className="btn btn-outline-light fs-6 text-primary border-primary "
					onClick={toggleCompanyInfo}>
					<HiOfficeBuilding className="text-primary" />
					{` ${ToggleAddOrRemoveText(isCompanyInfoVisible)} Company Info`}
				</button>
				<button
					className="btn btn-outline-light text-primary border-primary "
					onClick={toggleClientInfo}>
					<BsFillPersonFill className="text-primary" />
					{` ${ToggleAddOrRemoveText(isClientInfoVisible)} Client Info`}
				</button>
				<button
					className="btn btn-outline-light text-primary border-primary "
					onClick={toggleInvoiceDescription}>
					<BiSolidPencil className="text-primary" />
					{` ${ToggleAddOrRemoveText(isDescriptionVisible)} Description`}
				</button>
				<button
					className="btn btn-outline-light text-primary border-primary"
					onClick={toggleIsPaymentVisible}>
					<BsCurrencyDollar className="text-primary" />
					{ToggleAddOrRemoveText(isPaymentsVisible)} Payment
				</button>
				{isPaymentsVisible && (
					<div className="d-flex flex-column col-md-12">
						<label htmlFor={`payments`}>Payment</label>
						<Field name={`payments`}>
							{(fieldProps: FieldProps<number>) => (
								<input
									type="number"
									id="payments"
									className="inputGroup form-control "
									name={fieldProps.field.name}
									value={fieldProps.field.value}
									onChange={(e) => {
										fieldProps.form.setFieldValue(
											fieldProps.field.name,
											e.target.value,
										);
										handlePaymentsInputChange(e);
									}}
								/>
							)}
						</Field>
					</div>
				)}
				<hr />
				<button
					onClick={() => validateDataAndPreviewInvoice(invoiceData)}
					className="py-2 px-5 btn btn-primary text-uppercase">
					preview invoice
				</button>
				{/* <button
					type="submit"
					className="py-2 px-5 btn btn-primary text-uppercase">
					submit
				</button> */}
				<DownloadInvoice data={invoiceData}>
					<span>download</span>
				</DownloadInvoice>
			</div>
		</div>
	);
}

export default InvoiceActions;
