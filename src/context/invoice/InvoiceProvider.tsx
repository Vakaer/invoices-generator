'use client';
import React, { useEffect, useState } from 'react';
import { currencies } from '@/data/currencies';
import { currentDate } from '@/utils/formattedDate';
import InvoiceContext from './InvoiceContext';
import IInvoiceData, {
	IItems,
	ISenderData,
	IRecepientData,
} from '@/types/invoiceTypes';

const InvoiceState = (props: any) => {
	// State variables to manage form data
	const [senderFormData, setSenderFormData] = useState<ISenderData>({
		companyName: '',
		address: '',
		postalCode: '',
		city: '',
	});
	const [recipientFormData, setRecipientFormData] = useState<IRecepientData>({
		companyName: '',
		address: '',
		postalCode: '',
		city: '',
	});
	const [invoiceDataSet, setInvoiceData] = useState<IInvoiceData>({
		items: [],
		invoiceNumber: '',
		logo: '',
		dueDate: '',
		issueDate: currentDate(),
		recipient: recipientFormData,
		sender: senderFormData,
		clientInfo: '',
		companyInfo: '',
		currency: currencies[0],
		description: '',
		payments: 0,
		subtotalAmount: 0,
		balance: 0,
		taxAmount: 0,
		invoiceTotal: 0,
	});

	// State variable for managing tax list
	const [selectedTax, setSelectedTax] = useState<{ name: string; tax: number }>(
		{
			name: '',
			tax: 0,
		},
	);

	const [taxList, setTaxList] = useState([selectedTax]);

	// State variables for modal visibility
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showAddTaxModal, setShowAddTaxModal] = useState<boolean>(false);

	// State variable for selected currency
	const [addedPayments, setAddedPayments] = useState<number>(0);

	useEffect(() => {
		updatePayments(addedPayments);
	}, [addedPayments]);

	// Function to handle incoming invoice data
	function handleInvoiceData(data: IInvoiceData) {
		setInvoiceData(data);
	}
	const updateFormField = (fieldName: string, value: any) => {
		setInvoiceData((prevData) => ({
			...prevData,
			[fieldName]: value,
		}));
	};

	const updateItemFields = (index: number, updatedFields: Partial<IItems>) => {
		// Copy the current items array
		const updatedItems = [...invoiceDataSet.items];

		// Update the item at the specified index with the provided fields
		updatedItems[index] = {
			...updatedItems[index],
			...updatedFields,
		};

		// Update the context with the modified items array

		const totalSubtotalAmount = calculateTotalSubtotal(updatedItems);

		// Calculate total subtotal and tax
		const taxAmount = calculateTotalTax(updatedItems);

		// Calculate invoice total and balance
		const invoiceTotal = calculateInvoiceTotal(updatedItems);
		const balance = invoiceTotal - addedPayments;

		setInvoiceData((prevData) => ({
			...prevData,
			items: updatedItems,
			subtotalAmount: totalSubtotalAmount,
			invoiceTotal: invoiceTotal,
			payments: addedPayments,
			balance: balance,
			taxAmount: taxAmount,
		}));
	};

	const addItemToItems = (newItem: IItems) => {
		// Copy the current items array
		const updatedItems = [...invoiceDataSet.items];

		// Add the new item to the array
		updatedItems.push(newItem);

		// Update the context with the modified items array
		setInvoiceData((prevData) => ({
			...prevData,
			items: updatedItems,
		}));
	};

	const removeItem = (index: number) => {
		// Copy the current items array
		const updatedItems = [...invoiceDataSet.items];

		// Remove the item at the specified index
		updatedItems.splice(index, 1);

		// Update the context with the modified items array
		setInvoiceData((prevData) => ({
			...prevData,
			items: updatedItems,
		}));
	};

	// Function to add a new tax to the tax list
	const addNewTax = (values: { name: string; tax: number }) => {
		setTaxList((prevTax) => {
			return [...prevTax, values]; // Add the new tax object to the array
		});
		setShowAddTaxModal(false);
	};

	// Functions to handle sender and recipient form details
	const handleSenderFormDetails = (values: ISenderData) => {
		setSenderFormData({
			address: values.address,
			city: values.city,
			companyName: values.companyName,
			postalCode: values.postalCode,
		});
		setInvoiceData((prevData) => ({
			...prevData,
			sender: {
				address: values.address,
				city: values.city,
				companyName: values.companyName,
				postalCode: values.postalCode,
			},
		}));
		setShowModal(false);
	};

	const handleRecipientFormDetails = (values: IRecepientData) => {
		setRecipientFormData({
			address: values.address,
			city: values.city,
			companyName: values.companyName,
			postalCode: values.postalCode,
		});
		setInvoiceData((prevData) => ({
			...prevData,
			recipient: {
				address: values.address,
				city: values.city,
				companyName: values.companyName,
				postalCode: values.postalCode,
			},
		}));
		setShowModal(false);
	};

	// Function to calculate subtotal of invoice items
	function calculateTotalSubtotal(items: IItems[]) {
		return items.reduce((total, item) => total + item.subtotal, 0) || 0;
	}

	// Function to calculate total tax of invoice items
	function calculateTotalTax(items: IItems[]) {
		const totalTax = items.reduce((accumulator, item) => {
			// Extract the tax rate from the item
			const itemTaxRate = item.Tax ? item.Tax.tax : 0;

			// Calculate the tax for the item and add it to the accumulator
			const itemTax = (item.quantity * item.unitPrice * itemTaxRate) / 100;

			return accumulator + itemTax;
		}, 0);

		return totalTax;
	}

	// Function to calculate the total amount of the invoice
	function calculateInvoiceTotal(items: IItems[]) {
		const subtotal = calculateTotalSubtotal(items);
		const tax = calculateTotalTax(items) || 0;

		return subtotal + tax || 0;
	}

	const updatePayments = (newPayments: number) => {
		setInvoiceData((prevData) => ({
			...prevData, // Copy all the previous properties
			payments: newPayments, // Update the `payments` property
		}));
		setAddedPayments(newPayments);
	};

	// Function to handle canceling the form
	function cancelFormHandler() {
		setShowModal(false);
	}

	return (
		<InvoiceContext.Provider
			value={{
				// Providing context values to child components
				invoiceData: invoiceDataSet,
				setInvoiceData,
				isLoading: false,
				handleInvoiceData,
				updateFormField,
				handleSenderFormDetails,
				senderFormData,
				handleRecipientFormDetails,
				recipientFormData,
				setShowModal,
				showModal,
				cancelFormHandler,
				addNewTax,
				taxList,
				selectedTax,
				setSelectedTax,
				calculateTotalSubtotal,
				calculateTotalTax,
				calculateInvoiceTotal,

				setShowAddTaxModal,
				showAddTaxModal,
				setAddedPayments,
				addedPayments,
				updatePayments,
				removeItem,
				updateItemFields,
				addItemToItems,
			}}>
			{props.children}
		</InvoiceContext.Provider>
	);
};

export default InvoiceState;
