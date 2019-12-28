<template>
    <div style="background: #f6f5f7;">
        <div style="margin-top:10px;"></div>
        <div style="margin-left:50px; margin-right: 50px; ">
            <el-row :gutter="50">
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(1)"><i style ="font-size: 40px" class="el-icon-video-camera-solid"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">Tech</div></el-col>
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(2)"><i style ="font-size: 40px" class="el-icon-headset"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">Life</div></el-col>
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(3)"><i style ="font-size: 40px" class="el-icon-basketball"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">Anime</div></el-col>
            </el-row>
        </div>
        <div style="margin-left:75px; margin-right: 150px;"><el-divider></el-divider></div>
        <el-container v-for="video in vData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="video.id" style="margin-left:30px; margin-right: 100px; height: 170px;" >
            <div style="margin-top:10px; margin-left: 50px; cursor:pointer" @click="handlePlay(video.id)">
                <el-image
                style="width: 250px; height: 150px"
                :src="video.avatar"></el-image>
            </div>
            <div style="margin-top:10px; margin-left: 20px; width: 600px" >
                <el-dropdown style="float: right; padding: 3px 0">
                    <span style="cursor: pointer; color: #606060;">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native.prevent="handlePlay(video.id)">播放</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div style="width: 500px; font: 25px roboto,arial,sans-serif; color: #0D0D0D; cursor:pointer" @click.prevent="handlePlay(video.id)">
                    <div><span>{{video.title}}</span></div>
                </div>
                <div style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:0px 1.3px 0px 0px;">
                    <span style="margin:0px 1.3px 0px 0px;">Up主 {{video.owner}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="margin:0px 1.3px 300px 0px;">播放量 {{video.views}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>更新时间 {{video.updated_at}}</span>
                </div>
                <div style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:8px 0px 0px">
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
            style="text-align:center">
        </el-pagination>
    </div>
</template>

<script>
import { getVideoInfo } from '@/api/rankinglist'
export default {
    data() {
        return {
            vData: '',
            totalData: '',
            total: 0, //数据总数
            pagesize:10, //默认每页的数据条数
            currentPage:1, //默认开始页面
        }
    },
    methods: {
        onClicktag(tag) {
            //console.log(this.totalData.length)
            //console.log(this.totalData[0]);
            if(tag == 1) {
                this.vData = this.totalData.filter(function (video) {
                    return video.typename === "tech";
                });
            }
            else if(tag == 2) {
                this.vData = this.totalData.filter(function (video) {
                    return video.typename === "life";
                });
            }
            else if(tag == 3) {
                this.vData = this.totalData.filter(function (video) {
                    return video.typename === "anime";
                });
            }
            this.total = this.vData.length;
            this.currentPage = 1;
        },
        handlePlay(id) {
            this.$router.push({ name: "showVideo", params: { videoID: id } });
        },
        current_change:function(currentPage) {
            this.currentPage = currentPage;
        },
        size_change:function(pagesize) {
            this.pagesize = pagesize;
        },
    },
    created:function(){
        getVideoInfo()    // 一次性获得所有信息
                .then(response => {
                    const { data } = response;
                    this.totalData = data;
                    this.vData = this.totalData;
                    this.total = this.vData.length;
                })
                .catch(error => {
                    console.log(error);
                })
    }
}
</script>

<style scoped>
  .el-row {
    margin-left: 30px;
    margin-bottom: 5px;
  }
  .el-col {
    margin-left: 30px;
    text-align: center;
  }  
</style>