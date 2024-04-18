import React, { useState } from 'react';
import IInvoiceData from '@/types/invoiceTypes';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';

import { memo } from 'react';
import { invoiceSchema } from '@/validationsSchema/InvoiceValidationSchema';
import InvoiceDocumentTest from '../templates/InvoiceDocumentTest';

type InvoiceDocumentProps = {
	data: IInvoiceData;
	children: React.JSX.Element;
};

export const DownloadInvoice = ({ data, children }: InvoiceDocumentProps) => {
	function validateDataAndGeneratePdf(data: IInvoiceData) {
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
		generatePdfDocument(data);
	}

	return (
		<button
			className="py-2 px-5 btn btn-dark text-uppercase"
			onClick={() => validateDataAndGeneratePdf(data)}>
			{children}
		</button>
	);

	// <ViewDownloadStatement data={data} />;
};

const ViewDownloadStatement = ({ data }: InvoiceDocumentProps) => {
	const downloadPdf = async () => {
		const blob = await pdf(<InvoiceDocumentTest data={data} />).toBlob();
		saveAs(blob, 'statement');
	};
	const openPdf = async () => {
		const blob = await pdf(<InvoiceDocumentTest data={data} />).toBlob();
		const pdfURL = URL.createObjectURL(blob);

		// Check if window is defined before using it
		if (typeof window !== 'undefined') {
			window.open(pdfURL, '_blank');
		} else {
			// Handle the case where window is not defined
			throw 'Window object is not defined. Cannot open PDF.';

			// You might want to implement alternative behavior or provide a message to the user.
		}
	};

	const ValiDateAndViewData = () => {
		invoiceSchema
			.validate(data)
			.then((validData) => {
				openPdf();
			})
			.catch((errors) => {
				// Validation errors
				console.error('Validation errors:', errors);
			});
	};
	const ValidateAndDownloadInvoice = () => {
		if (
			data.sender.companyName &&
			data.recipient.companyName &&
			data.items.length === 0
		) {
			// Check if sender's companyName, recipient's companyName, or items are empty
			invoiceSchema
				.validate(data)
				.then((validData) => {
					downloadPdf();
				})
				.catch((errors) => {
					// Validation errors
					console.error('Validation errors:', errors);
				});
		}
		alert('Recipient, sender, and at least one item are required');

		return; // Don't proceed with validation and download
	};

	return (
		<>
			<button
				type="submit"
				className="btn btn-primary "
				onClick={ValiDateAndViewData}>
				View
			</button>

			<button
				type="submit"
				className="btn btn-dark "
				onClick={ValidateAndDownloadInvoice}
				color="primary">
				Download
			</button>
		</>
	);
};

export default memo(ViewDownloadStatement);

const generatePdfDocument = async (data: IInvoiceData) => {
	// If none of the above conditions are met, proceed to generate the PDF document.
	const fileName = data.sender.companyName + '_' + data.invoiceNumber;
	const blob = await pdf(<InvoiceDocumentTest data={data} />).toBlob();
	saveAs(blob, fileName);
};

// keep this code for now
// <button
// 	className='py-2 px-5 btn btn-primary text-uppercase'
// 	onClick={() => generatePdfDocument(data)}
// >
// 	download
// 	{/* <PDFDownloadLink
// 		className='text-decoration-none  text-white '
// 		document={<InvoiceDocumentTest data={data} />}
// 		fileName='invoice.pdf'
// 	>
// 		{({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download renderer")}
// 	</PDFDownloadLink> */}
// 	{/* <BlobProvider document={<InvoiceDocumentTest data={data} />}>
// 	{({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download renderer")}
// 	</BlobProvider> */}
// </button>
