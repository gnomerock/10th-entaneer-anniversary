<template>
  <div class="container" style="min-height: 100vh;">
    <h3 class="text-white">
      Summary
    </h3>
    <div class="card shadow mt-2">
      <div class="card-body">
        <vue-good-table
          :columns="columns"
          :rows="orders"
          :line-numbers="true"
          :search-options="{enabled: true}"
          :pagination-options="{enabled: true}"
          @on-row-click="onRowClick"
        />
      </div>
    </div>
    <b-modal id="view-order" title="Order Status" hide-footer v-if="order" size="lg">
      <h3 class="text-center text-white">
      รายละเอียดคำสั่งซื้อ
    </h3>
      <div class="row">
        <div class="col-3 text-primary">ชื่อผู้สั่ง</div>
        <div class="col-9">{{order.name}}</div>
      </div>
      <div class="row">
        <div class="col-3 text-primary">รหัสนักศึกษา</div>
        <div class="col-9">{{order.studentId}}</div>
      </div>
      <div class="row">
        <div class="col-3 text-primary">ที่อยู่</div>
        <div class="col-9">{{order.address}}</div>
      </div>
      <div class="row">
        <div class="col-3 text-primary">เบอร์โทรศัพท์</div>
        <div class="col-9">{{order.phoneNumber}}</div>
      </div>
      <div class="row">
        <div class="col-3 text-primary">เวลาที่สั่งซื้อ</div>
        <div class="col-9">{{order.created_at}}</div>
      </div>
      <hr>
      <div class="row">
        <div class="col-3"><b class="text-primary">รายการ</b></div>
        <div class="col-3 text-right"><b class="text-primary">จำนวน</b></div>
        <div class="col-3 text-right"><b class="text-primary">ราคา (บาท)</b></div>
        <div class="col-3 text-right"><b class="text-primary">ราคารวม (บาท)</b></div>
      </div>
      <product-summary :product="order.order.package" v-if="order.order.package.quantity>0" class="row mb-2"></product-summary>
      <product-summary :product="order.order.shop" v-if="order.order.shop.quantity>0" class="row mb-2"></product-summary>
      <product-summary :product="order.order.polo" v-if="order.order.polo.quantity>0" class="row mb-2"></product-summary>
      <product-summary :product="order.order.yeti" v-if="order.order.yeti.quantity>0" class="row mb-2"></product-summary>
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
      <h3 class="text-primary">สถานะ</h3> <span class="badge bg-warning">ยืนยันการสั่งซื้อ</span>
      <hr>
      <div class="d-flex">
        <button class="btn btn-warning ml-auto mr-2">รอยืนยัน</button>
        <button class="btn btn-info mr-2">ยืนยันการสั่งซื้อ</button>
        <button class="btn btn-success mr-2">ส่งแล้ว</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {db} from '../firebase'
import ProductSummary from '../components/ProductSummary'
export default {
  components: {
    ProductSummary,
  },
  data() {
    return {
      orders: [],
      columns: [
        { label: 'ชื่อ', field: 'name' },
        { label: 'รหัสนักศึกษา', field: 'studentId' },
        { label: 'เบอร์โทรศัพท์', field: 'phoneNumber' },
        { label: 'วันที่สั่งซื้อ', field: 'created_at' },
        { label: 'สถานะ', field: 'status' },
      ],
      order: null
    }
  },
  methods: {
    onRowClick(params) {
      this.order = {
        ...params.row
      }
      this.$bvModal.show('view-order')
    }
  },
  async created() {
    let loader = this.$loading.show({})
    let data = await db.collection('Order').get()
    for(let order of data.docs) {
      let data = {...order.data()}
      if(data.created_at) {
        data.created_at = data.created_at.toDate().toLocaleString('th')
      }
      if(!data.status) {
        data.status = 'pending'
      }
      console.log(data)
      this.orders.push(data)
    }
    loader.hide()
  },
  computed: {
    totalPrice() {
      let order = this.order.order
      return ( order.package.quantity * order.package.price ) +
              ( order.shop.quantity * order.shop.price ) + 
              ( order.polo.quantity * order.polo.price ) + 
              ( order.yeti.quantity * order.yeti.price )
    },
    deriveryCost() {
      let order = this.order.order
      let volume = 0
      if(order.package.quantity>0) volume += 2
      if(order.shop.quantity>0) volume += order.shop.quantity
      if(order.yeti.quantity>0) volume += order.yeti.quantity
      if(order.polo.quantity>0) volume += order.polo.quantity

      if(volume<4) return 60
      else return 60+(15 * (volume-3))
    },
    items() {
      let order = this.order.order
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
}
</script>