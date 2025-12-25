import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert into database
    const newUser = await sql`
            INSERT INTO users (email, password_hash, name)
            VALUES (${email}, ${hashedPassword}, ${name})
            RETURNING id, email, name, created_at
        `;

    res.status(201).json({ success: true, data: newUser[0] });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user[0].password_hash);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Create a JWT Token (The "Ticket")
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: { id: user[0].id, name: user[0].name, email: user[0].email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
