<template>
    <div class="article_list_wrap">
        <div class="top">
            <span>筛选分类：</span>
            <el-select style="width: 150px" v-model="categoryId" placeholder="请选择" @change="handleChange">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </div>
        <el-table style="width: 100%" :data="articleList" class="table" border empty-text="暂无数据">
            <el-table-column label="ID" prop="id" width="80px" align="center"> </el-table-column>

            <el-table-column label="文章名称" prop="title" align="center"> </el-table-column>
            <el-table-column label="文章描述" width="200" prop="description" align="center"> </el-table-column>
            <el-table-column label="文章封面" width="120px" align="center">
                <template #default="scope">
                    <img style="width: 100px; height: auto" :src="scope.row.thumb" />
                </template>
            </el-table-column>
            <el-table-column label="浏览量" prop="scan_number" align="center"> </el-table-column>
            <el-table-column label="评论量" prop="comment_number" align="center"> </el-table-column>
            <el-table-column label="所属分类" align="center">
                <template #default="scope">
                    {{ scope.row.category?.name }}
                </template>
            </el-table-column>
            <el-table-column label="创建日期" prop="description" width="180" align="center">
                <template #default="scope">
                    {{ createTime(scope.row.created_at) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="description" width="150" align="center" fixed="right">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits, getCurrentInstance } from 'vue';
import { formatTimestamp } from '@/utils';
import { useRouter } from 'vue-router';
import config from '@/config/base.config';
import { ElMessage } from 'element-plus';
const emits = defineEmits(['']);
const { $api } = getCurrentInstance().proxy;
const router = useRouter();
const props = defineProps({});
const articleList = ref([]);
const page = ref(1);
const limit = ref(50);
const categoryList = ref([]);
const categoryId = ref('');
const createTime = (date) => {
    return formatTimestamp(new Date(date));
};

const handleEdit = (id) => {
    router.push({ name: 'article_compile', query: { id } });
};

const handleDel = async (id) => {
    const data = {
        id,
    };
    const res = await $api({ type: 'deleteArticle', data });
    if (res.code === 0) {
        ElMessage.success('删除成功');
        await getArticleList();
    } else {
        ElMessage.error(res.msg);
    }
};

const getArticleList = async () => {
    const data = {
        page: page.value,
        limit: limit.value,
        category_id: categoryId.value,
    };
    const res = await $api({ type: 'getArticleList', data });
    if (res.code === 0) {
        articleList.value = res.data?.rows ?? [];
    }
};

const getCategoryList = async () => {
    const res = await $api({ type: 'getCategoryList' });
    if (res.code === 0) {
        categoryList.value = res.data ?? [];
    }
};

const handleChange = () => {
    getArticleList();
};

onMounted(() => {
    getArticleList();
    getCategoryList();
});
</script>
<style scoped lang="scss">
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
.table {
    width: 100%;
}
</style>
