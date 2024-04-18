import React, { useState, useEffect, useContext, Children } from 'react';
import Dropzone, { FileError, FileWithPath, useDropzone } from 'react-dropzone';

import { useFormikContext } from 'formik';
import InvoiceContext from '@/context/invoice/InvoiceContext';
import FileUpload from './LogoUploader';
import { AiFillDelete } from 'react-icons/ai';
import { MyFormValues } from '@/types/invoiceTypes';
import { BiErrorCircle } from 'react-icons/bi';

type InvoiceFileUploadWrapperProps = {
	setImageSource: any;
	fieldName: string;
	handleFileChange: () => void;
	imageSource: any;
};
function InvoiceFileUploadWrapper({
	setImageSource,
	fieldName,
	imageSource,
}: InvoiceFileUploadWrapperProps) {
	const { setFieldValue } = useFormikContext<MyFormValues>();

	const { updateFormField } = useContext(InvoiceContext);

	useEffect(() => {
		setImageSource(imageSource);
		setFieldValue('logo', imageSource);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageSource]);

	

	return (
		<Dropzone
			maxFiles={1}
			accept={{ 'image/jpeg': [], 'image/png': [] }}
			onDrop={(acceptedFiles) => {
				const selectedFile = acceptedFiles[0];
				setImageSource(selectedFile);
				if (acceptedFiles) {
					updateFormField(fieldName, selectedFile);
				}
			}}>
			{({ getRootProps, getInputProps, fileRejections }) => (
				<section>
					<div {...getRootProps({ onClick: (evt) => evt.preventDefault() })}>
						<input {...getInputProps()} />
						<FileUpload
							file={imageSource && imageSource}
							/>
						{fileRejections.map(({ file, errors }) => {
							const files = file as FileWithPath;

							return (
								<ul key={files.path} className="m-0 p-0">
									<li className="list-unstyled ">
										{errors.map((e) => (
											<span
												key={e.code}
												className="text-danger d-flex align-items-center gap-2 my-1">
												<BiErrorCircle />
												{e.message}
											</span>
										))}
									</li>
								</ul>
							);
						})}
					</div>
				</section>
			)}
		</Dropzone>
	);
}

export default InvoiceFileUploadWrapper;
