
export function getEnv(name){
	return process.env[name].trim() || false;
}

export function getBaseUrl(){
	return process.env.REACT_APP_API_URL || 'http://localhost:3000/';
}

export function logError(error) {
	console.log(error);
}