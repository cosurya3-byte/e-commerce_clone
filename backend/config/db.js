import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Just pass the DATABASE_URL variable directly
export const sql = neon(process.env.DATABASE_URL);
// this sql function we export is used as a tagged template literal, which allows us to write SQL queries safely

// postgresql://neondb_owner:npg_NW8olSOGfx5E@ep-dawn-meadow-a83i0d05-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

/* import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

// FIX: We added '-pooler' back. The 'pg' driver handles this perfectly.
const POOLER_URL =
  "postgresql://neondb_owner:npg_c8LYMrxs0fXD@ep-silent-water-afni41w5-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString: POOLER_URL,
  ssl: {
    rejectUnauthorized: false, // This ignores strict SSL errors on hotspots
  },
});

export const sql = async (strings, ...values) => {
  try {
    if (typeof strings === "string") {
      const res = await pool.query(strings, values);
      return res.rows;
    } else {
      let text = strings[0];
      for (let i = 1; i < strings.length; i++) {
        text += `$${i}` + strings[i];
      }
      const res = await pool.query(text, values);
      return res.rows;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}; */
