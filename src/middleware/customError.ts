

export default class CustomError extends Error {
    data?: any
    status?: number
    constructor(message?: string, status?: number, data?:any) {
      super(message); // (1)
      this.name = "CustomError";
      this.data = data || null;
      this.status = status || 400
    }
}


export class ValidationError extends Error {
    data?: any
    status?: number
    /**
     * 
     * @param message 
     * @param status 
     * @param data 
     */
    constructor(message?: string, status?: number, data?:any) {
      super(message); // (1)
      this.name = "ValidationError";
      this.data = data || null;
      this.status = status || 400
    }
}

export  class AuthenticationError extends Error {
    data?: any
    status?: number
    /**
     * 
     * @param message 
     * @param status 
     * @param data 
     */
    constructor(message?: string, status?: number, data?:any) {
      super(message); 
      this.name = "AuthenticationError";
      this.data = data || null;
      this.status = status || 400
    }
}