import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TinyEditor from '../tinyEditor/TinyEditor';

import '@/app/dashboard/globalDashboard.scss';
import { useFormikContext } from 'formik';
import { IContent, ITool } from '@/types/toolTypes';

// Define constants for content types
const CONTENT_TYPES = {
	TEXT: 'text',
	TEXTAREA: 'textarea',
	RICH_TEXT_EDITOR: 'richtexteditor',
};

// Define the structure of an input field
interface InputField {
	key: string;
	value: string;
	textFieldType: string;
}

// Define the structure of dynamic form props
interface ContentFieldsProps {
	contentData: Record<string, IContent> | undefined;
}

interface ContentFieldProps {
	field: InputField;
	index: number;
	handleFieldChange: (
		index: number,
		fieldType: 'key' | 'value',
		newValue: string,
	) => void;
	handleEditorChange: (newContent: string, index: number) => void;
	handleDeleteField: (index: number) => void;
}

// Extract the rendering of each field into a separate component
const ContentField = ({
	field,
	index,
	handleFieldChange,
	handleEditorChange,
	handleDeleteField,
}: ContentFieldProps) => {
	return (
		<div className="row py-2" key={index}>
			<div className="col-4 g-0">
				{/* Input for Key */}
				<input
					type="text"
					placeholder="Key"
					value={field.key}
					className="form-control text-gray fw-500 inputField d-block w-100"
					onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
				/>
			</div>
			{/* Conditional rendering based on fieldType */}
			{field.textFieldType === CONTENT_TYPES.TEXTAREA ? (
				<div className="col-7 pe-0">
					{/* Textarea for Content */}
					<textarea
						placeholder="Content"
						value={field.value}
						className="form-control text-gray fw-500 inputField d-block w-100"
						onChange={(e) =>
							handleFieldChange(index, 'value', e.target.value)
						}></textarea>
				</div>
			) : field.textFieldType === CONTENT_TYPES.RICH_TEXT_EDITOR ? (
				<div className="col-7 pe-0">
					{/* TinyEditor for Rich Text Editor */}
					<TinyEditor
						content={field.value}
						onContentChange={(newContent) =>
							handleEditorChange(newContent, index)
						}
					/>
				</div>
			) : (
				<div className="col-7 pe-0">
					{/* Input for Value */}
					<input
						type="text"
						placeholder="Value"
						value={field.value}
						className="form-control text-gray fw-500 inputField d-block w-100"
						onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
					/>
				</div>
			)}
			<div className="col-1 d-flex justify-content-end">
				{/* Delete button */}
				<span
					onClick={() => handleDeleteField(index)}
					className="text-danger cursor-p fs-20">
					<RiDeleteBin6Line />
				</span>
			</div>
		</div>
	);
};

// Main component
function ContentFields({ contentData }: ContentFieldsProps) {
	const { setFieldValue } = useFormikContext<ITool>();
	const [selectedOption, setSelectedOption] = useState<string>(
		CONTENT_TYPES.TEXT,
	);
	const [inputFields, setInputFields] = useState<InputField[]>([
		{ key: '', value: '', textFieldType: CONTENT_TYPES.TEXT },
	]);

	useEffect(() => {
		// Convert contentData into an array of InputFields
		const convertedArray =
			contentData &&
			Object.entries(contentData).map(([key, value]) => ({
				key: key,
				value: value.value,
				textFieldType: value.textFieldType,
			}));

		// Update the inputFields state
		setInputFields(convertedArray || []);
	}, [contentData]);

	// Handler for editor content change
	const handleEditorChange = (newContent: string, index: number) => {
		const updatedFields = [...inputFields];
		updatedFields[index].value = newContent;
		setInputFields(updatedFields);
		setFieldValue('content', updatedFields);
	};

	// Handler for selecting field type
	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
	};

	// Transform array of InputFields into key-value pairs
	function transformToKeyValuePair(data: InputField[]) {
		const transformedData = data.reduce((acc: any, item: any) => {
			const { key, ...rest } = item;
			acc[key] = rest;

			return acc;
		}, {});

		return transformedData;
	}

	// Handler for adding a new field
	const handleAddField = () => {
		const newField: InputField = {
			key: '',
			value: '',
			textFieldType: selectedOption,
		};
		setInputFields([...inputFields, newField]);
		const data = transformToKeyValuePair([...inputFields, newField]);
		setFieldValue('content', data);
	};

	// Handler for changing a field value
	const handleFieldChange = (
		index: number,
		fieldType: 'key' | 'value',
		newValue: string,
	) => {
		const updatedFields = [...inputFields];
		updatedFields[index][fieldType] = newValue;
		setInputFields(updatedFields);
		const data = transformToKeyValuePair(updatedFields);
		setFieldValue('content', data);
	};

	// Handler for deleting a field
	const handleDeleteField = (index: number) => {
		const updatedFields = [...inputFields];
		updatedFields.splice(index, 1);
		setInputFields(updatedFields);
		setFieldValue('content', updatedFields);
	};

	return (
		<div className="container">
			{/* Render each ContentField */}
			{inputFields.map((field, index) => (
				<ContentField
					key={index}
					field={field}
					index={index}
					handleFieldChange={handleFieldChange}
					handleEditorChange={handleEditorChange}
					handleDeleteField={handleDeleteField}
				/>
			))}
			{/* Additional fields for selecting type and adding a new row */}
			<div className="row pt-2">
				<div className="col-6 g-0">
					{/* Select field type */}
					<select
						value={selectedOption}
						onChange={handleSelectChange}
						className="text-gray fw-500 inputField d-block w-100">
						<option value={CONTENT_TYPES.TEXT}>Input Fields</option>
						<option value={CONTENT_TYPES.TEXTAREA}>Text Area</option>
						<option value={CONTENT_TYPES.RICH_TEXT_EDITOR}>
							Rich Text Editor
						</option>
					</select>
				</div>
				<div className="col-4">
					{/* Button to add a new row */}
					<span
						onClick={handleAddField}
						className="btn submit-button text-white">
						Add Row
					</span>
				</div>
			</div>
		</div>
	);
}

export default ContentFields;
