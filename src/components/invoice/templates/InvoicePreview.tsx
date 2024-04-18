import InvoiceContext from '@/context/invoice/InvoiceContext';
import IInvoiceData, { IItems } from '@/types/invoiceTypes';
import React, { useContext } from 'react';
import './InvoicePreview.scss';
import Image from 'next/image';
import { DownloadInvoice } from '../actions/DownLoadInvoice';

interface InterfaceInvoiceDocument {
	data: IInvoiceData;
}

const InvoicePreview = ({ data }: InterfaceInvoiceDocument) => {
	const invoiceContext = useContext(InvoiceContext);
	const invoiceData = data || invoiceContext.invoiceData;

	// console.log("invoiceData receipt",invoiceData)
	const GenerateInvoice = () => {};

	function calculateTotalAmount(data: IInvoiceData): number {
		return data.items.reduce((accumulator, item) => {
			const itemTotal = item.quantity * item.unitPrice;

			return accumulator + itemTotal;
		}, 0);
	}
	const imagePath = (data.logo && URL.createObjectURL(data.logo)) || '';

	return (
		<div className=" col-lg-12 col-md-12 col-sm-12 col-12 padding invoice-preview">
			<div className="card">
				<div className="card-header p-4">
					{data.logo && (
						<div>
							<Image src={imagePath} alt="logo" width={100} height={100} />
						</div>
					)}
					<div>
						<h3 className="mb-0">Invoice {data.invoiceNumber}</h3>
						<div>Issue Date: {data.issueDate}</div>
						<div>Due Date: {data.dueDate}</div>
					</div>
				</div>
				<div className="card-body">
					<div className="row mb-4">
						<div className="col-sm-6">
							<h5 className="mb-3 sender-recipient-title">From:</h5>
							<h3 className="text-dark mb-1">{data.sender.companyName}</h3>
							<div>{data.sender.address}</div>
							<div>{data.sender.city}</div>
							<div>Email: contact@bbbootstrap.com</div>
							<div>Phone: +91 9897 989 989</div>
						</div>
						<div className="col-sm-6 ">
							<h5 className="mb-3 sender-recipient-title">To:</h5>
							<h3 className="text-dark mb-1">{data.recipient.companyName}</h3>
							<div>{data.recipient.address}</div>
							<div>{data.recipient.city}</div>
							<div>Email: </div>
							<div>Phone: </div>
						</div>
					</div>
					<div className="table-responsive-sm">
						<div className="table table-striped">
							<thead className="mx-auto">
								<tr>
									<th className="center">#</th>
									<th>Item</th>
									<th>Description</th>
									<th className="center">Qty</th>
									<th className="right">Price</th>
									{invoiceData.taxAmount !== 0 && (
										<th className="center">Tax</th>
									)}
									<th className="right">Subtotal</th>
								</tr>
							</thead>
							<tbody>
								{data.items &&
									data.items.map((item: IItems, index: number) => (
										<tr key={item.id}>
											<td className="center">{index + 1}</td>
											<td className="left strong">{item.name}</td>
											<td className="left">{item.description}</td>
											<td className="right">{item.quantity}</td>
											<td className="center">
												{invoiceData.currency.symbol}
												{item.unitPrice}
											</td>
											{item.Tax.tax !== 0 && (
												<td className="center">{`${item.Tax.name}(${item.Tax.tax})%`}</td>
											)}
											<td className="right">
												{invoiceData.currency.symbol}
												{item.subtotal}
											</td>
										</tr>
									))}
							</tbody>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mt-4 flex-column col-12 col-lg-5 ms-auto invoice-summary ">
							<div className=" rounded-2 summary-heading p-2">
								<span className="fw-bold">
									Invoice <br /> Summary
								</span>
							</div>
							<div className="px-2 py-3">
								<div className="d-flex justify-content-between">
									<span>Subtotal</span>
									<span>
										{data.currency.symbol}
										{invoiceData.subtotalAmount}
									</span>
								</div>
								{data.taxAmount !== 0 && (
									<div className="d-flex justify-content-between ">
										<span>TAX</span>
										<span>
											{data.currency.symbol}
											{data.taxAmount ? data.taxAmount : 0.0}
										</span>
									</div>
								)}
								{data.payments !== 0 && (
									<div className="d-flex justify-content-between ">
										<span>Payments</span>
										<span>
											{data.currency.symbol}
											{data.payments}
										</span>
									</div>
								)}
								<div className="d-flex justify-content-between ">
									<span>Total</span>
									<span>
										{data.currency.symbol}
										{data.invoiceTotal}
									</span>
								</div>
								{data.balance !== 0 && (
									<div className="d-flex justify-content-between ">
										<span>Balance</span>
										<span>
											{data.currency.symbol}
											{data.balance - data.payments}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer bg-white">
					<p className="mb-0">
						<DownloadInvoice data={invoiceData}>
							<span>download copy</span>
						</DownloadInvoice>
					</p>
				</div>
			</div>
		</div>
	);
};

export default InvoicePreview;
