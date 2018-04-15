

import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueQuillEditor)


new Vue({
  el:'#app',
  router,
  store,
  components:{App },
  template:'<App />'
})
