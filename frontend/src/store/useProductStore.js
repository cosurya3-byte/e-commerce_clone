import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../services/api";

// base url will be dynamic depending on the environment
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  fetchProducts: async () => {
    set({ loading: true });
    try {
      // Use the 'API' instance from your services folder
      // The interceptor inside api.js will automatically add the Bearer token
      const response = await API.get("/products");

      set({ products: response.data.data, loading: false, error: null });
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
      set({ error: "Something went wrong", loading: false });
    }
  },

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await API.post("/products", formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  products: [],
  searchQuery: "", // New state for the search text

  // Function to update the search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Logic to filter products based on the name
  getFilteredProducts: () => {
    const { products, searchQuery } = get();
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await API.get(`/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429)
        set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await API.delete(`/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await API.get(`/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // pre-fill form with current product data
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await API.put(`/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },

  /* searchProducts: async (search) => {
    try {
      const res = await API.get(`/products/search?search =${search}`);
      // Double-check if your data is in res.data or res.data.data
      const results = res.data.data || [];
      set({ products: results }); // Ensure 'results' is always an array
    } catch (error) {
      console.error("Search error", error);
      set({ products: [] }); // Set to empty array on error to prevent map crash
    }
  },

  fetchProducts: async (searchTerm = "") => {
    set({ loading: true });
    try {
      // This sends: https://your-site.com/api/products?search=P
      const res = await API.get(`/products?search=${search}`);
      set({ products: res.data.data, loading: false });
    } catch (error) {
      set({ error: "Error fetching products", loading: false });
    }
  }, */
}));
