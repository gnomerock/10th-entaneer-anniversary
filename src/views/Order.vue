<template>
  <div>
    <div class="mt-2 flex items-center justify-center">
      <img alt="Entaneer Gear 42 logo" src="/logo.png" class="rounded object-contain h-48 shadow-lg">
      <router-link class="mt-2 rounded p-2 bg-blue-500 hover:bg-blue-400 text-white" tag="button" to="/comfirm">ยืนยันคำสั่งซื้อ</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: null,
      last_name: null,
      phone_number: null
    }
  }
}
</script>