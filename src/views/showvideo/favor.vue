<template>
    <div>
        <el-row :gutter="20">-->
         <el-col :span="6">
           <div @click="handleLike" :title="likeTitle">
             <span>
               <svg-icon :icon-class="likeIcon" />
               {{num_like}}
             </span>
           </div>
         </el-col>
         <el-col :span="6">
           <div @click="handleCollection" :title="collectionTitle">
             <span>
             <svg-icon :icon-class="collectionIcon" />
             {{num_collect}}
             </span>
           </div>
         </el-col>
         <el-col :span="6">
           <div :title="分享">
             <i class="el-icon-share"></i>
           </div>
         </el-col>
       </el-row> 
    </div>
</template>

<script>
import playVideo from "./playVideo.vue";
import { mapGetters } from "vuex";
import { upload } from "@/api/user.js";
import { addLike } from "@/api/like_collection";
import { cancleLike } from "@/api/like_collection";
import { addCollect } from "@/api/like_collection";
import { cancleCollect } from "@/api/like_collection";
import { countLike } from "@/api/like_collection";
import { countCollect } from "@/api/like_collection";

  export default {
<<<<<<< Updated upstream
    name: 'Favor'
  }
=======
    name: 'favor',
     computed: {
    ...mapGetters(["username","nickname","id"])
  },
  data() {
    return {
      uid:'',
      vid:this.$route.params.videoID,
      likeTitle: "点赞",
      collectionTitle: "收藏",
      isLike: false,
      isCollection: false,
      collectionIcon: "collection-off",
      likeIcon: "like-off",
      num_like:0,
      num_collect:0,
    };
  },
  created() {
    this.uid = this.$store.getters["id"];
    // console.log("用户id"+this.uid)
    countLike(this.vid)
    .then(res=>{
      this.num_like=res.data.length
    })
    .catch(error => {
      alert('count_like_error')
     });

    countCollect(this.vid)
    .then(res=>{
      this.num_collect=res.data.length
    })
    .catch(error => {
      alert('count_collect_error')
     });

  },
  methods: {
    handleLike: function() {
      //alert(this.vid)
      if (!this.isLike) {
        this.isLike = true;
        this.likeIcon = "like-on";
        this.likeTitle = "取消点赞";

        addLike(this.uid,this.vid)
        .then(response=>{
        })
        .catch(error => {
          alert('add_like_error')
      })

      } else {
        this.isLike = false;
        this.likeIcon = "like-off";
        this.likeTitle = "点赞";

        cancleLike(this.uid,this.vid)
        .then(response=>{
         const { code }=response
          console.log(code)
        })
        .catch(error => {
          alert('cancle_like_error')
      })
      }
    },
    handleCollection: function() {



        if (!this.isCollection) {

        this.isCollection = true;
        this.collectionIcon = "collection-on";
        this.collectionTitle = "取消收藏";

        addCollect(this.uid,this.vid)
        .then(response=>{

        })
        .catch(error => {
          alert('add_collect_error')
      })

      } else {

        this.isCollection = false;
        this.collectionIcon = "collection-off";
        this.collectionTitle = "收藏";

        cancleCollect(this.uid,this.vid)
        .then(response=>{
        })
        .catch(error => {
          alert('handle_collect_error')
      })
      }
    }
  },
}
>>>>>>> Stashed changes
</script>

<style scoped>

</style>
