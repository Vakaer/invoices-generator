import React, { ChangeEvent, useContext } from 'react';

import { v4 as uuidv4 } from 'uuid';
import {
	FieldArray,
	Field,
	useFormikContext,
	FieldProps,
	FieldArrayRenderProps,
	FormikHelpers,
	useField,
} from 'formik';
import DropDownForTax from '../tax/DropdownForTax';
import ItemsList from './ItemsList';
import { MdDone } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';

import { IItems, MyFormValues } from '@/types/invoiceTypes';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import useWindowSize from '@/cutomHooks/useWindowSize';

// Define the props for the ItemFields component
type ItemFieldsProps = {
	setConfirmedItems: React.Dispatch<any>;
	confirmedItems: any;
	editItemIndex: number | null;
	setEditItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
	isItemConfirmed: (index: number) => any;
	handleEdit: (index: number) => void;
};

function ItemFields({
	// items,
	setConfirmedItems,
	editItemIndex,
	handleEdit,
	isItemConfirmed,
	confirmedItems,
}: ItemFieldsProps) {
	const {
		handleBlur,
		handleChange,
		setFieldValue,
		values,
		errors,
		touched,
		setTouched,
	} = useFormikContext<MyFormValues>();
	const { removeItem, addItemToItems, updateItemFields } =
		useContext(InvoiceContext);
	const { width } = useWindowSize();

	// Extract the items array from Formik's values
	const items: IItems[] = values.items;

	const subtotal = (index: number) => {
		return items[index].subtotal;
	};

	const updateItem = async (
		index: number,
		updateFields: Record<string, any>,
	) => {
		// Update the item's fields
		Object.assign(items[index], updateFields);

		// Update the form field with the new items array
		setFieldValue('items', items, false);

		// Update additional item fields if needed
		updateItemFields(index, updateFields);
	};

	const handleQuantityInputChange = async (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const quantity = parseInt(e.target.value);
		const unitPrice = items[index].unitPrice;
		const subtotal = calculateSubtotal(quantity, unitPrice);

		// Update the item's quantity and subtotal
		items[index].quantity = quantity;
		items[index].subtotal = subtotal;

		// Update the form field with the new items array
		setFieldValue('items', items, false);

		updateItemFields(index, {
			quantity: quantity,
			subtotal: subtotal,
		});
	};

	const handleNameInputChange = async (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const name = e.target.value;

		updateItem(index, { name });
	};

	const handleTaxInputChange = async (
		e: ChangeEvent<HTMLSelectElement>,
		index: number,
		selectedOption: { name: string; tax: number },
	) => {
		const tax = selectedOption.tax;
		const taxName = selectedOption.name;
		const quantity = items[index].quantity;
		const unitPrice = items[index].unitPrice;
		const subtotal = calculateSubtotal(quantity, unitPrice);

		updateItem(index, { Tax: { name: taxName, tax }, subtotal });
	};

	const handleUnitPriceInputChange = async (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const unitPrice = parseFloat(e.target.value);
		const quantity = items[index].quantity;
		const tax = items[index].Tax.tax;
		const subtotal = calculateSubtotal(quantity, unitPrice);

		updateItem(index, { unitPrice, subtotal });
	};

	// Calculate the subtotal of an item based on quantity, unit price, and tax rate
	const calculateSubtotal = (quantity: number, unitPrice: number) => {
		// const taxAmount = (quantity * unitPrice * taxRate) / 100;
		const subtotalAmount = quantity * unitPrice;

		return subtotalAmount;
	};
	const updateAndConfirmItem = (
		index: number,
		arrayHelpers: FieldArrayRenderProps,
	) => {
		const e = errors.items?.[index];
		const t = touched.items?.[index];
		if (e || !t) {
			// Handle the case where there are errors or untouched fields
			// You can show an error message or take appropriate action
			

			return;
		}
		const updatedItem = items[index];
		const subTotalAmount = calculateSubtotal(
			updatedItem.quantity,
			updatedItem.unitPrice,
		);
		const newItem = {
			id: updatedItem.id ? updatedItem.id : uuidv4(),
			name: updatedItem.name,
			quantity: updatedItem.quantity,
			unitPrice: updatedItem.unitPrice,
			description: updatedItem.description,
			Tax: updatedItem.Tax,
			subtotal: subTotalAmount,
		};

		setFieldValue('items', [...items, newItem], false);
		updateItemFields(index, newItem);

		// Set the item as confirmed and remove it from the array
		setConfirmedItems([...confirmedItems, index]);
		arrayHelpers.remove(index);
	};

	const handleAddNewItem = (arrayHelpers: FieldArrayRenderProps) => {
		// Check if there is any unconfirmed item
		const unconfirmedItemsExist = items.some(
			(item, index) => !isItemConfirmed(index),
		);
		if (!unconfirmedItemsExist) {
			// Create an initial object for the new item
			const newItem: IItems = {
				id: uuidv4(),
				name: '',
				description: '',
				quantity: 0,
				unitPrice: 0,
				subtotal: 0,
				Tax: {
					name: '',
					tax: 0,
				},
			};

			// Use the addItemToItems method to add the new item to the context
			arrayHelpers.push(newItem);
			addItemToItems(newItem);
		}
	};

	const removeItemHanlder = (
		index: number,
		arrayHelpers: FieldArrayRenderProps,
	) => {
		arrayHelpers.remove(index);
		removeItem(index);
	};

	function validateUsername(value: any) {
		let error;
		if (value === 'admin') {
			error = 'Nice try!';
		}

		return error;
	}

	return (
		<tbody className="table-fields position-relative">
			<FieldArray
				name="items"
				render={(arrayHelpers) => (
					<>
						{items && items.length > 0
							? items.map((item: IItems, index: any) => {
									const error = errors.items?.[index];
									const touch = touched.items?.[index];

									console.log('touched', touch);

									console.log('error', error);

									return (
										<React.Fragment key={index}>
											{isItemConfirmed(index) ? (
												<ItemsList
													key={item.id}
													item={item}
													index={index}
													handleEdit={handleEdit}
												/>
											) : (
												<React.Fragment>
													<tr className=" mt-3">
														<td scope="row">
															<Field
																type="text"
																name={`items.${index}.name`}
																onChange={handleChange}
																onBlur={handleBlur}>
																{(fieldProps: FieldProps<string>) => (
																	<input
																		placeholder="Item name"
																		id={`items.${index}.name`}
																		className={`w-100 item-field 
																		${
																			error &&
																			touch &&
																			typeof error === 'object' &&
																			typeof error === 'object' &&
																			error.name &&
																			touch.name &&
																			'border-danger'
																		}
																		`}
																		name={fieldProps.field.name}
																		value={fieldProps.field.value}
																		onChange={(e) => {
																			fieldProps.form.setFieldValue(
																				fieldProps.field.name,
																				e.target.value,
																			);
																			handleNameInputChange(e, index);
																		}}
																		onFocus={(e) => {
																			fieldProps.form.setFieldTouched(
																				fieldProps.field.name,
																				true,
																			);
																		}}
																	/>
																)}
															</Field>
														</td>

														<td>
															<Field name={`items.${index}.quantity`}>
																{(fieldProps: FieldProps<string>) => (
																	<input
																		type="number"
																		id="quantity"
																		min={0}
																		className={`w-100 item-field ${
																			error &&
																			touch &&
																			typeof error === 'object' &&
																			typeof error === 'object' &&
																			error.quantity &&
																			touch.quantity &&
																			'border-danger'
																		}`}
																		name={fieldProps.field.name}
																		value={
																			Number(fieldProps.field.value) > 0
																				? fieldProps.field.value
																				: ''
																		}
																		onChange={(e) => {
																			fieldProps.form.setFieldValue(
																				fieldProps.field.name,
																				e.target.value,
																			);

																			handleQuantityInputChange(e, index);
																		}}
																		onFocus={(e) => {
																			fieldProps.form.setFieldTouched(
																				fieldProps.field.name,
																				true,
																			);
																		}}
																	/>
																)}
															</Field>
														</td>
														<td>
															<div className="input-group">
																{/* <span className='input-group-text fw-bold bg-transparent '>
															{values.currency.symbol}
														</span> */}
																<Field name={`items.${index}.unitPrice`}>
																	{(fieldProps: FieldProps<string>) => (
																		<input
																			type="number"
																			id="unitPrice"
																			min={0}
																			className={`w-100 item-field ${
																				error &&
																				touch &&
																				typeof error === 'object' &&
																				typeof error === 'object' &&
																				error.unitPrice &&
																				touch.unitPrice &&
																				'border-danger'
																			}`}
																			name={fieldProps.field.name}
																			value={
																				Number(fieldProps.field.value) > 0
																					? fieldProps.field.value
																					: ''
																			}
																			onChange={(e) => {
																				fieldProps.form.setFieldValue(
																					fieldProps.field.name,
																					e.target.value,
																				);
																				handleUnitPriceInputChange(e, index);
																			}}
																			onFocus={(e) => {
																				fieldProps.form.setFieldTouched(
																					fieldProps.field.name,
																					true,
																				);
																			}}
																		/>
																	)}
																</Field>
															</div>
														</td>

														<td>
															<Field name={`items.${index}.Tax`}>
																{(fieldProps: FieldProps<string>) => (
																	<DropDownForTax
																		fieldName={`items.${index}.Tax`}
																		index={index}
																		item={item}
																		handleTaxInputChange={handleTaxInputChange}
																		selectedTaxValue={item.Tax}
																	/>
																)}
															</Field>
														</td>
														<td className="d-none d-lg-block ">
															<div>
																<p className="text-center">
																	{values.currency.symbol}
																	{subtotal(index)}
																</p>
															</div>
														</td>
													</tr>
													<tr className="mb-3 mt-3">
														<td colSpan={4}>
															<Field
																className="w-100 item-field"
																name={`items.${index}.description`}
																placeholder="description"
																onChange={handleChange}
																onBlur={handleBlur}
															/>
														</td>
														{width < 992 && (
															<td>
																<p>
																	<div className="fw-bold ">Subtotal:</div>
																	{values.currency.symbol}
																	{subtotal(index)}
																</p>
															</td>
														)}
														<td className=" items-action-btn d-flex justify-content-end  align-items-center ">
															{/* delete button  */}
															<button
																type="button"
																className="btn"
																onClick={() =>
																	removeItemHanlder(index, arrayHelpers)
																}>
																<MdDelete className="text-danger fs-5" />
															</button>
															{/* save/confirm button */}
															<button
																type="button"
																className="btn "
																onClick={() => {
																	updateAndConfirmItem(index, arrayHelpers);
																}}>
																{editItemIndex === index ? (
																	<MdDone className="text-primary fs-5 " />
																) : (
																	<GiConfirmed className="text-success fs-5" />
																)}
															</button>
														</td>
													</tr>
												</React.Fragment>
											)}
										</React.Fragment>
									);
							  })
							: null}
						<tr>
							<td colSpan={5}>
								<button
									type="button"
									className="mt-3 btn  btn-primary fw-bold text-center  p-3  col-12 "
									onClick={() => {
										handleAddNewItem(arrayHelpers);
									}}>
									Add Item
								</button>
							</td>
						</tr>
					</>
				)}
			/>
		</tbody>
	);
}

export default ItemFields;
