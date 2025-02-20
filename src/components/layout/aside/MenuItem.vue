<template>
    <template v-for="(item, idx) in props.menuList" :key="idx">
        <el-sub-menu :index="item.index" v-if="item.children">
            <template #title>
                <el-icon :size="16">
                    <component :is="iconComponents[item.icon]" />
                </el-icon>
                <span>{{ item.label }}</span>
            </template>
            <MenuItem
                :isCollapse="props.isCollapse"
                :menuList="item?.children"
            />
        </el-sub-menu>

        <el-menu-item v-else :index="item.route">
            <el-icon :size="16">
                <component :is="iconComponents[item.icon]" />
            </el-icon>
            <template #title>
                <span>{{ item.label }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup name="MenuItem">
import { ref, onMounted, defineProps } from 'vue'
import {
    HomeFilled,
    Plus,
    House,
    UserFilled,
    Setting,
    Clock,
    Files,
    User,
    Monitor,
    Avatar,
    BellFilled,
    Wallet,
    Coin,
    Postcard,
    ScaleToOriginal,
    Tickets,
    Key,
    ChatSquare,
    VideoPlay,
    Edit,
    FolderOpened,
    Money,
    Odometer,
    Service,
    CreditCard,
    Share,
    SetUp,
    Operation,
} from '@element-plus/icons-vue'
const props = defineProps({
    menuList: {
        type: Array,
        default: () => [],
    },
    isCollapse: {
        type: Boolean,
        default: false,
    },
})

const iconComponents = {
    HomeFilled,
    Plus,
    House,
    UserFilled,
    Setting,
    Clock,
    Files,
    User,
    Monitor,
    Avatar,
    BellFilled,
    Wallet,
    Coin,
    Postcard,
    ScaleToOriginal,
    Tickets,
    Key,
    ChatSquare,
    VideoPlay,
    Edit,
    FolderOpened,
    Money,
    Odometer,
    Service,
    CreditCard,
    Share,
    SetUp,
    Operation,
}

onMounted(() => {
    console.log(props.menuList)
})
</script>
<style scoped lang='scss'>
</style>