import { sql } from "../config/db.js";

const categories = ["Electronics", "Fashion", "Home", "Audio", "Other"];
const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", // Headphones
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", // Watch
  "https://images.unsplash.com/photo-1526170315870-efcec18c182f?w=800", // Camera
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800", // Audio gear
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800", // Shoes
];

async function seedDatabase() {
  try {
    console.log("🚀 Starting bulk seed of 50 products...");

    // ⚠️ IMPORTANT: Verify your database has a user with ID 1
    const userId = 3;

    const productsToInsert = [];

    for (let i = 1; i <= 50; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const image = images[Math.floor(Math.random() * images.length)];

      productsToInsert.push({
        name: `${category} Item #${i}`,
        price: Math.floor(Math.random() * 900) + 10, // Price between $10 and $910
        image: image,
        category: category,
        user_id: userId,
      });
    }

    for (const p of productsToInsert) {
      await sql`
        INSERT INTO products (name, price, image, category, user_id)
        VALUES (${p.name}, ${p.price}, ${p.image}, ${p.category}, ${p.user_id})
      `;
    }

    console.log("✅ Successfully added 50 products to the database!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seedDatabase();
