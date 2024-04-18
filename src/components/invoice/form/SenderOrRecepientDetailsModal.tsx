import React from 'react';
import RecipientDetailsForm from './recipient/RecipientDetailsForm';
import SenderDetailsForm from './sender/SenderDetailsForm';

type SenderOrRecepientDetailsModalProps = {
	partyInfo: 'sender' | 'reciever' | null;
	setPartyInfo: React.Dispatch<
		React.SetStateAction<'sender' | 'reciever' | null>
	>;
};
function SenderOrRecepientDetailsModal({
	partyInfo,
	setPartyInfo,
}: SenderOrRecepientDetailsModalProps) {
	return (
		<>
			{partyInfo === 'sender' && (
				<SenderDetailsForm setPartyInfo={setPartyInfo} />
			)}
			{partyInfo === 'reciever' && (
				<RecipientDetailsForm setPartyInfo={setPartyInfo} />
			)}
			hello
		</>
	);
}

export default SenderOrRecepientDetailsModal;