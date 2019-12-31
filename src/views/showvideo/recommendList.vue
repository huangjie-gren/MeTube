<template>
    <div style="background: #f6f5f7;">
        <div style="margin-top:10px;"></div>
        <el-container v-for="video in vData" :key="video.id" style="margin-left:30px; margin-right: 100px; height: 170px;" >
            <div style="margin-top:10px; margin-left: 50px; cursor:pointer" @click="handlePlay(video.id)">
                <el-image
                style="width: 250px; height: 150px"
                :src="video.avatar"></el-image>
            </div>
            <div style="margin-top:10px; margin-left: 20px; width: 600px" >
                <div style="width: 500px; font: 25px roboto,arial,sans-serif; color: #0D0D0D; cursor:pointer" @click.prevent="handlePlay(video.id)">
                    <div><span>{{video.title}}</span></div>
                </div>
                <div style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:0px 1.3px 0px 0px;">
                    <span style="margin:0px 1.3px 0px 0px;">Up主 {{video.owner}}</span>
                </div>
                <div style="width: 500px; font: 15px roboto,arial,sans-serif; color: #606060; padding:8px 0px 0px">
                    <span style="margin:0px 1.3px 300px 0px;">播放量 {{video.views}}</span>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script>
import { getVideoInfo } from '@/api/rankinglist'
export default {
    name: 'recommendList',
    data() {
        return {
            vData: '',
            totalData: '',
        }
    },
    methods: {
        handlePlay(id) {
            this.$router.push({ name: "showVideo", params: { videoID: id } });
        },
    },
    created:function(){
        getVideoInfo()    // 一次性获得所有信息
                .then(response => {
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
</style>
