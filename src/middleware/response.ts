
 /**
  * 
  * @param success 
  * @param message 
  * @param data 
  * @returns 
  */
 export  const response = ( success?: boolean, message?:string , data?:any) =>{

       interface response{
           success?: boolean,
           message?: any, 
           data?: any
       }


       const responseJSON : response = {
           success: success || false,
           message: message || null,
           data   : data || null
       }

       return responseJSON as response;
 }