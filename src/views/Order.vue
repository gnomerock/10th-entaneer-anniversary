<template>
  <div class="container mt-2 mb-2">
    <h3 class="text-primary mt-2">เลือกซื้อสิ่งของที่ระลึก</h3>
    <product :product="packaged"></product>
    <product :product="shop"></product>
    <product :product="polo"></product>
    <product :product="yeti"></product>
    <router-link tag="button" class="btn btn-success btn-block mt-2" to="/confirm">ยืนยันคำสั่งซื้อ</router-link>
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
        title: 'Package เสื้อโปโล+แก้ว ราคา 839 บาท',
        images: [
          '/images/comboset.jpg'
        ],
        price: 839,
        max: 1,
        quantity: 0,
        size: null
      },
      shop: {
        title: 'เสื้อ SHOP ครบรอบ 10 ปี ราคา 499 บาท',
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
        title: 'เสื้อโปโล ราคา 499 บาท',
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
        title: 'แก้วเก็บความร้อน-เย็น ราคา 390 บาท',
        images: [
          '/images/yeti_1.jpg',
          '/images/yeti_2.jpg',
          '/images/yeti_3.jpg',
          '/images/yeti_4.jpg',
          '/images/yeti_5.png',
          '/images/yeti_6.png',
        ],
        price: 390,
        max: 5,
        quantity: 0,
        size: null
      },
    }
  }
}
</script>