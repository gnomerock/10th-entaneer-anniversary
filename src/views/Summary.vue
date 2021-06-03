<template>
  <div class="container mt-2 mb-2" style="height: 100vh !important;">
    <h3 class="text-center text-white">
      รายละเอียดคำสั่งซื้อ
    </h3>
    <div class="card shadow" v-if="order">
      <div class="card-body">

        <div class="row">
          <div class="col-3 text-primary">ชื่อผู้สั่ง</div>
          <div class="col-9">{{name}}</div>
        </div>
        <div class="row">
          <div class="col-3 text-primary">รหัสนักศึกษา</div>
          <div class="col-9">{{studentId}}</div>
        </div>
        <div class="row">
          <div class="col-3 text-primary">ที่อยู่</div>
          <div class="col-9">{{address}}</div>
        </div>
        <div class="row">
          <div class="col-3 text-primary">เบอร์โทรศัพท์</div>
          <div class="col-9">{{phoneNumber}}</div>
        </div>
        <hr>
        <div class="row">
          <div class="col-3"><b class="text-primary">รายการ</b></div>
          <div class="col-3 text-right"><b class="text-primary">จำนวน</b></div>
          <div class="col-3 text-right"><b class="text-primary">ราคา (บาท)</b></div>
          <div class="col-3 text-right"><b class="text-primary">ราคารวม (บาท)</b></div>
        </div>
        <product-summary :product="order.package" v-if="order.package.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="order.shop" v-if="order.shop.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="order.polo" v-if="order.polo.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="order.yeti" v-if="order.yeti.quantity>0" class="row mb-2"></product-summary>
        <div class="row">
          <div class="col-6"><b class="text-primary text-right">ราคารวม</b></div>
          <div class="col-6"><h5 class="text-dark text-right">{{totalPrice.toLocaleString('th')}} บาท</h5></div>
        </div>
        <div class="row">
          <div class="col-6"><b class="text-primary text-right">ค่าส่ง {{items}} ชิ้น</b></div>
          <div class="col-6"><h5 class="text-dark text-right">{{deriveryCost.toLocaleString('th')}} บาท</h5></div>
        </div>
        <div class="row">
          <div class="col-6"><b class="text-primary text-right">ราคารวมค่าส่ง</b></div>
          <div class="col-6"><h5 class="text-dark text-right">{{(totalPrice+deriveryCost).toLocaleString('th')}} บาท</h5></div>
        </div>
        <h3 class="text-primary">สถานะ</h3> <span class="badge bg-warning">กำลังดำเนินการ</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSummary from '../components/ProductSummary'
import {db} from '../firebase'
export default {
  components: {
    ProductSummary,
  },
  data() {
    return {
      order: null,
      name: null,
      studentId: null,
      address: null,
      phoneNumber: null
    }
  },
  computed: {
    totalPrice() {
      let order = this.order
      return ( order.package.quantity * order.package.price ) +
              ( order.shop.quantity * order.shop.price ) + 
              ( order.polo.quantity * order.polo.price ) + 
              ( order.yeti.quantity * order.yeti.price )
    },
    deriveryCost() {
      let order = this.order
      let volume = 0
      if(order.package.quantity>0) volume += 2
      if(order.shop.quantity>0) volume += order.shop.quantity
      if(order.yeti.quantity>0) volume += order.yeti.quantity
      if(order.polo.quantity>0) volume += order.polo.quantity

      if(volume<4) return 60
      else return 60+(15 * (volume-3))
    },
    items() {
      let order = this.order
      let volume = 0
      if(order.package.quantity>0) volume += 2
      if(order.shop.quantity>0) volume += order.shop.quantity
      if(order.yeti.quantity>0) volume += order.yeti.quantity
      if(order.polo.quantity>0) volume += order.polo.quantity

      return volume
    },
    uid() {
      return this.$store.getters.uid
    }
  },
  watch: {
    uid: {
      immediate: true,
      async handler() {
        if(this.$store.getters.uid) {
          let data = await db.collection('Order').doc(this.$store.getters.uid).get()
          this.order = data.data().order
          this.name = data.data().name
          this.studentId = data.data().studentId
          this.address = data.data().address,
          this.phoneNumber = data.data().phoneNumber
        }
      }
    }
  }
}
</script>