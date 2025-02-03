import bcrypt from 'bcrypt'
import User from './models/Users.js';
import connectToDatabse from './db/db.js';

const userRegister = async ()=>{
    connectToDatabse();
try {
    const hashPassword = await bcrypt.hash('admin',10)
    const newUser = new User({
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashPassword,
        role: 'admin'
    })
    await newUser.save()
    
} catch (error) {
    console.log(error);
    
}
}

userRegister();