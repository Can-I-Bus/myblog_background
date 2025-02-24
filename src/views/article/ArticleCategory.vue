<template>
    <div class="article_category_wrap">
        <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="showCategoryAction = true"
        >
            添加父级分类
        </el-button>
        <el-table
            :data="categoryList"
            class="table"
            border
            empty-text="暂无数据"
            row-key="id"
        >
            <el-table-column label="ID" prop="id" align="center" />
            <el-table-column label="博客类别" prop="name" align="center" />
            <el-table-column
                label="文章数量"
                prop="article_count"
                align="center"
            />
            <el-table-column label="操作" prop="id" align="center">
                <template #default="scope">
                    <el-button
                        @click="handleEdit(scope.row)"
                        type="primary"
                        size="small"
                        >编辑</el-button
                    >
                    <el-button
                        @click="handleDelete(scope.row.id)"
                        type="danger"
                        size="small"
                        >删除</el-button
                    >
                    <el-button
                        @click="handleAddChild(scope.row.id)"
                        type="success"
                        size="small"
                        >添加子级分类</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <ArticleCategoryAction
            ref="categoryAction"
            :isShow="showCategoryAction"
            @close="showCategoryAction = false"
            @update="getCategoryList"
        />
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import {
    ref,
    onMounted,
    defineProps,
    defineEmits,
    defineExpose,
    getCurrentInstance,
} from 'vue'
import ArticleCategoryAction from './components/ArticleCategoryAction.vue'
const emits = defineEmits([''])
const { $api } = getCurrentInstance().proxy
const props = defineProps({})
const page = ref(1)
const limit = ref(50)
const categoryList = ref([])
const showCategoryAction = ref(false)
const categoryAction = ref(null)

const getCategoryList = async () => {
    const res = await $api({
        type: 'getCategoryList',
        data: { page: page.value, limit: limit.value },
    })
    if (res.code === 0) {
        categoryList.value = res.data
    }
}

const handleEdit = async (row) => {
    categoryAction.value.setId(row.id)
    categoryAction.value.setName(row.name)
    showCategoryAction.value = true
}

const handleDelete = async (id) => {
    const res = await $api({
        type: 'deleteCategory',
        data: { id },
    })
    if (res.code === 0) {
        ElMessage.success('删除成功')
        await getCategoryList()
    }
}

const handleAddChild = (id) => {
    categoryAction.value.setParentId(id)
    showCategoryAction.value = true
}

onMounted(() => {
    getCategoryList()
})
defineExpose({})
</script>
<style scoped lang='scss'>
.article_category_wrap {
    padding: 20px;
}
</style>