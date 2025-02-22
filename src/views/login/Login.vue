<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2 class="login-title">MAX的博客后台管理系统</h2>
            <p class="login-subtitle">请登录您的账户</p>
            <el-form :model="loginForm" ref="loginFormRef" :rules="rules">
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        placeholder="用户名"
                        prefix-icon="el-icon-user"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        placeholder="密码"
                        prefix-icon="el-icon-lock"
                        show-password
                        type="password"
                    />
                </el-form-item>
                <div class="login-capchat-item">
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.captcha"
                            placeholder="验证码"
                            prefix-icon="el-icon-lock"
                        />
                    </el-form-item>
                    <div
                        class="login-capchat"
                        v-html="svg"
                        @click="getCaptcha"
                    ></div>
                </div>
                <el-checkbox v-model="loginForm.checked" @change="handleChange"
                    >7天内免登录</el-checkbox
                >
                <el-form-item>
                    <el-button
                        class="login-button"
                        type="primary"
                        @click="login"
                        block
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
  
  <script setup>
import { reactive, ref, getCurrentInstance, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTabStore } from '@/store/nav'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const { $api } = getCurrentInstance().proxy
const userStore = useUserStore()
const tabStore = useTabStore()
const { addTab } = tabStore
const { handleLogin } = userStore
const router = useRouter()
const loginForm = reactive({
    username: '',
    password: '',
    captcha: '',
    checked: false,
    rember: '',
})

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

// 确保 ref 正确初始化并绑定在 el-form 上
const loginFormRef = ref(null)
const svg = ref('')

const handleChange = (val) => {
    if (val) {
        loginForm.rember = 7
    } else {
        loginForm.rember = 1
    }
}

const getCaptcha = async () => {
    const res = await $api({ type: 'getCaptcha' })
    if (res) {
        svg.value = res
    }
}

const login = () => {
    loginFormRef.value.validate((valid) => {
        if (valid) {
            const data = {
                login_id: loginForm.username,
                login_pwd: loginForm.password,
                captcha: loginForm.captcha,
                rember: loginForm.rember,
            }
            handleLogin(data)
        } else {
            ElMessage.error('请填写完整的用户名和密码')
            return false
        }
    })
}

onBeforeMount(() => {
    getCaptcha()
})
</script>
  
  <style scoped lang="scss">
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #cee3eb, #f0f6f8) !important;
}

.login-card {
    width: 400px;
    padding: 40px 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.login-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.login-subtitle {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
}

.login-capchat-item {
    display: flex;
    justify-content: space-between;
    .login-capchat {
        position: relative;
        top: -8px;
    }
}

.el-form-item {
    margin-bottom: 20px;
}

.login-button {
    background: #8dc5db;
    border: none;
    height: 40px;
    width: 100%;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.el-input__inner {
    border-radius: 8px;
    padding: 10px 15px;
}

.el-input__icon {
    color: #8f94fb;
}
</style>
  