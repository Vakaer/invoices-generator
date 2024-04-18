
import InvoiceForm from '@/components/invoice/form/InvoiceForm';
import InvoiceState from '@/context/invoice/InvoiceProvider';

import React from 'react';

function page() {
	return (
		<div className="border-1 border-black mx-auto p-6 min-vh-100 ">
			<div className="container-fluid container-xl container-xxl ">
				<div className="row col-xl-10 col-xxl-10 col-12 mx-auto h-auto  ">
					<InvoiceState>
						<InvoiceForm />
					</InvoiceState>
				</div>
			</div>
		</div>
	);
}

export default page;
