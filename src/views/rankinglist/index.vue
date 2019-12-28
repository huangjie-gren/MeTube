<template>
    <div style="background: #f6f5f7;">
        <div style="margin-top:10px;"></div>
        <div style="margin-left:50px; margin-right: 50px; ">
            <el-row :gutter="50">
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(1)"><i style ="font-size: 40px" class="el-icon-video-camera-solid"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">影视</div></el-col>
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(2)"><i style ="font-size: 40px" class="el-icon-headset"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">音乐</div></el-col>
                <el-col style="margin-top:15px;" :span="2.1"><el-button style="width: 80px; height: 80px" type="info" circle @click.native.prevent="onClicktag(3)"><i style ="font-size: 40px" class="el-icon-basketball"></i></el-button><div style="font: 20px roboto,arial,sans-serif;">体育</div></el-col>
            </el-row>
        </div>
        <div style="margin-left:75px; margin-right: 150px;"><el-divider></el-divider></div>
        <el-container v-for="video in vData" :key="video.id" style="margin-left:30px; margin-right: 100px; height: 170px;" >
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
    </div>
</template>

<script>
import { getVideoInfo } from '@/api/rankinglist'
export default {
    data() {
        return {
            vData: '',
            totalData: '',
        }
    },
    methods: {
        onClicktag(tag) {
            if(tag == 1) {
                this.vData = this.totalData.filter(function (video) {
                    return video.tag == 1;
                });
            }
            else if(tag == 2) {
                this.vData = this.totalData.filter(function (video) {
                    return video.tag == 2;
                });
            }
            else if(tag == 3) {
                this.vData = this.totalData.filter(function (video) {
                    return video.tag == 3;
                });
            }
        },
        handlePlay(id) {
            /* 如何路由到具体的播放页 */
            //
            this.$router.push({ name: "showVideo", params: { videoID: id } });
        },
    },
    created:function(){
        getVideoInfo()    // 一次性获得所有信息
                .then(response => {
                    //console.log('haha');
                    const { data } = response;
                    this.totalData = data;
                    this.vData = this.totalData;
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