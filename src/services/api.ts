import axios from 'axios';

const api = axios.create({
	//baseURL: 'http://192.168.1.67:3333'

	//wifi Elizete
	baseURL: 'http://192.168.0.106:3333'
	
	//wifi lidia
	//baseURL: 'http://192.168.1.75:3333'
});

export default api;

