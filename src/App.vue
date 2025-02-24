<template>
    <div>
        <el-config-provider size="small" :locale="zhCn">
            <router-view />
        </el-config-provider>
    </div>
</template>

<script setup>
import { useTabStore } from '@/store/nav'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useUserStore } from '@/store/index'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const tabStore = useTabStore()
const userStore = useUserStore()
const { initTab } = tabStore
const { setApi } = userStore

onMounted(() => {
    initTab()
    setApi(getCurrentInstance().proxy.$api)
})
</script>
<style scoped lang='scss'>
</style>