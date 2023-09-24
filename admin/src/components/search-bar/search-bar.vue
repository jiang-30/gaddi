<template>
  <div class="app-search-bar" @click="onClickMask">
    <section class="app-search-bar-wrapper" @click.stop>
      <header class="app-search-bar-input">
        <el-input ref="inputRef" style="height: 100%;" v-model="keyword" placeholder="请输入搜索内容" clearable
          @input="onInputChange"></el-input>
      </header>
      <main class="app-search-bar-result">
        <el-scrollbar max-height="400px">
          <div v-if="menuList.length" class="app-search-bar-list">
            <div class="app-search-bar-item" v-for="item in menuList" :key="item.name" @click="onNav(item)">
              <span>{{ item.title }}</span>
              <el-icon>
                <Right />
              </el-icon>
            </div>
          </div>
          <el-empty v-else>
            <template #description></template>
          </el-empty>
        </el-scrollbar>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElInput, ElEmpty, ElScrollbar, ElIcon, type InputInstance } from 'element-plus'
import { Right } from '@element-plus/icons-vue'
import { useMenuStore } from '@/store';
import type { IMenu } from '@/typings';

const emit = defineEmits(['close'])
const inputRef = ref<InputInstance>()
const menuStore = useMenuStore()
const keyword = ref('')
const menuList = ref<IMenu[]>([]);

onMounted(() => {
  inputRef.value?.focus()
})

const searchHandler = () => {
  if (keyword.value) {
    menuList.value = menuStore.enabledMenus.filter(item => item.type == 'page' && item.title && item.title.includes(keyword.value))
  } else {
    menuList.value = []
  }
}

const closeHandler = () => {
  emit('close')
}

const onClickMask = () => {
  closeHandler()
}

const onInputChange = (value: string) => {
  searchHandler()
}

const onNav = (menu: IMenu) => {
  menuStore.navTo(menu.name);
  closeHandler()
}
</script>

<style scoped>
.app-search-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.2);
}

.app-search-bar-wrapper {
  background: #f40;
  width: 550px;
  margin-top: 20vh;
  background-color: #f1f1f1;
  border-radius: 10px;
  animation: appSearchBarIn 0.2s;
}

.app-search-bar-input {
  height: 50px;
  margin: 10px 10px 0 10px;
  font-size: 18px;
  --el-font-size-base: 18px;
}

.app-search-bar-list {
  padding: 15px;
}

.app-search-bar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  margin: 8px 0;
  padding: 0 10px;
  border: 1px solid #fff;
}

.app-search-bar-item:hover {
  cursor: pointer;
  border-color: var(--el-color-primary);
}

@keyframes appSearchBarIn {
  from {
    transform: scale(0)
  }

  to {
    transform: scale(1)
  }
}
</style>
