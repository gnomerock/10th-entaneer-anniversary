<template>
  <div class="container mt-2 mb-2">
    <h3 class="text-primary">ยืนยันรายการ</h3>
    <hr>
    <div class="row">
      <div class="col-3"><b class="text-primary">รายการ</b></div>
      <div class="col-3"><b class="text-primary text-right">จำนวน</b></div>
      <div class="col-3"><b class="text-primary text-right">ราคา (บาท)</b></div>
      <div class="col-3"><b class="text-primary text-right">ราคารวม (บาท)</b></div>
    </div>
    <product-summary :product="this.$store.state.order.package" v-if="this.$store.state.order.package.quantity>0" class="row mb-2"></product-summary>
    <product-summary :product="this.$store.state.order.shop" v-if="this.$store.state.order.shop.quantity>0" class="row mb-2"></product-summary>
    <product-summary :product="this.$store.state.order.polo" v-if="this.$store.state.order.polo.quantity>0" class="row mb-2"></product-summary>
    <product-summary :product="this.$store.state.order.yeti" v-if="this.$store.state.order.yeti.quantity>0" class="row mb-2"></product-summary>
    <hr>
    <div class="row">
      <h5 class="text-primary">ข้อมูลในการจัดส่ง</h5>
      <div class="col-12">
        <div class="form-group mt-2">
          <label>ชื่อ/ชื่อเล่น ภาษาไทย</label>
          <input type="text" class="form-control" v-model="displayName">
        </div>
        <div class="form-group mt-2">
          <label>รหัสนักศึกษา</label>
          <input type="text" class="form-control" v-model="studentId" palceholder="54061XXXX">
        </div>
        <div class="form-group mt-2">
          <label>ที่อยู่ในการจัดส่ง</label>
          <textarea cols="30" rows="5" class="form-control" v-model="address"></textarea>
        </div>
        <div class="form-group mt-2">
          <label>เบอร์โทรศัพท์</label>
          <input type="text" class="form-control" v-model="phoneNumber">
        </div>

        <button class="mt-2 btn btn-success btn-block w-100">ยืนยันคำสั่งซื้อ</button>
        <button class="mt-2 btn btn-info btn-block w-100" @click.prevent="$router.push('/order')">กลับ</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSummary from '../components/ProductSummary'
export default {
  components: {
    ProductSummary
  },
  data() {
    return {
      displayName: null,
      phoneNumber: null,
      studentId: null,
      address: null
    }
  },
  created() {
    this.phoneNumber = this.$store.state.phoneNumber
  },
  methods: {

  }
}
</script>