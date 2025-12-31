import { sql } from "../config/db.js"; // Adjust the path to your db connection file

const defaultProducts = [
  {
    name: "iPhone 15 Pro",
    price: 999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800",
  },
  {
    name: "Sony WH-1000XM5",
    price: 349,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
  },
  {
    name: "Mechanical Keyboard",
    price: 120,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
  },
  {
    name: "Cotton Hoodie",
    price: 45,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
  },
  {
    name: "Smart Watch",
    price: 199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544117518-3b21646e3a06?w=800",
  },
  {
    name: "Desk Lamp",
    price: 30,
    category: "Home",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800",
  },
];

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Replace '1' with a valid userId from your users table
    const userId = 3;

    for (const product of defaultProducts) {
      await sql`
        INSERT INTO products (name, price, image, category, user_id)
        VALUES (${product.name}, ${product.price}, ${product.image}, ${product.category}, ${userId})
      `;
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
