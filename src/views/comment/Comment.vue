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
            <el-table-column label="昵称" prop="nickname" align="center">
            </el-table-column>
            <el-table-column label="评论文章" prop="id" align="center">
                <template #default="scope">
                    {{ scope.row.article?.title }}
                </template>
            </el-table-column>
            <el-table-column label="评论内容" prop="content" align="center">
            </el-table-column>
            <el-table-column
                label="评论日期"
                prop="id"
                align="center"
                width="180"
            >
                <template #default="scope">
                    {{ formatTimestamp(new Date(scope.row.created_at)) }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="150px"
                align="center"
                fixed="right"
            >
                <template #default="scope">
                    <el-button type="danger" @click="handleDel(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, getCurrentInstance } from 'vue'
import { formatTimestamp } from '@/utils'
import config from '@/config/base.config'
const { $api } = getCurrentInstance().proxy
const commentList = ref([])
const total = ref(0)

const getCommentList = async () => {
    const res = await $api({ type: 'getCommentList' })
    if (res.code === 0) {
        commentList.value = res?.data?.rows ?? []
        total.value = res?.data?.count ?? 0
    } else {
        ElMessage.error(res.msg)
    }
}

const handleDel = async (id) => {
    const data = {
        id,
    }
    const res = await $api({ type: 'deleteComment', data })
    if (res.code === 0) {
        ElMessage.success('删除成功')
        await getCommentList()
    } else {
        ElMessage.error(res.msg)
    }
}

onMounted(() => {
    getCommentList()
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
.avatar {
    width: 70px;
    height: 70px;
}
</style>