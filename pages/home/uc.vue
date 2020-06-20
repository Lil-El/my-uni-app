<template>
  <view>
    <button @click="login">登录</button>
  </view>
</template>

<script>
export default {
  methods: {
    login() {
      uni.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log(loginRes);
        }
      });
    }
  }
};
</script>