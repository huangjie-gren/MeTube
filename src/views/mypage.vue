<template>
  <div>
    <div class="welcome-line">{{ this.form.username }},欢迎你！</div>
    <div class="update-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            label="描述"
            action
            ref="upload"
            :before-upload="fnBeforeUpload"
            :http-request="fnUploadRequest"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { upload, getInfo} from "@/api/user.js";
import { getToken } from '../utils/auth';
export default {
  computed: {
    ...mapGetters(["username","nickname","id"])
  },
  data() {
    return {
      uid:'',
      imageUrl: "",
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        username: "",
        nickname: "",
        oldpassword: "",
        newpassword: "",
        avatarurl: ""
      }
    };
  },
  created() {
    // this.form.nickname = "a"
    this.form.nickname = this.$store.getters["nickname"];
    this.form.username = this.$store.getters["username"];
    getInfo(getToken()).then(res => {
      console.log(res.data.Avatar)
      this.form.avatarurl = res.data.Avatar
      this.imageUrl = res.data.Avatar
    }).catch(err =>{
      console.log(err)
    })


  },
  methods: {
    fnBeforeUpload(file) {
      const isImage = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传头像图片只能是图片!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    fnUploadRequest(option) {
      console.log(option.file.name)
      upload({filename:option.file.name})
        .then(res => {
          // console.log(res)
          // console.log(option.file)
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.imageUrl = res.data.get;
            this.form.avatarurl = res.data.key;
          };
        })
        .catch(error => {
          this.$notify.error({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    },
    onSubmit() {
      // alert('clicked')
      this.$store
        .dispatch("user/update", this.form)
        .then(() => {
          // alert("update success");
          this.$notify({
            title: '更新成功',
            message: '更新成功',
            type: 'success',
          });
          this.loading = false;
          this.$router.push({path:'/'})
        })
        .catch(() => {
          // alert("update error");
          this.$notify({
            title: '更新失败',
            message: '更新失败',
            type: 'error',
          });
          this.loading = false;
        });
    }
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 178px;
  max-height: 178px;
  display: block;
}
.update-form{
  width:800px;
  margin-left:400px;
  margin-top:50px;
}
.welcome-line{
  margin-left:400px;
  margin-top:30px;
  font-size:17px;
}
</style>
