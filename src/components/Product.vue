<template>
  <div class="card shadow mt-2">
    <div class="card-body">
      <div class="row">
        <div class="col-5">
          <CoolLightBox 
            :items="product.images" 
            :index="lbIndex"
            @close="lbIndex = null">
          </CoolLightBox>
          <carousel :perPage="1">
            <slide v-for="(image, index) in product.images" :key="index">
              <div class="img" :style="`background-image: url('${image}')`" @click.prevent="lbIndex=index"></div>
            </slide>
          </carousel>
        </div>
        <div class="col-7">
          <h5 class="text-primary">
            {{product.title}}
          </h5>
          <p class="text-dark" v-if="product.note">
            ** {{product.note}}
          </p>
          <p class="description text-gray" v-if="product.note2">
            *** {{product.note2}}
          </p>
          <p class="description text-gray" v-else>
            *** สั่งได้ไม่เกิน {{product.max}} รายการ
          </p>
          <div v-if="product.type!=='yeti'" class="mt-2 mb-2">
            <b-form-group label="เลือก Size">
              <b-form-radio v-model="value.size" value="S">S</b-form-radio>
              <b-form-radio v-model="value.size" value="M">M</b-form-radio>
              <b-form-radio v-model="value.size" value="L">L</b-form-radio>
              <b-form-radio v-model="value.size" value="XL">XL</b-form-radio>
              <b-form-radio v-model="value.size" value="XXL">XXL</b-form-radio>
              <b-form-radio v-model="value.size" value="อื่นๆ">อื่นๆ โปรดระบุขนาดรอบอก <input type="text" class="formcontrol" v-model="value.other" placeholder="เช่น 50, 52, 54, 56 นิ้วเป็นต้น"></b-form-radio>
            </b-form-group>
          </div>
          <div class="text-dark">
            ต้องการสั่งจำนวน
          </div>
          <b-input-group title="Size" class="mt-2 w-10" >
            <b-input-group-prepend>
              <b-button @click.prevent="minus">-</b-button>
            </b-input-group-prepend>
            <b-form-input readonly v-model="value.quantity" min="0" :max="product.max" class="bg-white"></b-form-input>
            <b-input-group-append>
              <b-button @click.prevent="add">+</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import { Carousel, Slide } from 'vue-carousel';
export default {
  props: ['product', 'value'],
   components: {
    CoolLightBox,
    Carousel,
    Slide
  },
  data() {
    return {
      lbIndex: null
    }
  },
  methods: {
    add() {
      if(this.value.quantity<this.value.max) this.value.quantity++
    },
    minus() {
      if(this.value.quantity>0) this.value.quantity--
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  min-width: 200px;
  min-height: 200px;
}
</style>