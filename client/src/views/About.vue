<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'About',
  watch: {
    $route(to, from) {
      console.log('to', to.hash, 'from', from.hash);
    }
  },
  mounted() {
    console.log('About Mounted', this.$route.hash);
  },
  beforeDestroy() {
    console.log('About BeforeDestroy');
  }
}
</script>