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
  async created() {
    // let loader = this.$loading.show({})
    // setTimeout(() => {
    //   loader.hide()
    // }, 3000)
    fb.auth().onAuthStateChanged(async (user) => {
      let loader = this.$loading.show({})
      if (user) {
        // User is signed in.
        const userData = {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName,
        }
        const uid = userData.uid

        let userInfo = await db.collection('user').doc(uid).get(uid)
        if(userInfo.exists) {
          //
        }else{
          await db.collection('user').doc(uid).set({
            phoneNumber: userData.phoneNumber
          })
        }

        this.$store.commit('setUser', {
          phoneNumber: userData.phoneNumber,
          uid: uid,
          displayName: userData.displayName
        })

        let order = await db.collection('Order').doc(uid).get()
        if(order.exists) {
          if(this.$route.path!=='/summary' && this.$route.path!=='/orders-summary') this.$router.push('summary')
        }
      }else{
        this.$router.push('login')
      }
      loader.hide()
    }, function(error) {
      console.log(error);
    });
  }
}
</script>