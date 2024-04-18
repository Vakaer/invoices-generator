import { useContext, useRef, useState } from 'react';
import { currencies } from '@/data/currencies';
import InvoiceContext from '@/context/invoice/InvoiceContext';

import { ICurrency, MyFormValues } from '@/types/invoiceTypes';

import { useFormikContext } from 'formik';
import { MdArrowDropDown } from 'react-icons/md';

function DropdownForCurrency() {
	const { updateFormField } = useContext(InvoiceContext);
	const [search, setSearch] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { setFieldValue, values } = useFormikContext<MyFormValues>();

	const filteredCurrencies = currencies.filter((currency) =>
		currency.code.toUpperCase().includes(search.toUpperCase()),
	);

	// Handle dropdown toggle
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Handle selecting a currency
	const handleCurrencySelection = (currency: ICurrency) => {
		const { code, name, symbol } = currency;
		setFieldValue('currency', currency);
		updateFormField('currency', currency);
		setIsDropdownOpen(false);
	};

	const dropdownIconRotate = {
		rotate: isDropdownOpen ? '0deg' : '180deg',
	};

	const dropdownTransition = {
		transition: 'all .3s linear',
		WebkitTransition: 'all .3s linear',
		zIndex: 50,
		top: '95%',
	};

	return (
		<div className="currency-dropdown position-relative col-8">
			<div className="selected-currency rounded-2 mx-2">
				<div style={{ cursor: 'pointer' }} className='d-flex justify-content-between py-2 px-2' onClick={toggleDropdown}>
					<span>
						{values.currency.code} ({values.currency.symbol})
					</span>
					<i className="input-group-append">
						<MdArrowDropDown className="fs-4" style={dropdownIconRotate} />
					</i>
				</div>
			</div>
			{isDropdownOpen && (
				<div
					className="currency-content mt-2 px-2 col-12  shadow-lg position-absolute bg-white "
					style={dropdownTransition}
					ref={dropdownRef}>
					<input
						type="text"
						className="my-2 item-field w-100 "
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<ul
						className="currency-list ps-0 overflow-y-scroll "
						style={{ height: '130px' }}>
						{filteredCurrencies.map((currency) => (
							<li
								className="list-unstyled text-center py-1 currency"
								key={currency.code}
								onClick={() => handleCurrencySelection(currency)}>
								{currency.code} ({currency.symbol})
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default DropdownForCurrency;
