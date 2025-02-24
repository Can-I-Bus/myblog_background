<template>
    <div ref="editorContainer"></div>
</template>
  
<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import config from '@/config/base.config'
const { $api } = getCurrentInstance().proxy
const editorContainer = ref(null)
let editorInstance = null

const getHTML = () => {
    return editorInstance.getHTML()
}

const getMarkdown = () => {
    return editorInstance.getMarkdown()
}

const setHTML = (html) => {
    return editorInstance.setHTML(html)
}

const reset = () => {
    editorInstance.setHTML('')
    editorInstance.setMarkdown('')
}

defineExpose({
    getHTML,
    getMarkdown,
    setHTML,
    reset,
})

onMounted(() => {
    editorInstance = new Editor({
        el: editorContainer.value,
        height: '700px',
        language: 'zhCN',
        placeholder: '请输入内容...',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        previewHighlight: true,
        hooks: {
            addImageBlobHook: function (file, successCallback, errorCallback) {
                // 将文件数据上传至服务器
                const formData = new FormData()
                formData.append('file', file)

                $api({ type: 'upload', data: formData })
                    .then((res) => {
                        successCallback(config.BASE_URL + res.data) // 成功回调函数
                    })
                    .catch((err) => {
                        errorCallback('Failed uploading image') // 错误回调函数
                    })
            },
        },
    })
})
</script>

<style>
.toastui-editor-contents img {
    width: 300px;
    height: auto;
    resize: both;
    overflow: auto;
    display: inline-block;
}
</style>
  