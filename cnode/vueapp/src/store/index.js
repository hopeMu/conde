import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'  //http请求

Vue.use(Vuex)



var config = {
  rootUrl:'https://cnodejs.org/api/v1',
  topics:'/topics', //列表请求地址
  topic:'/topic', //详情请求地址
  userinfos:'/user' //个人信息
};


export default new Vuex.Store({
  state:{
    list_of:'all',//跳转对应路由
    list:[],      //数据
    page:1,       //页
    pageData:null, //单页数据
    pageContent:null, //单页具体内容
    pageReplies:null, //评论数据
    //cnode  给的登陆请求的字符串
    accessToken:'a62d9181-6c90-446d-9dce-612810378b82',
    //设置一个能登陆的账户和密码的数据
    userInfo:{
      username:'hopeMu',
      password:'1123'
    },
    userInfos:null,   //个人信息数据
    logined:false,    //是否有cookie
    //发布消息需要提交保存的数据
    postContent:{
      title:'',       //消息标题
      tab:'dev',      //发布消息对应的类型
      content:''      //发布的消息内容
    },
    topic_id:''       //判断在没有cookie值的时候让发布主题按钮消失
  },
  getters:{},
  mutations:{ //同步请求  修改静态数据
    editList(state,list){
      state.list = list;//修改数据
    },
    editListOf(state,name){
      state.list_of = name;//修改显示路由
    },
    editPage(state,num) {
      state.page = num;   //更改页码
    },
    editfullscreenLoading(state,bool){
      state.fullscreenLoading = bool;
    },
    editPageData(state,data){   //详情页数据
      state.pageData = data;
      state.pageContent = data.content;
      state.pageReplies = data.replies;
    },
    editLogined(state,bool){  //改变cookie是否存在的状态
      state.logined = bool;
    },
    edituserInfos(state,infos){
      state.userInfos = infos;
    },
    //用发布页中收集的对应参数合并到原数据中修改原数据
    editPostContent(state,postContent){
      Object.assign(state.postContent,postContent);
    },
    //登陆完成调用的方法把cookie的name传给数据让发布按钮可显示
    editTopicId(state,id){
      state.topic_id = id;
    }
  },
  actions:{   //异步请求数据

    //向后端发送数据
    sendContent(content,token){
      var {rootUrl,topics} = config;  //地址

      var postData = Object.assign(content.state.postContent,{"accesstoken":token});
      //post  向后端发送数据
      return axios.post(rootUrl+topics,postData);
    },


    //个人信息请求
    getUserInfos(context){rootUrl+userinfos+'/'+context.state.userInfo.username
      var {rootUrl,userinfos} = config;
      return axios.get()
        .then(data=>{
          console.log(data.data.data);
          context.commit('edituserInfos',data.data.data);
        });
    },

    getList(content){
      var {rootUrl,topics} = config;
      return axios.get(rootUrl+topics,{
        params:{
          tab:content.state.list_of,
          page:content.state.page
        }
      })
        .then(data=>{

          content.commit('editList',data.data.data)
        })
    },
    getData(content,id){
      var {rootUrl,topic} = config;

      return axios.get(rootUrl+topic+'/'+id)
        .then(data=>{
          console.log(data)
          content.commit('editPageData',data.data.data)
        })
    }
  }
})
