<template>
  <div class="container" style="min-height: 100vh;">
    <h3 class="text-white">
      Summary
    </h3>
    <div class="card shadow mt-2" style="cursor: pointer" v-for="(order, index) in orders" :key="index">
      <div class="card-body">
        <div class="flex">
          <span>
            {{order.name}} {{order.studentId}} {{order.phoneNumber}}
          </span>
          <button class="btn btn-primary ml-auto">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase'
export default {
  data() {
    return {
      orders: []
    }
  },
  async created() {
    let data = await db.collection('Order').get()
    for(let order of data.docs) {
      this.orders.push(order.data())
    }
  }
}
</script>