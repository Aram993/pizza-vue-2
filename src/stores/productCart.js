import { defineStore } from "pinia";

export const useProductCart = defineStore("cart", {
    state: ()=> ({
        productsCart: []
    }),
    getters: {
        totalProducts: (state) => {
            return state.productsCart.reduce((acc, item) => {
                return acc + item.amount
            },0)
        },
        totalPrice: (state) => {
            return state.productsCart.reduce((acc, item) => {
                return acc + item.price * item.amount
            }, 0)
        }
    },
    actions: {
        addToCart(product) {
            let isSame = false;

            this.productsCart.forEach(item => {
                if (item.id === product.id) {
                    isSame = true;
                    item.amount++
                }
            })

            if (isSame === false) {
                this.productsCart.push({...product, amount: 1})
            }

            isSame = false;
        },
        productInCart(id) {
            let numOfProduct = 0;
            this.productsCart.forEach(item => {
                if (item.id === id) {
                    numOfProduct = item.amount
                }
            })
            return numOfProduct;
        },
        removeFromCart(product) {
            this.productsCart.forEach(item => {
                if (item.id === product.id) {
                    item.amount--
                }
            })
        }
    }
        
})