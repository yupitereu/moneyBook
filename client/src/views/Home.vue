<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg1="Welcome to Your Vue.js App1111" msg2="GoodBye to Your Vue.js App1111"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    this.axios.post('/api/Sample/call2', {memberNo: 1})
        .then(response => {
          console.log(response.data);
        })
  }
}
</script>