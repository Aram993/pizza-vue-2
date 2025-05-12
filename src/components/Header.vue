<template>
    <div class="container">
        <router-link to="/main">Главная</router-link>
        <RouterLink to="/cart" :class="{'productsInCart': totalProducts > 0}" @click="isShownCart = false" v-if="isShownCart">
            <span>Корзина</span>
            <div :class="{'cartPrice': totalProducts > 0, 'emptyCart': totalProducts === 0}">
                <span v-if="totalPrice > 0">{{ totalPrice }} ₽</span>
                <span>{{ totalProducts }}</span>
            </div>
        </RouterLink>
    </div>
</template>
<script>
import { useProductCart } from '@/stores/productCart';
import { mapState } from 'pinia';

export default {
    name: "Header",
    data() {
        return {
            isShownCart: true
        }
    },
    computed: {
        ...mapState(useProductCart, ["totalProducts", "totalPrice"])
    }
}
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        display: flex;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: xx-large;
        justify-content: space-between;
        gap: 50px;
        align-items: center;
        height: 80px;
        padding: 30px;
        background-color: #eee;
        border: 2px solid #eee;

        & > :last-child {
            border: 2px solid grey;
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 20px;
        }
    }

    a {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: xx-large;
        font-weight: bolder;
        font-style: italic;
        text-decoration: none;
        color: black;

        &:hover {
            cursor: pointer;
        }

        &.active {
            text-decoration: underline;
            color: red;
        }
    }

    .productsInCart {
        background-color: red;
    }

    .cartPrice {
        border-left: 2px solid white;
        display: flex;
        align-items: center;
        padding-left: 20px;
        gap: 20px;

        & > :last-child {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background-color: #fff;
            width: 50px;
            height: 50px;
            border-radius: 10px;
            color: black;
        }
    }

    .emptyCart {
        background-color: #fff;
        color: black;
        padding: 10px;
        border-radius: 15px;
    }
</style>