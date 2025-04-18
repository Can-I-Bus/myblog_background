<template>
    <div class="home_wrap">
        <el-button type="primary" style="margin-bottom: 10px" @click="isShowBannerAction = true"> 添加Banner </el-button>
        <el-table :data="bannerList" size="small" class="table" border empty-text="暂无数据">
            <el-table-column label="ID" prop="id" width="80px" align="center"> </el-table-column>
            <el-table-column label="标题" prop="title" align="center"> </el-table-column>
            <el-table-column label="描述" prop="description" align="center"> </el-table-column>
            <el-table-column label="站位图banner预览" prop="id" align="center">
                <template #default="scope">
                    <img class="banner_img" :src="scope.row.mid_img" />
                </template>
            </el-table-column>
            <el-table-column label="banner预览" prop="id" align="center">
                <template #default="scope">
                    <img class="banner_img" :src="scope.row.big_img" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center" fixed="right">
                <template #default="scope">
                    <div style="display: flex">
                        <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" color="red" @click="handleDel(scope.row.id)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <BannerAction ref="BannerActionRef" :isShow="isShowBannerAction" @close="isShowBannerAction = false" @update="getBannerList" />
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, getCurrentInstance } from 'vue';
import BannerAction from './components/BannerAction.vue';
import config from '@/config/base.config';
const { $api } = getCurrentInstance().proxy;
const bannerList = ref([]);
const BannerActionRef = ref(null);
const isShowBannerAction = ref(false);
const actionType = ref('add');

const getBannerList = async () => {
    const res = await $api({ type: 'getBannerList' });
    if (res.code === 0) {
        bannerList.value = res.data;
    } else {
        ElMessage.error(res.msg);
    }
};

const handleEdit = (row) => {
    isShowBannerAction.value = true;
    BannerActionRef.value.dataSet(row);
};

const handleDel = async (id) => {
    const data = {
        id,
    };
    const res = await $api({ type: 'delBanner', data });
    if (res.code === 0) {
        ElMessage.success('删除成功');
        await getBannerList();
    } else {
        ElMessage.error(res.msg);
    }
};

onMounted(() => {
    getBannerList();
});
</script>
<style scoped lang="scss">
.home_wrap {
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
