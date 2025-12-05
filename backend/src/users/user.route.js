const express =  require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const router =  express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY || "4356bc06b8ff35971988941d36784c271a3f94a8e226dddc17669b01bfa3356edde5f19f8bd1af999912ebe7710476c0f940650b9c1c16a2887191a14d0b9d18"

router.post("/admin", async (req, res) => {
    // console.log(req.body)
   try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }
    
    const admin = await User.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // If you store plain text (not recommended), do a direct compare:
    // if (admin.password !== password) { ... }
    console.log("Admin: ",admin.password, password)
    // If you store hashed (recommended), use bcrypt:
    if(admin.password !== password) { res.status(401).send({message: "Invalid password!"}) }
        const token =  jwt.sign(
            {id: admin._id, username: admin.username, role: admin.role}, 
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
       console.error("Failed to login as admin", error)
       res.status(401).send({message: "Failed to login as admin"}) 
    }
})

module.exports = router;