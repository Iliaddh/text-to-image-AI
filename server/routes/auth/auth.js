import bcryptjs from "bcryptjs"

async function hashPassword (password){
    const hashedPassword = await bcryptjs.hash(password, 12);
    
    console.log(hashedPassword)
    return hashedPassword;
}


export default hashPassword