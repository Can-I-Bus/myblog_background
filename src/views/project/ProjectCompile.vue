<template>
    <div class="article_category_wrap">
        <div class="item">
            <p>项目名称</p>
            <el-input v-model="name" placeholder="请输入项目名称"></el-input>
        </div>
        <div class="item">
            <p>项目描述</p>
            <el-input v-model="description" placeholder="请输入项目描述"></el-input>
        </div>
        <div class="item">
            <p>项目url</p>
            <el-input v-model="url" placeholder="请输入项目url"></el-input>
        </div>
        <div class="item">
            <p>github</p>
            <el-input v-model="github" placeholder="请输入github"></el-input>
        </div>
        <div class="item">
            <p>项目预览图</p>
            <Upload style="height: 300px; width: 300px" ref="uploadRef" @fileHandler="fileHandler" />
        </div>
        <div class="item">
            <p>排序</p>
            <el-select v-model="order">
                <el-option v-for="item in [4, 3, 2, 1]" :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </div>
        <el-button @click="submit" style="float: right" type="primary">提交</el-button>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import Upload from '@/components/base/Upload.vue';

const route = useRoute();
const { $api } = getCurrentInstance().proxy;
const uploadRef = ref(null);
const order = ref(1);
const name = ref('');
const description = ref('');
const url = ref('');
const github = ref('');
const thumb = ref('');

const fileHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await $api({ type: 'upload', data: formData });
    if (res.code === 0) {
        ElMessage.success('上传成功');
        thumb.value = res.data.file.url;
    } else {
        ElMessage.error(res.msg);
    }
};

const getData = () => {
    const data = {
        id: route.query?.id ?? '',
        name: name.value,
        thumb: thumb.value,
        description: description.value,
        url: url.value,
        github: github.value,
        order: order.value,
    };
    if (data.id === '') {
        delete data.id;
    }
    return data;
};

const submit = async () => {
    const type = route.query?.id ? 'editProject' : 'addProject';
    const successMsg = route.query?.id ? '修改成功' : '添加成功';
    const data = getData();
    const res = await $api({ type, data });
    if (res.code === 0) {
        ElMessage.success(successMsg);
        reset();
    } else {
        ElMessage.error(res.msg);
    }
};

const reset = () => {
    name.value = '';
    github.value = '';
    url.value = '';
    thumb.value = '';
    description.value = '';
    uploadRef.value.setUrl(null);
};

const getProjectById = async () => {
    const res = await $api({
        type: 'getProject',
        data: { id: route.query.id },
    });
    if (res.code === 0) {
        name.value = res.data.name;
        github.value = res.data.github;
        url.value = res.data.url;
        order.value = res.data.order;
        thumb.value = res.data.thumb;
        description.value = res.data.description;
        uploadRef.value.setUrl(res.data.thumb);
    } else {
        ElMessage.error(res.msg);
    }
};

const init = async () => {
    if (route.query.id) {
        await getProjectById();
    }
};

onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.article_category_wrap {
    padding: 20px;
}
.item {
    margin-bottom: 20px;
    p {
        margin-bottom: 10px;
        font-size: 20px;
        color: #424242;
    }
}
</style>
