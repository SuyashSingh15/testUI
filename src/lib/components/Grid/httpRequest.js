import React from 'react';
import axios from 'axios';
import  {useSnackbar} from '../SnackBar/index';
let pendingRequests = 0;
const transport = axios.create({ withCredentials: true });
const HTTP_STATUS_CODES = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
const getFormData = (props) => {
    let formData = new FormData();
    for (let key in props) {
        if (typeof props[key] == "object") {
            formData.append(key, JSON.stringify(props[key]));
        } else {
            formData.append(key, props[key]);
        }
    }
    return formData;
}

const exportRequest = (url, query) => {
    const newURL = new URL(url);
    for (let key in query) {
        const value = typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key];
        newURL.searchParams.append(key, value);
    }
    window.open(newURL, '_blank').focus();
}

const request = async ({ url, params = {}, history, jsonPayload = false, additionalParams = {}, additionalHeaders = {}, disableLoader = false }) => {
   const snackbar = useSnackbar();

    if (params.exportData) {
        return exportRequest(url, params);
    }
    pendingRequests++;
    let reqParams = {
        method: 'POST',
        credentials: 'include',
        url: url,
        headers: jsonPayload ? { ...additionalHeaders } : { 'Content-Type': 'multipart/form-data', ...additionalHeaders },
        ...additionalParams
    };
    if (params) {
        reqParams.data = jsonPayload ? params : getFormData(params);
    }

    try {
        let response = await transport(reqParams);
        pendingRequests--;
        let data = response.data;
        if (response) {
            if (response.status === 200) {
                let json = response.data;
                if (json.success === false) {
                    if (json.info === 'Session has expired!') {
                        snackbar.showError('error: Your session has expired. Please login again.');
                        history.push('/login');
                        return;
                    }
                    else if (response.status === 200) {
                        return data;
                    }
                }
                else {
                    return data;
                }
            }
        } else {
            return data;
        }
    } catch (ex) {
        pendingRequests--;
        if (ex?.response?.status === 401) {
            snackbar.showError('error: You are not authorized to access this page');
            history.push('/login');
        } else if (ex?.response?.status === 500) {
            snackbar.showError(`error: ${ex?.response?.data?.info}` );
        }
        else {
            console.error(ex);
            return { error: ex.response };
        }
    }

    return <></>
}

export {
    HTTP_STATUS_CODES,
    transport
};

export default request;