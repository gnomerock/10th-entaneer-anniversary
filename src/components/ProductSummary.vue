<template>
  <div>
    <div class="col-3">
      <p class="text-dark">
        {{product.title}} <br>
        <span class="text-dark" v-if="product.size">เสื้อ Size {{product.size}}</span>
      </p>
    </div>
    <div class="col-3">
      <p class="text-dark">{{product.quantity}}</p>
    </div>
    <div class="col-3">
      <p class="text-dark">{{product.price}}</p>
    </div>
    <div class="col-3">
      <p class="text-dark">{{product.quantity * product.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>