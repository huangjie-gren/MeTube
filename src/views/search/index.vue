<template>
  <div>{{input}}</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      input: this.$route.query.input
    };
  },
  created() {}
};
</script>
