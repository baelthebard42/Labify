import axios from 'axios'

const axiosInstance= axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? 'Bearer '+localStorage.getItem('access_token') : null, //specifying the authorization header so wont need to do it in every request
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})

//code for refreshing tokens once they expire

axiosInstance.interceptors.response.use(
    (response)=>{ //if no errors
        return response;
    },
    async function (error){ //if errors during request
        const originalRequest=error.config

        //bunch of error handling codes i didnt bother to copy paste
       

        // the part where we use refresh token to refresh the access token

        if (
            error.response.data.code==='token_not_valid' && //these 3 need to be valid for refreshing the token
            error.response.status===401 &&
            error.response.statusText==='Unauthorized'
        ){
            const refreshToken=localStorage.getItem('refresh_token');

            if (refreshToken){
  
              //we first extract the expiry from refresh token
  
              const tokenParts=JSON.parse(atob(refreshToken.split('.')[1])); 
  
              /*jwt has 3 divisions separated by a '.' so doing the split will create an array having 3 parts. The [1] contains the second part which 
              corresponds to the payload. The atob function then decodes the base64 encoded payload string. Finally, the JSON.parse converts the decoded 
              data into JS objects. 
               */
  
              const now=Math.ceil(Date.now()/1000) //calculates current time stamp in seconds. Date.now() returns time stamp in milliseconds and Math.ceil converts it to a whole number
              console.log(tokenParts.exp); //tokenParts, now an object has the exp member that consists of it's expiry time.
  
              if (tokenParts.exp > now){
      console.log('refreshing token...')
                  return axiosInstance.post('api/token/refresh/',{refresh : refreshToken}) //sending the refresh token to the server in json format
                  .then((res)=>{
                      localStorage.setItem('access_token', res.data.access) //updating the tokens received from server
                      
  
                      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token'); //updating the authorization header

                      
                      originalRequest.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
                      
                     
                      return axiosInstance(originalRequest); //trying the original request but with new tokens
                  })
                  
                  }
                  else{
                      console.log('Refresh token is expired', tokenParts.exp, now); 
                  }
  
              }
              else{
                  console.log('Refresh token not available')
              }
          }
          return Promise.reject(error);
        }

        
    
)



export default axiosInstance;