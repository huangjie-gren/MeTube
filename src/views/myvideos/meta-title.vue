<template>
  <div class="main">
    <el-row gutter="20" class="firstline">
      <el-col :span="4" class="tag">
        <span>{{ tag }}</span>
      </el-col>
      <el-col :span="20" class="title">
        <span >{{ title }}</span>
      </el-col>
    </el-row>
    <el-row gutter="20" class="secondline">
      <time>time</time>
    </el-row>
    <el-row gutter="20" class="thirdline">
        
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Metatitle",
  data() {
    return {
      tag: "biaoqian",
      title: "biaoti"
    };
  }
};
</script>
<style scoped>
.firstline {
  /* background-color: blue; */
}
.tag {
  display: inline-block;
  padding: 0 8px;
  border: 1px solid #e5e9ef;
  color: #666;
  border-radius: 12px;
  vertical-align: top;
  line-height: 22px;
  margin-right: 10px;
  /* background-color: red; */
}
.title {
  display: inline-block;
  max-width: 420px;
  font-size: 18px;
  color: #212121;
}
.secondline {
  padding: 18px 0 20px;
}
</style>