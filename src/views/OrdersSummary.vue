<template>
  <div class="container-fluid" style="min-height: 100vh;">
    <h3 class="text-white">
      Summary
    </h3>
    <div class="card shadow mt-2">
      <div class="card-body">
        <vue-good-table
          :columns="columns"
          :rows="computedOrder"
          :line-numbers="true"
          :search-options="{enabled: true}"
          :pagination-options="{enabled: true}"
          @on-row-click="onRowClick"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'status'">
              <span v-if="props.row.status==='ยืนยันการสั่งซื้อ'" class="badge bg-info">{{props.row.status}}</span>
              <span v-else-if="props.row.status==='จัดส่งแล้ว'" class="badge bg-success">{{props.row.status}}</span>
              <span v-else class="badge bg-warning">รอยืนยัน</span>
            </span>
            <span v-else>
              {{props.formattedRow[props.column.field]}}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <b-modal id="view-order" title="Order Status" hide-footer v-if="order" size="lg">
      <h3 class="text-center text-white">
      รายละเอียดคำสั่งซื้อ
    </h3>
      <div class="row">
        <div class="col-3 text-primary">UID</div>
        <div class="col-9">{{order.id}}</div>
      </div>
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
        <div class="col-9" v-if="order.created_at">{{order.created_at}}</div>
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
      <h3 class="text-primary">สถานะ</h3> 
              <span v-if="order.status==='ยืนยันการสั่งซื้อ'" class="badge bg-info">{{order.status}}</span>
              <span v-else-if="order.status==='จัดส่งแล้ว'" class="badge bg-success">{{order.status}}</span>
              <span v-else class="badge bg-warning">รอยืนยัน</span>
      <hr>
      <img class="img-fluid" :src="order.slip" alt="">
      <div class="d-flex">
        <button class="btn btn-warning ml-auto mr-2" @click.prevent="changeStatus(order.id,'รอยืนยัน')">รอยืนยัน</button>
        <button class="btn btn-info mr-2"  @click.prevent="changeStatus(order.id,'ยืนยันการสั่งซื้อ')">ยืนยันการสั่งซื้อ</button>
        <button class="btn btn-success mr-2"  @click.prevent="changeStatus(order.id,'จัดส่งแล้ว')">จัดส่งแล้ว</button>
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
        { 
          label: 'package size',
          field: (rowObj) => {
            if(rowObj.order.package.quantity > 0)
              if(rowObj.order.package.size==='อื่นๆ')
                return rowObj.order.package.other
              else
                return rowObj.order.package.size
          }
        },
        { 
          label: 'package จำนวน',
          field: (rowObj) => {
            if(rowObj.order.package.quantity > 0)
              return rowObj.order.package.quantity
          }
        },
        { 
          label: 'shop size',
          field: (rowObj) => {
            if(rowObj.order.shop.quantity > 0)
              if(rowObj.order.shop.size==='อื่นๆ')
                return rowObj.order.shop.other
              else
                return rowObj.order.shop.size
          }
        },
        { 
          label: 'shop จำนวน',
          field: (rowObj) => {
            if(rowObj.order.shop.quantity > 0)
              return rowObj.order.shop.quantity
          }
        },
        { 
          label: 'Polo size',
          field: (rowObj) => {
            if(rowObj.order.polo.quantity > 0)
              if(rowObj.order.polo.size==='อื่นๆ')
                return rowObj.order.polo.other
              else
                return rowObj.order.polo.size
          }
        },
        { 
          label: 'Polo จำนวน',
          field: (rowObj) => {
            if(rowObj.order.polo.quantity > 0)
              return rowObj.order.polo.quantity
          }
        },
        { 
          label: 'แก้ว จำนวน',
          field: (rowObj) => {
            if(rowObj.order.yeti.quantity > 0)
              return rowObj.order.yeti.quantity
          }
        },
        {
          label: 'address',
          field: 'address'
        },
        {
          label: 'ราคารวมส่ง',
          field: (rowObj) => {
            let order = rowObj.order
            let totalPrice = ( order.package.quantity * order.package.price ) +
                    ( order.shop.quantity * order.shop.price ) + 
                    ( order.polo.quantity * order.polo.price ) + 
                    ( order.yeti.quantity * order.yeti.price )
            let volume = 0
            let deriveryCost
            if(order.package.quantity>0) volume += 2
            if(order.shop.quantity>0) volume += order.shop.quantity
            if(order.yeti.quantity>0) volume += order.yeti.quantity
            if(order.polo.quantity>0) volume += order.polo.quantity

            if(volume<4) deriveryCost = 60
            else deriveryCost = 60+(15 * (volume-3))

            return (totalPrice + deriveryCost).toLocaleString('th')
          }
        }
        // { label: 'วันที่สั่งซื้อ', field: 'created_at' },
        // { label: 'สถานะ', field: 'status' },
      ],
      order: null
    }
  },
  firestore() {
    return {
      orders: db.collection('Order')
    }
  },
  methods: {
    onRowClick(params) {
      this.order = {
        ...params.row
      }
      this.$bvModal.show('view-order')
    },
    async changeStatus(id, status) {

      try {
        await this.$confirm(`แก้ไขสถานะเป็น ${status}`)
        let loader = this.$loading.show({})

        await db.collection('Order').doc(id).update({
          status: status
        })

        loader.hide()

        await  this.$alert('อัพเดตสถานะสำเร็จ','','success')
      } catch (error) {
        
      }
    },
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
    },
    computedOrder() {
      return this.orders.map( order => {
        let item = {...order}
        item.id = order.id
        if(order.created_at) item.created_at = order.created_at.toDate().toLocaleString('th')
        return item
      })
    }
  },
}
</script>