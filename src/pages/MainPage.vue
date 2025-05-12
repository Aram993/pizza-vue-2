<template>
    <div class="field">
        <div class="card" v-for="product in products">
            <img :src="product.image" :alt="product.name">
            <div>
                <h2>{{ product.name }}</h2>
                <p>{{ product.price }}₽</p>
                <button @click="addToCart(product)" v-if="!productInCart(product.id)">Купить</button>
                <div v-else>
                    <div @click="addToCart(product)">+</div>
                    <div>{{ productInCart(product.id) }}</div>
                    <div @click="removeFromCart(product)">-</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useProductCart } from '@/stores/productCart';
import $axios from '@/utils/axiosInstance';
import { mapActions, mapState } from 'pinia';

export default {
    name: "MainPage",
    data() {
        return {
            products: []
        }
    },
    methods: {
        async getProducts() {
            const response = await $axios.get("/pizzas");
            this.products.push(...response.data);
        },
        ...mapActions(useProductCart, ["addToCart", "productInCart", "removeFromCart"])
    },
    created() {
        this.getProducts();
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

                    &:hover {
                        background-color: red;
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

                    &:hover {
                        background-color: red;
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