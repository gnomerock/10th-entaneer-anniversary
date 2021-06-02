<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {
  fb,
  db
} from '@/firebase'
export default {
  created() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const userData = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
        }
        console.log({userData})
      }else{
        this.$router.push('login')
      }
    }, function(error) {
      console.log(error);
    });
  }
}
</script>