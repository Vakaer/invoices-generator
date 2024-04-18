/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react';


import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from '@react-pdf/renderer';

import InvoiceContext from '@/context/invoice/InvoiceContext';
import IInvoiceData, { IItems } from '@/types/invoiceTypes';

const styles = StyleSheet.create({
	fontSmall: {
		fontSize: '12pt',
	},
	page: {
		backgroundColor: '#E4E4E4',
		padding: '20px',
	},
	head: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	logo: {
		width: '100pt',
		height: '100pt',
		backgroundColor: 'transparent',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
		alignItems: 'flex-start',
	},
	invoiceNumber: {
		fontSize: '28px',
		fontWeight: 'ultrabold',
	},
	dates: {
		fontSize: '12px',
		color: 'green',
	},
	FromAndToWrapper: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '20px',
	},
	FromAndTo: {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		gap: '3px',
		padding: '10px',
		alignItems: 'flex-start',
		textAlign: 'left',
	},
	FromAndToHeading: {
		fontWeight: 'ultrabold',
		color: '#000',
	},
	table: {
		display: 'flex',
	},
	column: {
		marginBottom: '16px',
		width: '100%',
	},
	row: {
		border: '1px black solid',
		height: '3em',
		margin: 'auto',
		width: '100%',
	},
	ItemTableHeader: {
		backgroundColor: '#2b2d42',
		padding: '5px',
		display: 'flex',
		color: 'white',
		flexDirection: 'row',
		borderRadius: '5px',
		marginTop: '20px',
		justifyContent: 'space-between',
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		borderBottom: '2px solid gray',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '10px 5px',
		textAlign: 'left',
	},
	itemList: {},
	summary: {
		marginTop: '40px',
		display: 'flex',
		width: '40%',
		marginLeft: 'auto',
	},
	summaryHeading: {
		fontSize: '14px',
		color: 'white',
		backgroundColor: '#2b2d42',
		borderRadius: '5px',
		textAlign: 'center',
		padding: '10px 0px',
	},
	summaryData: {
		display: 'flex',
		flexDirection: 'column',
		gap: '10px',
		marginTop: '10px',
	},
	summarDataInfo: {
		padding: '0px 10px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		fontSize: '12px',
	},
});

interface InvoiceDocumentTestProps {
	data: IInvoiceData;
}

const InvoiceDocumentTest = ({ data }: InvoiceDocumentTestProps) => {
	const { invoiceData } = useContext(InvoiceContext);

	// Usage
	const imagePath = (data.logo && URL.createObjectURL(data.logo)) || ''; // Replace with the actual path to your image

	return (
		<Document>
			<Page size={'A4'} style={styles.page}>
				{/* head  */}
				<View style={styles.head}>
					{imagePath && (
						<View style={styles.logo}>
							<Image
								style={{ objectFit: 'contain', height: '100%' }}
								src={imagePath}
							/>
						</View>
					)}
					<View style={styles.details}>
						<Text style={styles.invoiceNumber}>
							Invoice:{data.invoiceNumber}
						</Text>
						<Text style={styles.dates}>issued on {data.issueDate}</Text>
						<Text style={styles.dates}>due on {data.dueDate}</Text>
					</View>
				</View>
				{/* recipient and sender  */}
				<View style={styles.FromAndToWrapper}>
					<View style={styles.FromAndTo}>
						<Text
							style={[
								styles.FromAndToHeading,
								{ fontSize: '10pt', fontWeight: 'normal' },
							]}>
							From
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.sender.companyName}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.sender.address}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.sender.postalCode}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.sender.city}
						</Text>
					</View>
					<View style={styles.FromAndTo}>
						<Text
							style={[
								styles.FromAndToHeading,
								{ fontSize: '10pt', fontWeight: 'normal' },
							]}>
							To
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.recipient.companyName}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.recipient.address}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.recipient.postalCode}
						</Text>
						<Text
							style={[
								{ fontSize: '10pt', fontWeight: 'normal', color: 'gray' },
							]}>
							{data.recipient.city}
						</Text>
					</View>
				</View>
				{/* items table  */}
				<View>
					<View style={styles.ItemTableHeader}>
						<Text style={[styles.fontSmall]}>Name</Text>
						<Text style={[styles.fontSmall, { flexBasis: '40%' }]}>
							Description
						</Text>
						<Text style={[styles.fontSmall]}>Quantity</Text>
						<Text style={[styles.fontSmall]}>Price</Text>
						<Text style={[styles.fontSmall]}>Tax</Text>
						<Text style={[styles.fontSmall]}>subtotal</Text>
					</View>

					<View style={styles.itemList}>
						<View>
							{data.items &&
								data.items.map((item: IItems, index: number) => (
									<View style={styles.item} key={item.description}>
										<Text style={[styles.fontSmall]}>{item.name}</Text>
										<Text style={[styles.fontSmall, { flexBasis: '40%' }]}>
											{item.description}
										</Text>
										<Text style={[styles.fontSmall]}>{item.quantity}</Text>
										<Text style={[styles.fontSmall]}>
											{invoiceData.currency.symbol}
											{item.unitPrice}
										</Text>
										<Text style={[styles.fontSmall]}>{item.Tax.tax}%</Text>
										<Text style={[styles.fontSmall]}>
											{data.currency.symbol}
											{item.subtotal}
										</Text>
									</View>
								))}
						</View>
					</View>
				</View>
				{/* summary  */}
				<View style={styles.summary}>
					<View style={styles.summaryHeading}>
						<Text>Summary Heading</Text>
					</View>
					<View style={styles.summaryData}>
						<View style={styles.summarDataInfo}>
							<Text>Subtotal: </Text>
							<Text>
								{data.currency.symbol}
								{data.subtotalAmount}
							</Text>
						</View>
						<View style={styles.summarDataInfo}>
							<Text>Tax: </Text>
							<Text>
								{data.currency.symbol}
								{data.taxAmount}
							</Text>
						</View>
						{data.payments && (
							<View style={styles.summarDataInfo}>
								<Text>Payments: </Text>
								<Text>
									{data.currency.symbol}
									{data.payments}
								</Text>
							</View>
						)}
						<View style={styles.summarDataInfo}>
							<Text>Total Amount: </Text>
							<Text>
								{data.currency.symbol}
								{data.invoiceTotal}
							</Text>
						</View>
						{data.payments && (
							<View style={styles.summarDataInfo}>
								<Text>Balance: </Text>
								<Text>
									{data.currency.symbol}
									{data.balance}
								</Text>
							</View>
						)}
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default InvoiceDocumentTest;
