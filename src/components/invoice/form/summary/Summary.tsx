import React, { useContext } from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import { MyFormValues } from '@/types/invoiceTypes';
import DropdownForCurrency from '../currency/DropdownForCurrency';

function InvoiceSummary() {
	const {
		calculateTotalSubtotal,
		calculateTotalTax,
		addedPayments,
		calculateInvoiceTotal,
	} = useContext(InvoiceContext);

	const { values } = useFormikContext<MyFormValues>();

	return (
		<div className="d-flex mt-4 flex-column col-12 col-lg-5 ms-auto invoice-summary ">
			<div className=" rounded-2 summary-heading p-2">
				<span className="fw-bold">
					Invoice <br /> Summary
				</span>
				<Field name={`currency`}>
					{(fieldProps: FieldProps<string>) => <DropdownForCurrency />}
				</Field>
			</div>
			<div className="px-2 py-3">
				<div className="d-flex justify-content-between">
					<span>Subtotal</span>
					<span>
						{values.currency.symbol}
						{calculateTotalSubtotal(values.items)}
					</span>
				</div>
				<div className="d-flex justify-content-between ">
					<span>TAX</span>
					<span>
						{values.currency.symbol}
						{calculateTotalTax(values.items)
							? calculateTotalTax(values.items)
							: 0.0}
					</span>
				</div>
				{addedPayments !== 0 && (
					<div className="d-flex justify-content-between ">
						<span>Payments</span>
						<span>
							{values.currency.symbol}
							{addedPayments}
						</span>
					</div>
				)}
				<div className="d-flex justify-content-between ">
					<span>Total</span>
					<span>
						{values.currency.symbol}
						{calculateInvoiceTotal(values.items)}
					</span>
				</div>
				{addedPayments !== 0 && (
					<div className="d-flex justify-content-between ">
						<span>Balance</span>
						<span>
							{values.currency.symbol}
							{calculateInvoiceTotal(values.items) - addedPayments}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default InvoiceSummary;
