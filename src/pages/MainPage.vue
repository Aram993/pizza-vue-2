<template>
    <div class="field">
        <div class="card" v-for="product in products" :key="product.id">
            <img :src="product.image" :alt="product.name">
            <div>
                <h2>{{ product.name }}</h2>
                <p>{{ product.price }}₽</p>
                <button v-if="!checkProductInCart(product.id)" @click="addProduct(product.id)">Купить</button>
                <div v-else>
                    <button @click="addProduct(product.id)" :disabled="isLoading">+</button>
                    <div>{{ checkProductInCart(product.id) }}</div>
                    <button @click="removeProduct(product.id)">-</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { productsService } from '@/services/productsService';
import { useProductCart } from '@/stores/productCart';
import { mapActions, mapState } from 'pinia';
const {getProducts} = productsService();
export default {
    name: "MainPage",
    data() {
        return {
            products: [],
        }
    },
    methods: {
        async fetchProducts() {
           this.products.push(...await getProducts());
        },

        ...mapActions(useProductCart, ["addProduct", "removeProduct"]),

        checkProductInCart(id) {
            let result = 0;
            this.productsCart.items.forEach(el => {
              if (el.product.id === id) {
                result = el.quantity;
              }
            })
            return result;
        }
    },
    computed: {
        ...mapState(useProductCart, ["productsCart", "isLoading"])
    },
    created() {
        this.fetchProducts();
    }
}
</script>
<style lang="scss" scoped>
    .field {
        margin: 50px auto;
        background-color: #fff;
        width: 80%;
        height: 500px;
        padding: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .card {
        width: 300px;
        height: 400px;
        display: flex;
        padding: 10px;
        flex-direction: column;
        border: 2px solid #eee;
        color: grey;
        border-radius: 10px;
        align-items: center;
        justify-content: space-between;

        & > img {
            width: 100%;
            object-fit: cover;
            height: 220px;
        }

        & > div {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: xx-large;
            display: flex;
            color: black;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 100%;

            & > button {
                width: 60%;
                height: 50px;
                border-radius: 10px;
                border: none;
                background-color: orangered;

                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                }
            }

            & > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: white;
                width: 60%;
                height: 50px;
                border-radius: 10px;
                border: none;
                background-color: orangered;

                & > :first-child {
                    width: 25%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                    border-right: 2px solid white;
                    background-color: orangered;

                    &:hover {
                        background-color: red;
                        color: #fff;
                        cursor: pointer;
                    }
                }

                & > :last-child {
                    width: 25%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    border-left: 2px solid white;
                    background-color: orangered;

                    &:hover {
                        background-color: red;
                        color: #fff;
                        cursor: pointer;
                    }
                }
            }
        }

        &:hover {
            box-shadow: 5px 5px 5px 5px;
        }
    }
</style>