import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const { cart } = get();
        // Check if item already exists in cart
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, amount) => {
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.max(1, (item.quantity || 1) + amount),
                }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "shopping-cart" } // Saves cart in LocalStorage automatically
  )
);
