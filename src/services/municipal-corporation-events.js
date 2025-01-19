import axios from "axios";
const APP_URL = 'https://5h6jt5smlg.execute-api.us-east-1.amazonaws.com/dev/mediaUpload';

export const addNewEvent = async (eventData , file=false) => {
    const headers = file ? {'Content-Type': 'multipart/form-data'} : {'Content-Type': 'application/json'}
    try{
        const response = await axios.post(`${APP_URL}?uploadType=mcCorner`,eventData, {headers});
        return response.data;
    }catch(error){
        console.log(error);
    };
}