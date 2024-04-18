import React from 'react'

export default function getImageSourceFromFile(file: File | null): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject("File is not provided.");
			
			return;
		}

		const reader = new FileReader();

		reader.onload = (event) => {
			if (event.target && typeof event.target.result === "string") {
				const src: string = event.target.result;
				resolve(src);
			} else {
				reject("Invalid file format.");
			}
		};

		reader.onerror = (error) => {
			reject(error);
		};

		reader.readAsDataURL(file);
	});
}
