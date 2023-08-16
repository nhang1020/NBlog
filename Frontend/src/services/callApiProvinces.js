import axios from 'axios';
const host = 'https://provinces.open-api.vn/api/';
const fetchProvinces = async () => {
    try {
        let res = await axios.get(`${host}?depth=1`)
        return res.data;
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};
const fetchDistricts = async (api) => {
    try {
        let res = await axios.get(`${host}${api}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};
const fetchWards = async (api) => {
    try {
        let res = await axios.get(`${host}${api}`)
        return res.data;
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};

export {
    fetchProvinces,
    fetchDistricts,
    fetchWards
}