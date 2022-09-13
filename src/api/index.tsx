import { CallData } from "../interfaces/Interfaces";

export default async function apiCall({url, method = 'get', body, headers}: CallData) {
    try {
        const response = await fetch(url, {
            method,
            body,
            headers 
        })
        if(!response.ok){
            return '';
        }
        return response.json();
    } catch (error) {
        Promise.reject(error);
    }
}