import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    // 1. Remove the line: const userId = req.user.userId;
    // This stops the "Cannot read properties of undefined" crash.

    // 2. Fetch all products without any filtering
    const products = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in getProducts function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image, category } = req.body;
  const userId = req.user.userId;
  // CRITICAL: Check your terminal for this output when you add a product

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: User ID missing" });
  }

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Ensure there is a space-less 'sql' right before the backtick
    const newProduct = await sql`
  INSERT INTO products (name, price, image, category, user_id)
  VALUES (${name}, ${price}, ${image}, ${category || "Other"}, ${userId})
  RETURNING *
`;

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.userId;
    const product = await sql`
     SELECT * FROM products
     WHERE user_id = ${userId}
     ORDER BY created_at DESC
    `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const userId = req.user?.userId;
  try {
    const updateProduct = await sql`
      UPDATE products
      SET name=${name}, price=${price}, image=${image}
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;

    if (!updateProduct || updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const deletedProduct = await sql`
      DELETE FROM products
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.userId; // Get ID from the auth middleware
    const products = await sql`
      SELECT * FROM products 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
