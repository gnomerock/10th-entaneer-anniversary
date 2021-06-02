<template>
  <div class="container">
    <div class="row">
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

        <button class="mt-2 btn btn-success btn-block">ยืนยันคำสั่งซื้อ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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