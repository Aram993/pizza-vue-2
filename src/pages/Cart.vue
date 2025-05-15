<template>
    <div class="container">
        <div v-for="product in products" :key="product.id">
            <div class="product" v-if="getProductsQuantity(product.id)">
                <img :src="product.image" :alt="product.name">
            <div class="wrapper">
                <div class="product-info">
                    <p>{{ product.name }}</p>
                    <div class="product-info-price">
                        <span>{{ product.price }} ₽</span>
                        <span class="splitter">.</span>
                        <span>{{ product.price * getProductsQuantity(product.id)}} ₽</span>
                    </div>
                </div>
                <div class="product-numbers">
                    <div class="sign" @click="addProduct(product.id)">+</div>
                    <div>{{getProductsQuantity(product.id)}}</div>
                    <div class="sign" @click="removeProduct(product.id)">-</div>
                </div>
            </div>
            </div>
            
        </div>
        <div class="total">Итого: {{ productsCart.totalPrice }} ₽</div>
    </div>
</template>
<script>
import { useProductCart } from '@/stores/productCart';
import { mapActions, mapState } from 'pinia';


export default {
    name: "Cart",
    data() {
        return {
            products: []
        }
    },
    computed: {
        ...mapState(useProductCart, ["productsCart"])
    },
    methods: {
        ...mapActions(useProductCart, ["addProduct", "removeProduct"]),
        getProductsFromCart() {
            this.productsCart.items?.forEach(item => {
                this.products.push(item.product);
            })
        },
        getProductsQuantity(id) {
            let result = 0
            this.productsCart.items?.forEach(item => {
                if (item.product.id === id) {
                    result = item.quantity
                }
            })
            return result;
        }
    },
    mounted() {
        this.getProductsFromCart();
    }
}
</script>
<style lang="scss" scoped>
    .container {
        margin: 50px auto;
        background-color: #fff;
        width: 30%;
        height: 500px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-radius: 20px;

        & > .total {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: bolder;
            font-size: x-large;
        }
    }

    .product {
        display: flex;
        align-items: center;
        padding-right: 20px;
        border: 2px solid black;
        width: 100%;
        & > img {
            width: 40%;
            object-fit: cover;
            height: 100%;
        }

        .wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            & > .product-info {
                padding-top: 10px;
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                font-weight: bolder;
                display: flex;
                flex-direction: column;
                gap: 20px;

                & >.product-info-price {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .splitter {
                        padding-bottom: 10px;
                    }
                }
            }

            .product-numbers {
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: black;
                width: 70px;
                height: 50px;
                border-radius: 10px;
                border: none;
            }

            .sign {
                background-color: #eee;
                padding: 5px;
                border-radius: 20px;
                
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
</style>