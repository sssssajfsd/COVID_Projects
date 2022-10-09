<template>
	<web-view :src="url"></web-view>
</template>

<script>
  export default {
    data() {
      return {
        url: "",
      }
    },
    onLoad(e){
      console.log(e);
      this.url +=JSON.parse( decodeURIComponent(e.sourceUrl));
    },
    methods: {
      
    }
  }
</script>

<style>

</style>