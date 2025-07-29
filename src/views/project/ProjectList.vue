<template>
    <div class="article_category_wrap">
        <el-table :data="projectList" class="table" border empty-text="暂无数据">
            <el-table-column label="ID" prop="id" align="center" />
            <el-table-column label="项目名称" prop="name" align="center" />
            <el-table-column label="项目描述" prop="description" align="center" />
            <el-table-column label="预览图" align="center" width="200">
                <template #default="scope">
                    <img class="project_img" :src="scope.row.thumb" />
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="id" align="center">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row.id)" type="primary" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row.id)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, defineProps, defineEmits, defineExpose, getCurrentInstance } from 'vue';
import Config from '@/config/base.config';
import { useRouter } from 'vue-router';

const emits = defineEmits(['']);
const { $api } = getCurrentInstance().proxy;
const router = useRouter();
const props = defineProps({});
const page = ref(1);
const limit = ref(50);
const projectList = ref([]);

const getprojectList = async () => {
    const res = await $api({
        type: 'getProject',
        data: { page: page.value, limit: limit.value },
    });
    if (res.code === 0) {
        projectList.value = res.data.rows;
    }
};

const handleEdit = async (id) => {
    router.push({ name: 'project_compile', query: { id } });
};

const handleDelete = async (id) => {
    const res = await $api({
        type: 'deleteProject',
        data: { id },
    });
    if (res.code === 0) {
        ElMessage.success('删除成功');
        await getprojectList();
    }
};

onMounted(() => {
    getprojectList();
});
</script>
<style scoped lang="scss">
.article_category_wrap {
    padding: 20px;
}
.project_img {
    width: 150px;
    height: auto;
}
</style>
