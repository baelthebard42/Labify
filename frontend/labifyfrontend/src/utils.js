import axiosInstance from "./axios";


export async function getUser(id){
   const res = await axiosInstance.get(`labify/getUser/${id}`)
   return res.data
}