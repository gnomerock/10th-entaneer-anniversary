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
          <p class="description text-gray">
            สั่งได้ไม่เกิน {{product.max}} ชิ้น
          </p>
          <div class="text-dark">
            ต้องการสั่งจำนวน
          </div>
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
  props: ['product'],
   components: {
    CoolLightBox,
    Carousel,
    Slide
  },
  data() {
    return {
      lbIndex: null
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