import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        // Stop global loader here
        return processResponse(response);
    },

    function (error){
        //Stop global loader here
        return Promise.reject(ProcessError(error));
    }
)

///////////////////////////
// If success -> return { isSuccess: true, data: Object}
// If fail -> return { ifFailure: true, status: string, , msg: string: code: int}
///////////////////////////
const processResponse = (response) =>{
    if(response?.status === 200){
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure:  true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}


///////////////////////////
// If success -> return { isSuccess: true, data: Object}
// If fail -> return { ifFailure: true, status: string, , msg: string: code: int}
///////////////////////////
const ProcessError = (error) =>{
    if(error.response){
        //Request made and serverd responded with a status other than that falls out of range 2.x.x
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if(error.request){
        //Request made but no response was received
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else {
        //Something happened in setting up request that triggers an error
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
    axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        responseType: value.responseType,
        onUploadProgress: function(progressEvent){
            if(showUploadProgress){
                let percentageCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total);
                showUploadProgress(percentageCompleted);
            }
        },
        onDownloadProgress: function(progressEvent){
            if(showDownloadProgress){
                let percentCompleted = Math.round((progressEvent.loaded * 100 ) / progressEvent.total);
                showDownloadProgress(percentCompleted);
            }
        }
    });  
}

export { API };