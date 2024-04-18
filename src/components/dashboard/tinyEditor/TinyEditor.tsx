'use client';
import React, { useState, useEffect } from 'react';

import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
	content: string;
	onContentChange: (newContent: string) => void;
}

const TinyEditor: React.FC<TinyEditorProps> = ({
	content,
	onContentChange,
}) => {
	const TinyKey = process.env.REACT_APP_TINY_KEY;

	// Use a local state to manage the content of the TinyMCE editor
	const [editorContent, setEditorContent] = useState(content);

	useEffect(() => {
		// Update the editor content when the content prop changes
		setEditorContent(content);
	}, [content]);

	const handleEditorChange = (newText: string) => {
		setEditorContent(newText);
		onContentChange(newText);
	};

	return (
		<Editor
			apiKey={TinyKey}
			textareaName="content"
			value={editorContent} // Set the value from local state
			onEditorChange={(newText) => {
				handleEditorChange(newText);
			}}
			init={{
				height: 200,
				menubar: true,
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
					'code',
				],
				toolbar:
					'undo redo | formatselect | ' +
					'bold italic backcolor | alignleft aligncenter ' +
					'alignright alignjustify | bullist numlist outdent indent | ' +
					'removeformat | help' +
					'code',
				content_style:
					'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px;}',
			}}
		/>
	);
};

export default TinyEditor;
