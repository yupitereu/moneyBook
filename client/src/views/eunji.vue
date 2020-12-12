<template>
  <div>
    <eunji />
    <test />
  </div>
</template>

<script>
// @ is an alias to /src
import eunji from '@/components/eunji.vue'
import test from '@/components/test.vue'

export default {
  name: "eunji.vue",
  components: {
    test,
    eunji
  }
}
</script>

<style scoped>

</style>