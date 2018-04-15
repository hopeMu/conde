<template>

  <el-row :gutter="20">
    <el-col :span="18" :offset="3">
      标题：
      <el-input v-model="title" placeholder="请输入内容" style="width:400px;"></el-input>
    </el-col>
    <el-col :span="18" :offset="3">
      类型：
      <el-select v-model="tab" placeholder="请选择">
        <el-option value="dev"></el-option>
        <el-option value="job"></el-option>
        <el-option value="share"></el-option>
        <el-option value="ask"></el-option>
      </el-select>
    </el-col>
    <el-col :span="18" :offset="3">
      内容：

      <quill-editor v-model="content"
                    ref="myQuillEditor">
      </quill-editor>

    </el-col>
    <el-col :span="18" :offset="3">
      <el-button @click="send" type="success" style="margin-left:70px;margin-top:20px;">提交主题</el-button>
    </el-col>
  </el-row>


</template>

<script>
  import {mapState,mapMutations,mapActions} from 'vuex'

  export default {
    name:'topic',
    data(){
      return {
        title:'',
        content:'',
      }
    },
    computed:{
      ...mapState([
        'topic_id'
      ]),
      tab(){
        var tab = '';

        if(this.$route.params.id=='all'||this.$route.params.id=='good'){
          tab = 'dev'
        }else{
          tab = this.$route.params.id
        }
        return tab;
      }
    },
    methods:{
      ...mapMutations([
        //修改数据的方法
        'editPostContent',
        'editTopicId'
      ]),
      ...mapActions([
        //发送数据
        'sendContent'
      ]),
      //点击提交对标题和内容的验证
      send(){
        if(this.title==''){
          this.$message({
            type:'error',
            message:'标题不能为空'
          })
        }else if(this.title.length<=10){
          this.$message({
            type:'error',
            message:'标题不能太短'
          })
        }else if(this.content==''){
          this.$message({
            type:'error',
            message:'内容不能为空'
          })
        }else{

          //验证条件满足后就绑定数据
          this.editPostContent({
            title:this.title,
            tab:this.tab,
            content:this.content
          });
          //获取数据过程中页面的加载界面，当发送成功后加载界面就会消失
          const loading = this.$loading({
            lock:true,
            text:'数据发送中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          //绑定完数据后就拿着这些数据去异步请求里向后台发送
          this.sendContent(this.$cookie.get('token_id'))
            //ajax请求成功后
            .then((data)=>{

              this.editTopicId(data.data.topic_id);
              //关闭加载界面
              loading.close();
              //弹出提示
              this.$message({
                type:'success',
                message:'发送成功！',
                duration:1000
              });
              //
              this.$router.push({
                path:'/page/'+this.topic_id
              });
            })
            //ajax请求失败
            .catch(()=>{
              console.log(this.$cookie.get('token_id'))
              loading.close();
              //弹框提示
              this.$message({
                type:'success',
                message:'发送失败！',
                duration:1000
              });
            })
        }
      }
    }
  }
</script>
