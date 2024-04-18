import getImageSourceFromFile from '@/utils/getImageSOurceFromFile';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';

type FileUploadProps = {
	file: any;
};

function FileUpload({ file }: FileUploadProps) {
	const [imageSrc, setImageSrc] = useState<any>();
	const iconStyle = {
		width: '30px',
		height: '30px',
	};
	useEffect(() => {
		if (file) {
			getImageSourceFromFile(file)
				.then((src) => {
					setImageSrc(src);
				})
				.catch((error) => {
					console.error('Error reading the file:', error);
				});
		}
	}, [file]);

	return (
		<div>
			{file ? (
				<div className="py-2 ps-2 generic-input  d-flex align-items-center  gap-2">
					<img
						src={imageSrc}
						style={{ width: '200px', height: '200px' }}
						alt="Uploaded Image"
						className="object-fit-contain "
					/>
				</div>
			) : (
				<div className="generic-input d-flex align-items-center py-4 gap-2">
					<BsFillImageFill style={iconStyle}/>
					<span className="text-sm">Choose a logo or drop it here</span>
				</div>
			)}
		</div>
	);
}

export default FileUpload;
