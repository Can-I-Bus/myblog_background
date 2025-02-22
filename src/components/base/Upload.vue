<!-- 上传组件： 支持拖入文件上传，支持点击选择文件，支持图片预览 -->
 <template>
    <div
        v-if="!img"
        class="upload_wrap"
        @drop.prevent.stop="handleDrop"
        @dragover.prevent.stop="handleDragOver"
        @dragleave.prevent.stop="handleDragLeave"
        @click="handleClick"
    >
        <input
            ref="fileInput"
            type="file"
            style="display: none"
            accept=".jpg,.jpeg,.png,.gif"
            @change="handleChange"
        />
        <p>+</p>
    </div>
    <div class="prewiew_wrap" v-else>
        <el-icon @click="img = null" class="close_icon"><CloseBold /></el-icon>
        <img :src="img" alt="预览" />
    </div>
</template>
<script setup>
import config from '@/config/base.config.js'
import {
    ref,
    onMounted,
    defineProps,
    defineEmits,
    defineExpose,
    computed,
} from 'vue'
const emits = defineEmits(['fileHandler'])
const props = defineProps({})
const fileInput = ref(null)
const img = ref(null)

const fileHandler = (file) => {
    img.value = URL.createObjectURL(file)
    emits('fileHandler', file)
}

const handleChange = (e) => {
    fileHandler(e.target.files[0])
}

const handleDrop = (e) => {
    fileHandler(e.dataTransfer.files[0])
}

const handleDragOver = (e) => {
    e.target.classList.add('over')
}

const handleDragLeave = (e) => {
    e.target.classList.remove('over')
}

const handleClick = () => {
    fileInput.value.click()
}

const setUrl = (url) => {
    if (url !== null && url !== undefined && url !== '') {
        img.value = config.BASE_URL + url
    } else {
        img.value = null
    }
}

defineExpose({
    setUrl,
})
</script>
<style scoped lang='scss'>
.upload_wrap {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
    &:hover {
        border-color: #409eff;
    }
}

.prewiew_wrap {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    .close_icon {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 18px;
        color: #444445;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.over {
    border-color: #409eff;
}
</style>