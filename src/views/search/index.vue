<template>
  <div>
    <el-container
      v-for="video in vData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :key="video.id"
      style="margin-left:100px; margin-right: 100px; margin-top:70px; height: 170px;"
    >
      <div style="margin-top:10px; margin-left: 50px; cursor:pointer" @click="handlePlay(video.id)">
        <!-- <el-image style="width: 250px; height: 150px" :src="video.avatar"></el-image> -->
        <img style="width: 250px; height: 150px" :src="video.avatar" />
      </div>
      <div style="margin-top:10px; margin-left: 20px; width: 600px">
        <el-dropdown style="float: right; padding: 3px 0">
          <span style="cursor: pointer; color: #606060;">
            操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native.prevent="handlePlay(video.id)">播放</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div
          style="width: 500px; font: 25px roboto,arial,sans-serif; color: #0D0D0D; cursor:pointer"
          @click.prevent="handlePlay(video.id)"
        >
          <div>
            <span>{{video.title}}</span>
          </div>
        </div>
        <div
          style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:0px 1.3px 0px 0px;"
        >
          <span style="margin:0px 1.3px 0px 0px;">Up主 {{video.ownername}}</span>
          <el-divider direction="vertical"></el-divider>
          <span style="margin:0px 1.3px 300px 0px;">播放量 {{video.view}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>更新时间 {{video.created_at.split('T')[0]}}</span>
        </div>
        <div
          style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:8px 0px 0px"
        >
          <span>{{video.info}}</span>
        </div>
      </div>
    </el-container>
    <el-pagination
      layout="total, sizes, prev, pager, next"
      @current-change="current_change"
      @size-change="size_change"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      background
      style="text-align:center"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
import { getSearch  } from "@/api/video.js";
/* eslint-disable */
export default {
  data() {
    return {
      input: this.$route.query.input,
      vData: [
        {title:'aaa'}
      ],
      totalData: "",
      total: 0, //数据总数
      pagesize: 10, //默认每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  methods: {
    handlePlay(id) {
      this.$router.push({ name: "showVideo", params: { videoID: id } });
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    size_change: function(pagesize) {
      this.pagesize = pagesize;
    }
  },
  created: function() {
    getSearch(this.input) // 一次性获得所有信息
      .then(response => {
        console.log(response.data)
        this.totalData = response.data;
        this.vData = response.data;
        this.total = response.data.length
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
