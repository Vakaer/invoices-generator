import React, { useContext } from 'react';
import { ErrorMessage, Field, FieldProps, useFormikContext } from 'formik';
import { MyFormValues } from '@/types/invoiceTypes';
import InvoiceFileUploadWrapper from '../fileUpload/LogoUploadWrapper';
import { AiFillDelete } from 'react-icons/ai';
import InvoiceContext from '@/context/invoice/InvoiceContext';

interface FileUploadFieldProps {
	fieldName: string;
	setImageSource: (imageSrc: string) => void;
	handleFileChange: () => void;
	imageSource: any;
}

function LogoUploadField({
	fieldName,
	setImageSource,
	handleFileChange,
	imageSource,
}: FileUploadFieldProps) {
	const { handleChange, handleBlur, errors, touched } =
		useFormikContext<MyFormValues>();
	const { updateFormField } = useContext(InvoiceContext);
	const resetImageState = () => {
		setImageSource('');
		updateFormField('logo', null);
	};

	return (
		<div className="mb-3 d-flex  ">
			<div>
				<Field
					type="file"
					name={fieldName}
					className="w-full"
					onChange={handleChange}
					onBlur={handleBlur}>
					{(fieldProps: FieldProps<string>) => (
						<InvoiceFileUploadWrapper
							setImageSource={setImageSource}
							fieldName={fieldName}
							handleFileChange={handleFileChange}
							imageSource={imageSource}
						/>
					)}
				</Field>
				{errors.logo && touched.logo && (
					<div className="text-danger">{errors.logo}</div>
				)}
				<ErrorMessage name={fieldName} />
			</div>
			{imageSource && (
				<AiFillDelete className="text-danger ms-2 my-auto " onClick={resetImageState} />
			)}
		</div>
	);
}

export default LogoUploadField;
