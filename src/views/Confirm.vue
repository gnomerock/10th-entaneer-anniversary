<template>
  <div class="container mt-2 mb-2">
    <div class="card shadow mt-2 mb-2">
      <div class="card-body">
        <h3 class="text-primary">ยืนยันรายการ</h3>
        <hr>
        <div class="row">
          <div class="col-3"><b class="text-primary">รายการ</b></div>
          <div class="col-3 text-right"><b class="text-primary">จำนวน</b></div>
          <div class="col-3 text-right"><b class="text-primary">ราคา (บาท)</b></div>
          <div class="col-3 text-right"><b class="text-primary">ราคารวม (บาท)</b></div>
        </div>
        <product-summary :product="this.$store.state.order.package" v-if="this.$store.state.order.package.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="this.$store.state.order.shop" v-if="this.$store.state.order.shop.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="this.$store.state.order.polo" v-if="this.$store.state.order.polo.quantity>0" class="row mb-2"></product-summary>
        <product-summary :product="this.$store.state.order.yeti" v-if="this.$store.state.order.yeti.quantity>0" class="row mb-2"></product-summary>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-3"></div>
          <div class="col-3"><b class="text-primary text-right">ราคารวม</b></div>
          <div class="col-3"><h5 class="text-dark text-right">{{totalPrice.toLocaleString('th')}} บาท</h5></div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-3"></div>
          <div class="col-3"><b class="text-primary text-right">ค่าส่ง {{items}} ชิ้น</b></div>
          <div class="col-3"><h5 class="text-dark text-right">{{deriveryCost.toLocaleString('th')}} บาท</h5></div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col-3"></div>
          <div class="col-3"><b class="text-primary text-right">ราคารวมค่าส่ง</b></div>
          <div class="col-3"><h5 class="text-dark text-right">{{(totalPrice+deriveryCost).toLocaleString('th')}} บาท</h5></div>
        </div>
        <hr>

      </div>
    </div>

    <div class="card shadow mt-2 mb-2">
      <div class="card-body">
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

            <hr>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow mt-2 mb-2">
      <div class="card-body">
        <h3 class="text-primary">
          ชำระเงิน
        </h3>
        <div>1. ชำระเงินมาที่เลขบัญชี</div>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-3">
                <img src="/images/scb-logo.jpg" class="img-fluid">
              </div>
              <div class="col-9">
                <h5 class="text-dark">บัญชีออมทรัพย์</h5>
                <h5 class="text-primary">206-268185-2</h5>
                <h5 class="text-dark">ธนาคารไทยพาณิชย์</h5>
                <h5 class="text-dark">ชื่อบัญชี นายอภิชัย ก๋าสมุทร และ นางสาวพรรณิภา แสนนันตา</h5>
                <h5>
                  <span class="text-dark">จำนวนเงิน</span> <span class="text-success">{{(totalPrice+deriveryCost).toLocaleString('th')}}</span> <span>บาท</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div>2. อัพโหลดสลิปแสดงหลักฐานการโอนเงิน</div>
      </div>
    </div>
    <button class="mt-2 btn btn-success btn-block w-100">ยืนยันคำสั่งซื้อ</button>
    <button class="mt-2 btn btn-info btn-block w-100" @click.prevent="$router.push('/order')">กลับ</button>
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
  computed: {
    totalPrice() {
      let order = this.$store.state.order
      return ( order.package.quantity * order.package.price ) +
              ( order.shop.quantity * order.shop.price ) + 
              ( order.polo.quantity * order.polo.price ) + 
              ( order.yeti.quantity * order.yeti.price )
    },
    deriveryCost() {
      let order = this.$store.state.order
      let volume = 0
      if(order.package.quantity>0) volume += 2
      if(order.shop.quantity>0) volume += order.shop.quantity
      if(order.yeti.quantity>0) volume += order.yeti.quantity
      if(order.polo.quantity>0) volume += order.polo.quantity

      if(volume<4) return 60
      else return 60+(15 * (volume-3))
    },
    items() {
      let order = this.$store.state.order
      let volume = 0
      if(order.package.quantity>0) volume += 2
      if(order.shop.quantity>0) volume += order.shop.quantity
      if(order.yeti.quantity>0) volume += order.yeti.quantity
      if(order.polo.quantity>0) volume += order.polo.quantity

      return volume
    }
  }
}
</script>