import { currencies } from '../../data/currencies';
import { IItems, invoiceData,ICurrency, IRecepientData, ISenderData } from '@/types/invoiceTypes';
import React, { createContext, Dispatch, SetStateAction } from 'react';

import IInvoiceData from '@/types/invoiceTypes';

interface IContext {
  isLoading: boolean;
  invoiceData: IInvoiceData;
  handleSenderFormDetails: (values: ISenderData) => void;
  handleRecipientFormDetails: (values: IRecepientData) => void;
  senderFormData: ISenderData;
  recipientFormData: IRecepientData;
  setInvoiceData: Dispatch<SetStateAction<IInvoiceData>>;
  updateFormField: (fieldName: string, value: any) => void;
  handleInvoiceData: (data: IInvoiceData) => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showAddTaxModal: boolean;
  setShowAddTaxModal: Dispatch<SetStateAction<boolean>>;
  cancelFormHandler(): void
  addNewTax: (values: {
    name: string;
    tax: number;
  }) => void;
  taxList: {name: string;tax: number;}[],
  selectedTax: {
    name: string;
    tax: number;
  }
  setSelectedTax: React.Dispatch<React.SetStateAction<{
    name: string;
    tax: number;
  }>>
  calculateTotalSubtotal(items: IItems[]): number;
  calculateTotalTax(items: IItems[]): number;
  calculateInvoiceTotal(items: IItems[]): number;
  setAddedPayments: React.Dispatch<React.SetStateAction<number>>,
  addedPayments: number,
  updatePayments: (newPayments: number) => void,
  removeItem: (index: number) => void,
  updateItemFields: (index: number, updatedFields: Partial<IItems>) => void,
  addItemToItems: (newItem: IItems) => void
}

const InvoiceContext = createContext<IContext>({
  isLoading: false,
  invoiceData: invoiceData as IInvoiceData,
  handleSenderFormDetails: (values) => { },
  handleRecipientFormDetails: (values) => { },
  senderFormData: { address: "", city: "", companyName: "", postalCode: "" },
  recipientFormData: { address: "", city: "", companyName: "", postalCode: "" },
  setInvoiceData: (value) => { },
  updateFormField:(fieldName,value) => {},
  handleInvoiceData: (data) => { },
  showModal: false,
  setShowModal: (value) => { },
  showAddTaxModal: false,
  setShowAddTaxModal: (value) => { },
  cancelFormHandler: () => { },
  addNewTax: (values) => { },
  taxList:[],
  selectedTax:{name:"", tax:0},
  setSelectedTax:() => {},
  calculateTotalSubtotal:(items) =>  { return 0},
  calculateTotalTax:(items) =>  { return 0},
  calculateInvoiceTotal:(items) => {return 0},
  
  // handleCurrencySelect:(currency) => {},
  // selectedCurrency: currencies[0],
  setAddedPayments:() => {},
  addedPayments:0,
  updatePayments:(newPayments) => {},
  removeItem:(index) => {},
  updateItemFields:(index, updatedFields) => {},
  addItemToItems:(newItem) => {},
  
});

export default InvoiceContext;
