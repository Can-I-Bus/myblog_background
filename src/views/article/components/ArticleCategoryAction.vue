<template>
    <div>
        <el-dialog
            :model-value="props.isShow"
            :title="id === '' ? '新增分类' : '编辑分类'"
            width="300"
            :before-close="handleClose"
        >
            <el-input placeholder="请输入分类" v-model="name"></el-input>
            <div class="footer">
                <span class="dialog-footer">
                    <el-button class="btn_form_close" @click="handleClose">
                        取消
                    </el-button>
                    <el-button
                        :loading="loading"
                        type="primary"
                        @click="handleConfrim"
                    >
                        确认
                    </el-button>
                </span>
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
const emit = defineEmits(['close', 'update'])
const { $api } = getCurrentInstance().proxy
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
    },
})
const parentId = ref('')
const id = ref('')
const name = ref('')
const loading = ref(false)

const setParentId = (id) => {
    parentId.value = id
}

const setId = (_id) => {
    id.value = _id
}

const setName = (_name) => {
    name.value = _name
}

const addCategory = async () => {
    const res = await $api({
        type: 'addCategory',
        data: {
            name: name.value,
            parent_id: parentId.value === '' ? null : parentId.value,
        },
    })
    if (res.code === 0) {
        ElMessage.success('添加成功')
        handleClose()
        emit('update')
    } else {
        ElMessage.error(res.msg)
    }
}

const editCategory = async () => {
    const res = await $api({
        type: 'editCategory',
        data: { id: id.value, name: name.value },
    })
    if (res.code === 0) {
        ElMessage.success('编辑成功')
        handleClose()
        emit('update')
    } else {
        ElMessage.error(res.msg)
    }
}

const handleClose = () => {
    emit('close')
    name.value = ''
    parentId.value = ''
    id.value = ''
}

const handleConfrim = async () => {
    if (id.value === '') {
        await addCategory()
    } else {
        await editCategory()
    }
}

defineExpose({
    setId,
    setName,
    setParentId,
})
</script>
<style scoped lang='scss'>
.footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>