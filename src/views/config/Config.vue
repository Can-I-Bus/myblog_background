<template>
    <div class="article_add_wrap">
        <div class="item line">
            <p>网站信息</p>
            <div>
                <p>网站标题</p>
                <el-input style="width: 300px" placeholder="请输入网站标题" v-model="title" clearable />
            </div>
            <div>
                <p>邮箱</p>
                <el-input style="width: 300px" placeholder="请输入邮箱" v-model="title" clearable />
            </div>
            <div>
                <p>备案号</p>
                <el-input style="width: 300px" placeholder="请输入备案号" v-model="title" clearable />
            </div>
        </div>
        <div class="item line">
            <p>网站头像信息</p>
            <div>
                <Upload style="height: 100px; width: 100px" ref="uploadRef" @fileHandler="fileHandler" />
            </div>
        </div>
        <div class="item">
            <p>网站图标信息</p>
            <div>
                <p>网站图标地址</p>
                <el-input style="width: 300px" v-model="thumb" clearable />
            </div>
            <div class="upload_item">
                <p>网站图标地址</p>
                <Upload style="height: 100px; width: 100px" ref="uploadRef" @fileHandler="fileHandler" />
            </div>
        </div>

        <el-button style="float: right; margin-top: 20px" type="primary" @click="submit">提交</el-button>
    </div>
</template>
<script setup>
import Upload from '../../components/base/Upload.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
const { $api } = getCurrentInstance().proxy;
const route = useRoute();
const categoryId = ref('');
const editorRef = ref(null);
const uploadRef = ref(null);
const categoryList = ref([]);
const thumb = ref('');
const title = ref('');
const description = ref('');

const getCategoryList = async () => {
    const res = await $api({ type: 'getCategoryList' });
    if (res.code === 0) {
        categoryList.value = res.data;
    }
};

const fileHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'banner');
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
        title: title.value,
        category_id: categoryId.value[categoryId.value.length - 1],
        thumb: thumb.value,
        toc: [],
        html_content: editorRef.value.getHTML(),
        markedown_content: editorRef.value.getMarkdown(),
        description: description.value,
    };
    if (data.id === '') {
        delete data.id;
    }
    return data;
};

const submit = async () => {
    const type = route.query?.id ? 'editArticle' : 'addArticle';
    const successMsg = route.query?.id ? '修改成功' : '添加成功';
    const data = getData();
    const res = await $api({ type, data });
    if (res.code === 0) {
        ElMessage.success(successMsg);
        reset();
        editorRef.value.reset();
    } else {
        ElMessage.error(res.msg);
    }
};

const reset = () => {
    title.value = '';
    categoryId.value = '';
    thumb.value = '';
    description.value = '';
    uploadRef.value.setUrl(null);
    editorRef.value.reset();
};

const getArticleById = async () => {
    const res = await $api({
        type: 'getArticleList',
        data: { id: route.query.id },
    });
    if (res.code === 0) {
        title.value = res.data.title;
        categoryId.value = res.data.category_id;
        thumb.value = res.data.thumb;
        description.value = res.data.description;
        uploadRef.value.setUrl(res.data.thumb);
        editorRef.value.setHTML(res.data.html_content);
    } else {
        ElMessage.error(res.msg);
    }
};

const init = async () => {
    await getCategoryList();
    if (route.query.id) {
        await getArticleById();
    }
};

onMounted(() => {
    init();
});
</script>
<style scoped lang="scss">
.article_add_wrap {
    padding: 20px;
    overflow: auto;
}
.item {
    position: relative;
    margin-bottom: 50px;
    color: #4e4d4d;
    > p {
        font-size: 22px;
        margin-bottom: 18px;
    }
    > div:not(.upload_item) {
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        p {
            white-space: nowrap;
            margin-right: 20px;
        }
    }
    .upload_item {
        p {
            margin-bottom: 14px;
        }
    }
}
.line::after {
    content: '';
    position: absolute;
    bottom: -20px;
    width: 100%;
    height: 1px;
    background-color: rgb(222, 219, 219);
}
</style>
