<template>
  <div class="container mt-2 mb-2">
    <h3 class="text-white text-center mt-2">เลือกซื้อสิ่งของที่ระลึก</h3>
    <p class="text-center">*** ค่าส่ง 3 ชิ้นแรก 60บาท ,ชิ้นที่ 4 เป็นต้นไปบวกเพิ่มชิ้นละ 15 บาท ***</p>
    <product :product="packaged" v-model="packaged"></product>
    <product :product="shop" v-model="shop"></product>
    <product :product="polo" v-model="polo"></product>
    <product :product="yeti" v-model="yeti"></product>
    <button :disabled="packaged.quantity===0 && shop.quantity===0 && polo.quantity===0 && yeti.quantity===0" class="btn btn-success btn-block mt-2 w-100" @click.prevent="submitOrder">ยืนยันคำสั่งซื้อ</button>
    <button class="mt-2 btn btn-danger btn-block w-100" @click.prevent="$router.push('/')">กลับ</button>
  </div>
</template>

<script>
import Product from '../components/Product'
export default {
  components: {
    Product
  },
  data() {
    return {
      packaged: {
        title: 'รายการที่ 1  : Package เสื้อโปโล+แก้ว ราคา 839 บาท',
        note: 'สินค้าใน package มีเสื้อ 1ชิ้น ,แก้ว 1 ชิ้น',
        note2: 'จำกัดจำนวน 1 package /order เนื่องจากเหตุผลด้านการจัดส่ง (ขออภัยในความไม่สะดวก)',
        images: [
          '/images/comboset.jpg',
          '/images/polo.jpg',
          '/images/polo_size.jpg',
          '/images/yeti_3.jpg',
          '/images/yeti_5.jpg',
          '/images/yeti_6.jpg',
        ],
        price: 839,
        max: 1,
        quantity: 0,
        size: null
      },
      shop: {
        title: 'รายการที่ 2 : เสื้อ SHOP ครบรอบ 10 ปี ราคาชิ้นละ 499 บาท',
        images: [
          '/images/shop.jpg',
          '/images/shop_size.jpg',
        ],
        price: 499,
        quantity: 0,
        max: 3, //
        size: null
      },
      polo: {
        title: 'รายการที่ 3 : เสื้อโปโล ราคาชิ้นละ 499 บาท',
        images: [
          '/images/polo.jpg',
          '/images/polo_size.jpg',
        ],
        price: 499,
        max: 5,
        quantity: 0,
        size: null
      },
      yeti: {
        title: 'รายการที่ 4 : แก้วเก็บความร้อน-เย็น ราคา 390 บาท',
        images: [
          '/images/yeti_3.jpg',
          '/images/yeti_5.png',
          '/images/yeti_6.png',
        ],
        price: 390,
        max: 5,
        quantity: 0,
        size: null,
        type: 'yeti'
      },
    }
  },
  created() {
    if(this.$store.state.order) {
      let order = this.$store.state.order
      this.packaged = order.package
      this.shop = order.shop
      this.polo = order.polo
      this.yeti = order.yeti
    }
  },
  methods: {
    async submitOrder() {
      if(this.packaged.quantity>0 && !this.packaged.size) {
        await this.$alert('กรุณาระบุ size เสื้อ Polo ของ package')
        return
      }
      if(this.shop.quantity>0 && !this.shop.size) {
        await this.$alert('กรุณาระบุ size เสื้อ SHOP ครบรอบ 10 ปี')
        return
      }
      if(this.polo.quantity>0 && !this.polo.size) {
        await this.$alert('กรุณาระบุ size เสื้อโปโล')
        return
      }
      this.$store.commit('setOrder', {
        package: this.packaged,
        shop: this.shop,
        polo: this.polo,
        yeti: this.yeti
      })
      this.$router.push('confirm')
    }
  }
}
</script>