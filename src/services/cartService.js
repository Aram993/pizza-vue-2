import $axios from "@/utils/axiosInstance";

export function cartService () {
    async function getCart () {
        try {
            const response = await $axios.get("/cart");
            return response.data;
        } catch(err) {
            console.error(err)
        }
    }

    async function addToCart(id) {
        try {
            const response = await $axios.post("/cart", {"productId": id, "quantity": 1});
            return response.data;
        } catch (err) {
            console.error(err)
        }
    }

    async function removeFromCart(id) {
        try {
            const response = await $axios.delete(`/cart/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        getCart, addToCart, removeFromCart
    }
}