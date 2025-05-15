import { defineStore } from "pinia";
import { cartService } from "@/services/cartService";
const {getCart} = cartService();
const {addToCart} = cartService();
const {removeFromCart} = cartService();

export const useProductCart = defineStore("cart", {
    state: ()=> ({
        productsCart: {},
        isLoading: false
    }),
    getters: {
        totalAmount: (state) => {
            return state.productsCart.items?.reduce((acc, el) => acc + el.quantity, 0)
        }
    },
    actions: {
        async fetchCart() {
            this.productsCart = await getCart();
        },
        async addProduct(id) {
            try {
                this.isLoading = true;
                const updatedCart = await addToCart(id);
                this.productsCart = updatedCart;
            } finally {
                this.isLoading = false;
            }
        },
        async removeProduct(id) {
            try {
                this.isLoading = true;
                const updatedCart = await removeFromCart(id);
                this.productsCart = updatedCart;
            } finally {
                this.isLoading = false;
            }
        }
    }
    
})