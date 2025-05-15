<template>
  <Header/>
  <RouterView/>
</template>
<script>
import { mapActions } from 'pinia';
import Header from './components/Header.vue';
import { useProductCart } from './stores/productCart';


export default {
  name: "App",
  components: {Header},
  methods: {
    ...mapActions(useProductCart, ["fetchCart"])
  },
  created() {
    this.fetchCart()
  }
}
</script>
<style lang="scss">
  
</style>
