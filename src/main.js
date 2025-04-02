// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim

//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/index.js'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import Global from './plugins/global'
import Notifier from './plugins/notifier'
import Moment from './plugins/moment'
import StringUtils from './plugins/string-utils'
import SocketioIOPlugin from './plugins/socketio'
import Rules from './plugins/rules'
import Roles from './plugins/roles'
import Pouch from './plugins/pouch'
import vuetify from './plugins/vuetify'
import { VclFacebook, VclTable } from 'vue-content-loading'
import VueTabsChrome from 'vue-tabs-chrome'
import Utils from './plugins/utils'
import VueGoogleCharts from 'vue-google-charts'
// import CKEditor from '@ckeditor/ckeditor5-vue'
import VueColumnsResizableVuetify from 'vue-columns-resizable-vuetify'
import VueApexCharts from 'vue-apexcharts'
import VuetifyConfirm from 'vuetify-confirm'
import vuePositionSticky from 'vue-position-sticky'
import VueObserveVisibility from 'vue-observe-visibility'
import InfiniteLoading from 'vue-infinite-loading'
import { RecycleScroller } from 'vue-virtual-scroller'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import VueNativeNotification from 'vue-native-notification'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import BluePrintInput from '@/views/component/BluePrintInput.vue'

var VueScrollTo = require('vue-scrollto')

Vue.config.productionTip = false
Vue.use(VueNativeNotification, {
  requestOnNotify: true,
})
Vue.use(PerfectScrollbar)
Vue.use(InfiniteLoading)
Vue.use(VueObserveVisibility)
Vue.use(vuePositionSticky)
Vue.use(VueColumnsResizableVuetify)
Vue.use(VuetifyConfirm, { vuetify })
// Vue.use(CKEditor)
Vue.use(RecycleScroller)
Vue.use(Global)
Vue.use(Notifier)
Vue.use(StringUtils)
Vue.use(SocketioIOPlugin)
Vue.use(Rules)
Vue.use(Roles)
Vue.use(Moment)
Vue.use(Utils)
Vue.use(Pouch)
Vue.use(VueTabsChrome)
Vue.use(VueGoogleCharts)
Vue.use(VueScrollTo, {
   container: 'body',
   duration: 500,
   easing: 'ease',
   offset: -100,
   force: true,
   cancelable: true,
   onStart: false,
   onDone: false,
   onCancel: false,
   x: false,
   y: true,
})
Vue.component('BluePrintInput', BluePrintInput)
Vue.component('VueApexCharts', VueApexCharts)
Vue.component('VFacebookLoading', VclFacebook)
Vue.component('VLoadingTable', VclTable)

export default new Vue({
  mounted () {
    window.addEventListener('resize', () => {
      store.dispatch('screenResize', {
        wsize: window.innerWidth,
        hsize: window.innerHeight,
      })
    })
  },
  router,
  store,
  Notifier,
  vuetify,
  render: h => h(App),
}).$mount('#app')
