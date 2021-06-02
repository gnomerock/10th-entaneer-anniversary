<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import {
  fb,
  ui
} from '@/firebase'
export default {
  mounted() {
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: fb.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: 'image', // 'audio'
            size: 'normal', // 'invisible' or 'compact'
            badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
          },
          defaultCountry: 'TH'
        }
      ]
    };
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>