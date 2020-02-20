import Vue from 'vue'

import http from '@@/assets/utils/http'
import {
  WEB_API
} from '@@/assets/api/server'
import {
  CHAIN_API
} from '@@/assets/api/chainServer'
import VueLazyload from 'vue-lazyload'

// import _ from 'lodash'
// Vue.prototype._ = _

Vue.use(VueLazyload)

window.http = http
window.WEB_API = WEB_API
window.CHAIN_API = CHAIN_API
