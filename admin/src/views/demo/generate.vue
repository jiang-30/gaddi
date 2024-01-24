<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  parentId: Demo
  title: Generate
  icon: mdi:table-border
  layout: admin
  isShowMenu: true
  isTab: true
  isAuth: false
  sort: 0
</route>

<template>
  <PageContainer>
    <section>
      <el-button @click="onTables">onTables</el-button>
      <el-button @click="onColumns">onColumns</el-button>
      <el-button @click="onPreview">onPreview</el-button>
      <el-button @click="onFiles">onFiles</el-button>
    </section>
    <section class="p-4">
      {{ tables }}
    </section>
    <section class="p-4">
      {{ columns }}
    </section>
    <section class="p-4">
      {{ config }}
    </section>

    <el-steps finish-status="success">
      <el-step title="构建依赖"></el-step>
      <el-step title="字段配置"></el-step>
      <el-step title="其他信息配置"></el-step>
      <el-step title="预览"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <section class="p-4">
      <el-tabs>
        <el-tab-pane label="数据库">
          <el-form label-width="80px">
            <el-form-item label="地址">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="端口">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="数据库">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="用户">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="表">
              <el-select>
                <el-option
                  v-for="item in tables"
                  :key="item.tableName"
                  :value="item.tableName"
                  :label="item.tableComment"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="JSON">
          <el-input type="textarea"></el-input>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" block>确定</el-button>
    </section>

    <section class="p-4">
      <el-tabs>
        <el-tab-pane label="字段信息">
          <el-form>
            <el-row v-for="(item, index) in columns" :key="index">
              <el-col :span="3">
                <el-form-item label="名称">
                  <el-input :value="item.comment"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="字段名">
                  <el-input :value="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="类型">
                  <el-input :value="item.type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="长度">
                  <el-input :value="item.length"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="必填">
                  <el-input :value="item.isNull"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="主键">
                  <el-input :value="item.isKey"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="默认值">
                  <el-input :value="item.default"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="字典">
                  <el-input :value="item.dictProp"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="基础信息">
          <el-form>
            <el-form-item label="项目地址">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目地址">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tables = ref<any>([])
const columns = ref<any>([])
const config = ref<any>({})

const onTables = () => {
  axios.post('/generate/tables', {}).then(res => {
    tables.value = res.data
  })
}

const onColumns = () => {
  axios
    .post('/generate/columns', {
      table: 'qjsjhfl',
    })
    .then(res => {
      columns.value = res.data
    })
}

const onPreview = () => {
  axios
    .post('/generate/preview', {
      table: 'qjsjhfl',
    })
    .then(res => {
      config.value = res.data
    })
}

const onFiles = () => {
  axios
    .post('/generate/files', {
      table: 'qjsjhfl',
    })
    .then(res => {
      ElMessage.success('生成成功')
    })
}
</script>
