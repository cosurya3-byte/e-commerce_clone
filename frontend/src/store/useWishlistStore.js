import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const { wishlist } = get();
        const isExisted = wishlist.find((item) => item.id === product.id);

        if (isExisted) {
          set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    { name: "wishlist-storage" }
  )
);
