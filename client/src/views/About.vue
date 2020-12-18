<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>hash : {{ $route.hash }}</h2>
  </div>
</template>

<script>
export default {
  name: 'About',
  watch: {
    '$route.hash'(to, from) {
      console.log('to', to, 'from', from);
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