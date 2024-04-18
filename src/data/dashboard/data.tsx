import { SlEnvolopeLetter } from 'react-icons/sl';
import { ImImages } from 'react-icons/im';
import { LiaToolsSolid } from 'react-icons/lia';
import { TfiWrite } from 'react-icons/tfi';
import { RiAdminLine } from 'react-icons/ri';
import { MdOutlineDashboard } from 'react-icons/md';

export const Data = [
	{
		id: '1',
		toolname: 'Rounding Calculator',
		parent: 'Rounding Calculator',
		language: 'English/en',
	},
	{
		id: '2',
		toolname: 'Rounding Calculator',
		parent: 'Rounding Fractions Calculator',
		language: 'English/en',
	},
	{
		id: '9',
		toolname: 'Rounded Million Calculator',
		parent: 'Rounded to the Nearest Million Calculator',
		language: 'English/en',
	},
	{
		id: '10',
		toolname: 'Rounded Billion Calculator',
		parent: 'Rounded to the Nearest Billion Calculator',
		language: 'English/en',
	},
];

export interface IAccordionItem {
	id: string;
	mainUrl: string;
	icon?: React.JSX.Element;
	title: string;
	items: ISubItem[];
}

export interface ISubItem {
	id: string;
	label: string;
	url: string;
}
export const accordionData: IAccordionItem[] = [
	// {
	// 	id: 'dashboard',
	// 	title: 'Dashboard',
	// 	mainUrl: '/dashboard/invoicedashboard',
	// 	icon: <MdOutlineDashboard />,
	// 	items: [],
	// },
	{
		id: 'admins',
		title: 'Admins',
		mainUrl: '#',
		icon: <RiAdminLine />,
		items: [
			{
				id: 'item1',
				label: 'item one',
				url: '',
			},
			{
				id: 'item2',
				label: 'item two',
				url: '',
			},
		],
	},
	{
		id: 'blogs',
		title: 'Blogs',
		mainUrl: '/dashboard/invoicedashboard/blog',
		icon: <TfiWrite />,
		items: [
			{
				id: 'bloglist',
				label: 'List',
				url: '/dashboard/invoicedashboard/blog/list',
			},
			{
				id: 'blogadd',
				label: 'Add',
				url: '/dashboard/invoicedashboard/blog/add',
			},
			{
				id: 'blogtrashed',
				label: 'Trash',
				url: '/dashboard/invoicedashboard/blog/trashed',
			},
		],
	},
	{
		id: 'tool',
		title: 'Tools',
		icon: <LiaToolsSolid />,
		mainUrl: '/dashboard/invoicedashboard/tool',
		items: [
			{
				id: 'toollist',
				label: 'List',
				url: '/dashboard/invoicedashboard/tool/list',
			},
			{
				id: 'tooladd',
				label: 'Add',
				url: '/dashboard/invoicedashboard/tool/add',
			},
			{
				id: 'tooltrashed',
				label: 'Trash',
				url: '/dashboard/invoicedashboard/tool/trashed',
			},
		],
	},
	{
		id: 'media',
		title: 'Media',
		icon: <ImImages />,
		mainUrl: '/dashboard/invoicedashboard/media',
		items: [
			{
				id: 'mediaadd',
				label: 'Add',
				url: '/dashboard/invoicedashboard/media/add',
			},
			{
				id: 'mediatrash',
				label: 'Trash',
				url: '/dashboard/invoicedashboard/media/trash',
			},
		],
	},
	{
		id: 'contacts',
		title: 'Contacts',
		mainUrl: '#',
		icon: <SlEnvolopeLetter />,
		items: [
			{
				id: 'item1',
				label: 'item one',
				url: '',
			},
			{
				id: 'item2',
				label: 'item two',
				url: '',
			},
		],
	},
];
