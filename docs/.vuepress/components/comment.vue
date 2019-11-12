<template>
    <div class="vcomment">
         <div id="vcomments"></div>
    </div>
</template>

<script>
import AV from '../api/api.js'
export default {
    mounted() {
        this.createValine()
    },
    methods: {
        createValine() {
        const Valine = require('valine');
        const valine =  new Valine({
            el: '#vcomments',
            appId: AV.applicationId,
            appKey: AV.applicationKey,
            notify: false,
            verify: false,
            avatar: 'monsterid',
            path: window.location.pathname,
            placeholder: '欢迎留言与我分享您的想法...',
            visitor: true,
        });
        this.valineRefresh = false
        }
    },
    watch: {
        '$route' (to, from) {
            if(to.path !== from.path) {
                setTimeout(() => {
                    this.createValine()
                },300)
            }
        }
    },      

}
</script>

<style>
#vcomments {
  max-width:740px;
  height: 120px;
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
