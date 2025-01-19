import axios from "axios";
const APP_URL = 'https://5h6jt5smlg.execute-api.us-east-1.amazonaws.com/dev/staffDetails';

export const enrollNewStaff = async (staffDetails , file=false) => {
    const headers = file ? {'Content-Type': 'multipart/form-data'} : {'Content-Type': 'application/json'}
    try{
        const response = await axios.post(APP_URL,staffDetails, {headers});
        return response.data;
    }catch(error){
        console.log(error);
    };
};


export const getStaffDetails = async () => {
    try{
        const response = await axios.get(APP_URL);
        return response.data;
    }catch(error){
        console.log(error);
    };
};

export const updateStaffDetails = async (staffDetails , file=false) => {
    for (let entry of staffDetails.entries()) {
        console.log(entry); // Logs all entries
      }
    const headers = file ? {'Content-Type': 'multipart/form-data'} : {'Content-Type': 'application/json'}
    try{
        const response = await axios.put(APP_URL,staffDetails, {headers});
        return response.data;
    }catch(error){
        console.log(error);
    };
};

export const deleteStaff = async (id) => {
    try{
        const response = await axios.delete(`${APP_URL}/${id}`);
        return response.data;
    }catch(error){
        console.log(error);
    };
};

export const uploadBulkStaffData = async (csvData , file=false) => {
    const headers = file ? {'Content-Type': 'multipart/form-data'} : {'Content-Type': 'application/json'}
    try{
        const requests = csvData.map((record) =>
            axios.post(APP_URL, record, { headers })
        );
        const responses = await Promise.all(requests);
        return {
            message: 'success',
            responses: responses.map((response) => response.data),
        };
    }catch(error){
        console.log(error);
    };
};