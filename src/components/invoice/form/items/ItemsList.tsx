import InvoiceContext from '@/context/invoice/InvoiceContext';
import useWindowSize from '@/cutomHooks/useWindowSize';
import { IItems, MyFormValues } from '@/types/invoiceTypes';
import { useFormikContext } from 'formik';
import React, { useContext, useState } from 'react';
import { BiEdit } from 'react-icons/bi';

type ItemTableProps = {
	item: IItems;
	index: any;
	handleEdit: (index: number) => void;
};

function ItemsList({ item, handleEdit, index }: ItemTableProps) {
	const { selectedTax } = useContext(InvoiceContext);
	const { values } = useFormikContext<MyFormValues>();
	const { width } = useWindowSize();
	const isSmallScreen = width < 992;

	return (
		<tr
			className={`border-bottom invoice-item ${
				isSmallScreen ? 'text-start' : ''
			}`}>
			<td className="p-1 p-lg-3 text-lg-center">
				{isSmallScreen && <div className="fw-bold">Name</div>}
				<p>{item.name}</p>
				<p>{item.description}</p>
			</td>
			<td className="p-1 p-lg-3 text-lg-center">
				{isSmallScreen && <div className="fw-bold">Quantity</div>}
				<p>{item.quantity}</p>
			</td>
			<td className="p-1 p-lg-3 text-lg-center">
				{isSmallScreen && <div className="fw-bold">unit price</div>}
				<p>
					{values.currency.symbol}
					{item.unitPrice}
				</p>
			</td>
			<td className="p-1 p-lg-3 text-lg-center">
				{isSmallScreen && <div className="fw-bold">Tax</div>}
				{selectedTax.tax === 0 ? (
					<p>N/A</p>
				) : (
					<p>{`${selectedTax.name} (${selectedTax.tax}%)`}</p>
				)}
			</td>
			<td className="p-1 p-lg-3 d-flex justify-content-between  ">
				{isSmallScreen && <div className="fw-bold">Subtotal</div>}
				<p>
					<span>
						{values.currency.symbol}
						{item.subtotal}
					</span>
					<span onClick={() => handleEdit(index)}>
						<BiEdit className="text-primary" />
					</span>
				</p>
			</td>
		</tr>
	);
}

export default ItemsList;
