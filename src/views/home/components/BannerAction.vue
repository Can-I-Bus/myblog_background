<template>
    <div>
        <el-dialog
            :title="editData.id === '' ? '添加Banner' : '编辑Banner'"
            width=""
            :model-value="props.isShow"
            :before-close="handleClose"
        >
            <el-form
                ref="formRef"
                :model="editData"
                :rules="rules"
                label-width="110px"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editData.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input
                        rows="4"
                        v-model="editData.description"
                        type="textarea"
                    ></el-input>
                </el-form-item>
                <el-form-item label="banner" prop="mid_img">
                    <div class="upload_box">
                        <Upload ref="uploadRef" @fileHandler="fileHandler" />
                    </div>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button class="btn_form_close" @click="handleClose">
                    取消
                </el-button>
                <el-button type="primary" @click="handleConfrim">
                    确认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    ref,
    defineEmits,
    defineProps,
    onMounted,
    defineExpose,
    getCurrentInstance,
} from 'vue'
import { ElMessage } from 'element-plus'
import Upload from '@/components/base/Upload.vue'
const { $api } = getCurrentInstance().proxy
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['close', 'update'])
const loading = ref(false)
const uploadRef = ref(null)
const formRef = ref(null)
const rules = ref({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
    mid_img: [{ required: true, message: '请上传banner', trigger: 'change' }],
})
const editData = ref({
    id: '',
    title: '',
    description: '',
    mid_img: '',
})

const dataSet = (data) => {
    editData.value.id = data?.id ?? ''
    editData.value.title = data.title
    editData.value.description = data.description
    editData.value.mid_img = data.mid_img
    setTimeout(() => {
        uploadRef.value.setUrl(data.mid_img)
    }, 100)
}

const fileHandler = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'banner')
    const res = await $api({ type: 'upload', data: formData })
    if (res.code === 0) {
        ElMessage.success('上传成功')
        editData.value.mid_img = res.data
    } else {
        ElMessage.error(res.msg)
    }
}

const handleClose = () => {
    emit('close')
    resetFrom()
}

const getData = () => {
    const data = {
        id: editData.value.id,
        title: editData.value.title,
        description: editData.value.description,
        mid_img: editData.value.mid_img,
    }
    if (editData.value.id === '') {
        delete data.id
        return data
    } else {
        return data
    }
}

const addBanner = async () => {
    const res = await $api({ type: 'addBanner', data: getData() })
    if (res.code === 0) {
        ElMessage.success('添加成功')
        emit('close')
        emit('update')
    } else {
        ElMessage.error(res.msg)
    }
}

const editBanner = async () => {
    const res = await $api({ type: 'editBanner', data: getData() })
    if (res.code === 0) {
        ElMessage.success('修改成功')
        emit('close')
        emit('update')
    } else {
        ElMessage.error(res.msg)
    }
}

const handleConfrim = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            if (editData.value.id === '') {
                await addBanner()
            } else {
                await editBanner()
            }
        }
    })
}

const resetFrom = () => {
    editData.value.id = ''
    editData.value.title = ''
    editData.value.description = ''
    editData.value.mid_img = ''
    uploadRef.value.setUrl(null)
}

defineExpose({
    dataSet,
})
</script>
<style scoped lang='scss'>
.footer {
    display: flex;
    justify-content: flex-end;
}
.upload_box {
    width: 200px;
    height: 200px;
}
</style>