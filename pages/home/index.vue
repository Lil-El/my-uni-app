<template>
  <view class="content">
    <view>
      <NavBar />
    </view>
    <view></view>
    <view></view>
  </view>
</template>

<script>
import NavBar from "@/components/date.vue";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style>
.content {
  padding-bottom: 100rpx;
}
.title {
  font-size: 36rpx;
  color: red;
}

#myVideo {
  width: 100vw;
}
</style>
