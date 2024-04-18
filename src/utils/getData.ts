import axios from 'axios';
import { exceptions } from "../libs/exception"


export const getDataApiCall = async (url: string) => {
	const res = await axios.get(url);
	if (res.data.statusCode === exceptions.OK) {
		return res.data.data
	} else {
		throw new Error(res?.data?.error );
	}
}