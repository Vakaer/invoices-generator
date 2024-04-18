import * as yup from 'yup';

// Validation schema for IRecepientData
export  const recipientSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  address: yup.string().required('Address is required'),
  postalCode: yup.string().required('Postal code is required'),
  city: yup.string().required('City is required'),
});

// Validation schema for ISenderData
export  const senderSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  address: yup.string().required('Address is required'),
  postalCode: yup.string().required('Postal code is required'),
  city: yup.string().required('City is required'),
});

export const taxSchema = yup.object().shape({
    name: yup.string().required('Tax name is required'),
    tax: yup.number().required('Tax rate is required').min(0, 'Tax rate must be non-negative'),
});

// Validation schema for IItems
export const itemSchema = yup.object().shape({
  name: yup.string().required('required'),
  quantity: yup.number().required().positive(),
  unitPrice: yup.number().required().positive(),
});

// Validation schema for IInvoiceData
export const invoiceSchema = yup.object().shape({
  sender: senderSchema,
  recipient: recipientSchema,
  items: yup.array().of(itemSchema).required('Items are required'),
  invoiceNumber: yup.string().required('Invoice number is required'),
  logo: yup.string().nullable(),
  dueDate: yup.string().required('Due date is required'),
  issueDate: yup.string().required('Issue date is required'),
  description: yup.string().required('Description is required'),
  payments: yup.number().required('Payments are required').integer('Payments must be an integer'),
  subtotalAmount: yup.number().required('Subtotal amount is required').positive('Subtotal amount must be positive'),
  taxAmount: yup.number().required('Tax amount is required').positive('Tax amount must be positive'),
  balance: yup.number().required('Balance is required').positive('Balance must be positive'),
  invoiceTotal: yup.number().required('Invoice total is required').positive('Invoice total must be positive'),
});


