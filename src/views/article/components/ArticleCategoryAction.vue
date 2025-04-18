<template>
    <div>
        <el-dialog :model-value="props.isShow" :title="id === '' ? '新增分类' : '编辑分类'" width="350" :before-close="handleClose">
            <p>博客类别：</p>
            <el-input style="margin-bottom: 20px" placeholder="请输入分类" v-model="name"></el-input>
            <p>Icon：</p>
            <Upload style="height: 100px; width: 100px" ref="uploadRef" @fileHandler="fileHandler" />
            <div class="footer">
                <span class="dialog-footer">
                    <el-button class="btn_form_close" @click="handleClose"> 取消 </el-button>
                    <el-button :loading="loading" type="primary" @click="handleConfrim"> 确认 </el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, defineEmits, defineProps, onMounted, defineExpose, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import Upload from '../../../components/base/Upload.vue';
const emit = defineEmits(['close', 'update']);
const { $api } = getCurrentInstance().proxy;
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
    },
});
const uploadRef = ref(null);
const parentId = ref('');
const id = ref('');
const name = ref('');
const icon = ref('');
const loading = ref(false);

const setParentId = (id) => {
    parentId.value = id;
};

const setId = (_id) => {
    id.value = _id;
};

const setName = (_name) => {
    name.value = _name;
};

const setIcon = (_icon) => {
    setTimeout(() => {
        uploadRef.value.setUrl(_icon);
    }, 0);
};

const addCategory = async () => {
    const res = await $api({
        type: 'addCategory',
        data: {
            icon: icon.value,
            name: name.value,
            parent_id: parentId.value === '' ? null : parentId.value,
        },
    });
    if (res.code === 0) {
        ElMessage.success('添加成功');
        handleClose();
        emit('update');
    } else {
        ElMessage.error(res.msg);
    }
};

const fileHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'banner');
    const res = await $api({ type: 'upload', data: formData });
    if (res.code === 0) {
        ElMessage.success('上传成功');
        icon.value = res.data.file.url;
    } else {
        ElMessage.error(res.msg);
    }
};

const editCategory = async () => {
    const res = await $api({
        type: 'editCategory',
        data: { id: id.value, name: name.value, icon: icon.value },
    });
    if (res.code === 0) {
        ElMessage.success('编辑成功');
        handleClose();
        emit('update');
    } else {
        ElMessage.error(res.msg);
    }
};

const handleClose = () => {
    emit('close');
    name.value = '';
    parentId.value = '';
    id.value = '';
    uploadRef.value.setUrl(null);
    uploadRef.value = null;
};

const handleConfrim = async () => {
    if (id.value === '') {
        await addCategory();
    } else {
        await editCategory();
    }
};

defineExpose({
    setId,
    setName,
    setParentId,
    setIcon,
});
</script>
<style scoped lang="scss">
.footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
