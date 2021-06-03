<template>
  <div>
    <div class="col-3">
      <p class="text-dark">
        {{product.title}} <br>
        <span class="text-dark" v-if="product.size">เสื้อ Size {{product.size}}</span> <span v-if="product.size==='อื่นๆ'">{{product.other}}</span>
      </p>
    </div>
    <div class="col-3">
      <p class="text-dark text-right">{{product.quantity}}</p>
    </div>
    <div class="col-3">
      <p class="text-dark text-right">{{product.price}}</p>
    </div>
    <div class="col-3">
      <p class="text-dark text-right">{{(product.quantity * product.price).toLocaleString('th')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>