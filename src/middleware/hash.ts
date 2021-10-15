import bcrypt from 'bcrypt'

/**
 * 
 * @param item 
 * @returns 
 */
export async function hashItem(item:string){

    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(item, salt);

}


/**
 * 
 * @param hashedItem 
 * @param item 
 * @returns 
 */
export async function validateHash( item:string , hashedItem:string){

    return await bcrypt.compare(item, hashedItem)
}