<template>
    <div class="comment_wrap">
        <el-table
            :data="commentList"
            size="small"
            class="table"
            border
            empty-text="暂无数据"
        >
            <el-table-column label="ID" prop="id" width="80px" align="center">
            </el-table-column>
            <el-table-column label="头像" prop="title" align="center">
                <template #default="scope">
                    <img
                        class="banner_img"
                        :src="config.BASE_URL + scope.row.mid_img"
                    />
                </template>
            </el-table-column>
            <el-table-column label="昵称" prop="description" align="center">
            </el-table-column>
            <el-table-column label="评论文章" prop="id" align="center">
            </el-table-column>
            <el-table-column label="评论内容" prop="id" align="center">
            </el-table-column>
            <el-table-column label="评论日期" prop="id" align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                width="150px"
                align="center"
                fixed="right"
            >
                <template #default="scope">
                    <div style="display: flex">
                        <el-button
                            type="text"
                            color="red"
                            @click="handleDel(scope.row.id)"
                            >删除</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <BannerAction
            ref="BannerActionRef"
            :isShow="isShowBannerAction"
            @close="isShowBannerAction = false"
            @update="getcommentList"
        />
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, getCurrentInstance } from 'vue'
import BannerAction from './components/BannerAction.vue'
import config from '@/config/base.config'
const { $api } = getCurrentInstance().proxy
const commentList = ref([])
const isShowBannerAction = ref(false)

const getcommentList = async () => {
    const res = await $api({ type: 'getcommentList' })
    if (res.code === 0) {
        commentList.value = res.data
    } else {
        ElMessage.error(res.msg)
    }
}

const handleDel = async (id) => {
    const data = {
        id,
    }
    const res = await $api({ type: 'delBanner', data })
    if (res.code === 0) {
        ElMessage.success('删除成功')
        await getcommentList()
    } else {
        ElMessage.error(res.msg)
    }
}

onMounted(() => {
    getcommentList()
})
</script>
<style scoped lang='scss'>
.comment_wrap {
    padding: 20px;
}
.table {
    margin-bottom: 20px;
    height: calc(100vh - 160px) !important;
}
.banner_img {
    width: 150px;
    height: auto;
}
</style>