<template>
  <div>
    <el-row class="video-title">
      <el-col class="tit">{{ title }}</el-col>
    </el-row>
    <el-row class="video-data" gutter="20">
      <el-col class="a-crumbs" :span="1">{{ typeName }}</el-col>
      <el-col class="" :span="2">{{ uploadDate }}}</el-col>
    </el-row>
    <el-row class="video-data">
      <el-col :span="2">{{ views }}播放</el-col>
      <!--      <el-col :span="2">2238弹幕</el-col>-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VideoInfo'
}
</script>

<style scoped>
  .video-title{
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tit{
    margin-left: -.5em;
    vertical-align: middle;
  }
  .video-data{
    margin-top: 11px;
    font-size: 12px;
    height: 16px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .a-crumbs{
    margin-right: 16px;
  }
</style>
