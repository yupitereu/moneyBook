<template>
  <div>
    <test />
  </div>
</template>

<script>
// @ is an alias to /src
import test from '@/components/test.vue'

export default {
  name: "new.vue",
  components : {
    test
  }
}
</script>

<style scoped>

</style>