export interface IRecepientData {
	companyName: string;
	address: string;
	postalCode: string;
	city: string;
}

export interface ISenderData {
	companyName: string;
	address: string;
	postalCode: string;
	city: string;
}

export default interface IInvoiceData {
  sender: ISenderData;
  recipient: IRecepientData;
  items: IItems[];
  invoiceNumber: string;
  logo: any;
  dueDate: string;
  issueDate: string;
  companyInfo:string;
  clientInfo:string;
  description: string;
  currency:ICurrency
  payments:number
  subtotalAmount:number
  taxAmount:number
  balance:number,
  invoiceTotal:number
}


export interface IItems {
	id: string;
	name: string;
	description: string;
	quantity: number;
	unitPrice: number;
	subtotal: number;
	Tax: {
		name: string;
		tax: number;
	};
}

export interface ICurrency {
	code: string;
	name: string;
	symbol: string;
}

// Define the shape of the entire form
export interface MyFormValues {
	invoiceNumber: string;
	items: IItems[]; 
	logo: null | string;
	dueDate: string;
	issueDate: string;
	companyInfo: string;
	clientInfo: string;
	description: string;
	currency: ICurrency;
}


export const invoiceData: IInvoiceData = {
  sender: {
    companyName: "",
    address: "",
    postalCode: "",
    city: "",
  },
  recipient: {
    companyName: "",
    address: "",
    postalCode: "",
    city: "",
  },
  items: [
    
  ],
  invoiceNumber: '',
  logo: "",
  dueDate: "", 
  issueDate: "", 
  companyInfo:"",
  clientInfo:"",
  description:"",
  currency:{
    code:"",
    name:"",
    symbol:""
  },
  payments:0,
  subtotalAmount:0,
  taxAmount:0,
  balance:0,
  invoiceTotal:0
};




