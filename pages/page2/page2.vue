<template>
  <view>
    <button type="primary" @click="select">x</button>
  </view>
</template>

<script>
export default {
  onLoad({ type }) {
    this.type = type;
  },
  created() {
    console.log("vue create func");
  },
  data() {
    return {
      type: null
    };
  },
  methods: {
    select() {
      uni.chooseImage({
        count: 6, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    }
  }
};
</script>

<style>
</style>
