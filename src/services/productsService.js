import $axios from "@/utils/axiosInstance";

export function productsService () {
    async function getProducts() {
        try {
            const response = await $axios.get("/products");
            return response.data;
        } catch(err) {
            console.error(err)
        }
    }

    return {
        getProducts
    }
}