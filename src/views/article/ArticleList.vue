<template>
    <div class="article_list_wrap">
        <div class="top">
            <span>筛选分类：</span>
            <el-select
                style="width: 150px"
                v-model="value"
                placeholder="请选择"
            ></el-select>
        </div>
        <el-table
            :data="articleList"
            class="table"
            border
            empty-text="暂无数据"
        >
            <el-table-column label="ID" prop="id" width="80px" align="center">
            </el-table-column>
            <el-table-column label="文章名称" prop="title" align="center">
            </el-table-column>
            <el-table-column label="文章描述" prop="description" align="center">
            </el-table-column>
            <el-table-column label="浏览量" prop="scan_number" align="center">
            </el-table-column>
            <el-table-column
                label="评论量"
                prop="comment_number"
                align="center"
            >
            </el-table-column>
            <el-table-column label="所属分类" prop="description" align="center">
            </el-table-column>
            <el-table-column label="创建日期" prop="description" align="center">
                <template #default="scope">
                    {{ createTime(scope.row.created_at) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="description" align="center">
                <template #default>
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import {
    ref,
    onMounted,
    defineProps,
    defineEmits,
    defineExpose,
    getCurrentInstance,
} from 'vue'
import { formatTimestamp } from '@/utils'
const emits = defineEmits([''])
const props = defineProps({})
const { $api } = getCurrentInstance().proxy
const articleList = ref([])
const page = ref(1)
const limit = ref(50)

const createTime = (date) => {
    return formatTimestamp(new Date(date))
}

const getArticleList = async () => {
    const data = {
        page: page.value,
        limit: limit.value,
    }
    const res = await $api({ type: 'getArticleList', data })
    if (res.code === 0) {
        articleList.value = res.data?.rows ?? []
    }
}

onMounted(() => {
    getArticleList()
})
</script>
<style scoped lang='scss'>
.article_list_wrap {
    padding: 20px;
}
.top {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
        font-size: 14px;
    }
}
</style>