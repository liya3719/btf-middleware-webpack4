<template>
  <div class="example">
    {{message}}
  </div>
</template>
<style lang="sass">
  html, body {
    height: 100%;
  }
  .example {
    width: 100%;
    height: 100%;
    background: orange;
  }
</style>
<script>
const test = '111';
const a = [1,2,3];
const b = [4,5,6];
export default {
  data() {
    return {
      message: 'test1222111111221223'
    }
  },
  methods: {
    init() {
      console.log(test);
      console.log({...a, ...b});
    }
  }
}
</script>