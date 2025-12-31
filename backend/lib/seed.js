import { sql } from "./db.js";

const categories = ["Electronics", "Fashion", "Home", "Audio", "Other"];
const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", // Audio
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", // Electronics
  "https://images.unsplash.com/photo-1526170315870-efcec18c182f?w=800", // Camera
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800", // Fashion
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800", // Audio
];

async function seedDatabase() {
  try {
    console.log("🚀 Starting bulk seed of 50 products...");

    await sql`DELETE FROM products`;

    const productsToInsert = [];
    for (let i = 1; i <= 50; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const image = images[Math.floor(Math.random() * images.length)];

      productsToInsert.push({
        name: `${category} Premium #${i}`,
        price: Math.floor(Math.random() * 1000) + 20,
        image: image,
        category: category,
        user_id: 3,
      });
    }

    for (const p of productsToInsert) {
      await sql`
        INSERT INTO products (name, price, image, category, user_id)
        VALUES (${p.name}, ${p.price}, ${p.image}, ${p.category}, ${p.user_id})
      `;
    }

    console.log("✅ Successfully added 50 products!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seedDatabase();
