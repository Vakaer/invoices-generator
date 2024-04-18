import React, { useContext, ChangeEvent } from 'react';
import { Field, useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import IInvoiceData, { IItems } from '@/types/invoiceTypes';

type DropDownForTaxProps = {
	item: IItems;
	fieldName: string;
	selectedTaxValue: { name: string; tax: number };
	index: number;
	handleTaxInputChange: (
		e: ChangeEvent<HTMLSelectElement>,
		index: number,
		selectedOption: { name: string; tax: number },
	) => Promise<void>;
};

function DropDownForTax({
	item,
	fieldName,
	selectedTaxValue,
	index,
	handleTaxInputChange,
}: DropDownForTaxProps) {
	const { taxList, setShowAddTaxModal, selectedTax, setSelectedTax } =
		useContext(InvoiceContext);
	const { values, setFieldValue } = useFormikContext<IInvoiceData>();

	const filteredTaxList = taxList.filter((item) => item.tax !== 0);
	const handleSelectChange = (event: any) => {
		const selectedValue = event.target.value;

		if (selectedValue === 'addNewTax') {
			// Show an alert when "Add New Tax" is selected
			setShowAddTaxModal(true);
		} else {
			const parsedValue = parseFloat(selectedValue);

			const selectedOption = taxList.find(
				(option) => option.tax == selectedValue,
			);
			const updatedSelectedTax = selectedOption || { name: '', tax: 0 }; // Provide a default value when selectedOption is undefined

			if (
				!selectedTaxValue ||
				updatedSelectedTax.tax !== selectedTaxValue.tax
			) {
				// Handle the selection of an existing tax
				setFieldValue(fieldName, updatedSelectedTax);
				handleTaxInputChange(event, index, updatedSelectedTax);
				setSelectedTax(updatedSelectedTax);
			}

			// setSelectedTax(updatedSelectedTax);
		}
	};

	return (
		<>
			<div>
				<Field
					className="w-100"
					name={fieldName}
					type="hidden"
					value={selectedTaxValue && selectedTaxValue.tax}
				/>
				<select className="item-field w-100" onChange={handleSelectChange}>
					<option value="0">Select Tax</option>
					{filteredTaxList.length > 0 &&
						filteredTaxList.map((taxOption, optionIndex) => (
							<option value={taxOption.tax.toString()} key={optionIndex}>
								{taxOption.name} ({taxOption.tax}%)
							</option>
						))}
					<option
						value="addNewTax"
						className="fw-bold"
						onChange={handleSelectChange}>
						+ Add New Tax
					</option>
				</select>
			</div>
		</>
	);
}

export default DropDownForTax;
