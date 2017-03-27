<template>
  <div id="app">
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">Tulip Memtracking</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">Memory Usage</el-menu-item>
        <el-menu-item index="2-2">Further Options</el-menu-item>
        <el-menu-item index="2-3">Analysis</el-menu-item>
      </el-submenu>
    </el-menu>
  <el-row :gutter="24" class="main-row">
    <el-col :span="10" :offset="1" class="main-bar">
      <barChart></barChart>
    </el-col>
    <el-col :span="10" :offset="1" class="main-line">
      <lineChart></lineChart>
    </el-col>
  </el-row>
 </div>

</template>

<script>
// import Hello from './components/Hello'
import barChart from './components/barChart'
import lineChart from './components/lineChart'
import { Row, Col, Menu, Item } from 'element-ui'

export default {
  name: 'app',
  components: {
    // Hello,
    Row,
    Col,
    Menu,
    Item,
    barChart,
    lineChart
  }
}
</script>

<style>
.main-row{
  display: block;
  padding-top: 15px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html, body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

</style>
