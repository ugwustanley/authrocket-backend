// const generateApiKey = require('generate-api-key')

// export default function getApikey(){
    
//     return generateApiKey({method: "string"})
// }

import uuidApiKey from 'uuid-apikey';

/**
 * 
 * @returns 
 */
export  function generateKey(){
   
    const uuidApiKeyObject = uuidApiKey.create()

    return uuidApiKeyObject.apiKey
}

/**
 * 
 * @returns 
 */
export  function generateUuid(){
   
    const uuidApiKeyObject = uuidApiKey.create()

    return uuidApiKeyObject.uuid
}

/**
 * 
 * @param uuid 
 * @returns
 */
export function convertToApiKey(uuid: string){

    if(!uuid) return

    return uuidApiKey.toAPIKey(uuid);

}

/**
 * 
 * @param key 
 * @returns 
 */
export function convertToUuid(key: string){

    if(!key) return;

    return uuidApiKey.toUUID(key)

}



export function validateKey(apikey:string){

    return uuidApiKey.isAPIKey(apikey);
     
}

export function validateUuid(uuid:string){

    return uuidApiKey.isUUID(uuid);
     
}


/**
 * 
 * @param apikey 
 * @param uuid 
 * @returns 
 */
export function uuidKeyCheck (apikey:string , uuid: string){

    return uuidApiKey.check(apikey , uuid);
}