import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ProductService{
	
	// constructor(){}

	getProducts() {
		const url = `${API_URL}/student_system/students/`;
		return axios.get(url).then(response => response.data);
	}

	
	getProductById(sid) {
		const url = `${API_URL}/student_system/students/?sid=${sid}`;
		return axios.get(url).then(response => response.data);
	}

	deleteProduct(sid){
		const url = `${API_URL}/student_system/students/?sid=${sid}`;
		return axios.delete(url).then(response => response.data);
	}

	createProduct(student){
		const url = `${API_URL}/student_system/students/`;
		return axios.post(url,student);
	}

	updateProduct(student){
		const url = `${API_URL}/student_system/students/`;
		return axios.put(url,student).then(response => response.data);
	}
}