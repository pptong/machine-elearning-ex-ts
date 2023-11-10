<template>
  <div class="ex1">
    <div>ex1 - linear regression </div>
    <div>2.1 - data scatter <button @click="showScatter">show</button> </div>
    <div id="scatterContainer" class="chartcontainer"></div>
    <div>2.2 - J(θ0=0,θ1=0) = {{ output.rang }} <button @click="showRange">show</button> </div>
    <div>2.3 - data scatter <button @click="showScatterAndLine">show</button> </div>
    <div id="scatterAndLineContainer" class="chartcontainer"></div>
    <div>2.4 - learning Curve (α=0.01) <button @click="showLearningCurve">show</button> </div>
    <div id="learningCurveContainer" class="chartcontainer"></div>
    <div>3.1 - learning Curve (α=0.001, 0.003, 0.1, 0.3) <button @click="showLearningCurveByEveryAlpha">show</button>
    </div>
    <div id="learningCurveByEveryAlphaContainer" class="chartcontainer"></div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import * as tf from "@tensorflow/tfjs";
import Get from '@/utils/get'
import MyCharts from '@/utils/myEcharts'


export default defineComponent({
  name: 'ex1',

  setup() {
    let output = reactive({ rang: 0 });
    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;

    // 显示θ=[0,0]的时候误差值
    const showRange = () => {
      let data = Get('ex1/data1_showCost')
      output.rang = Number(data);
    }

    // 显示数据点阵图
    const showScatter = () => {
      let data = Get('ex1/data1_showData')
      var myCharts = new MyCharts('scatterContainer', 0, 30, -6, 30);
      myCharts.writeScatter(data);
    }

    // 显示点阵图和估值图
    const showScatterAndLine = () => {
      let data = Get('ex1/data1_showScatterAndLine')
      var myCharts = new MyCharts('showScatterAndLineContainer', 0, 30, -6, 30);
      myCharts.writeLine(0, data[0], 26, Number(data[0]) + 26 * Number(data[0]))
    }


    // 显示点阵图和估值图
    const showLearningCurve = () => {
      let data = Get('ex1/data1_showLearningCurve')
      var myCharts = new MyCharts('learningCurveContainer', 0, 30, 4, 7);
      const curveData = JSON.parse(data)
      myCharts.writeCustomLine(curveData);
    }


    const showLearningCurveByEveryAlpha = () => {
      let data = Get('ex1/data2_showLearningCurveByEveryAlpha')
      var myCharts = new MyCharts('learningCurveByEveryAlphaContainer', 0, 2000, 0, 0.5);
      const curveData = JSON.parse(data)
      for (let i = 0; i < curveData.length; i++) {
        myCharts.writeCustomLine(curveData[i]);
      }
    }



    return {
      output, showRange, showScatter, showScatterAndLine, showLearningCurve, showLearningCurveByEveryAlpha
    }

  }
})


</script>


<style lang="scss" scoped>
.chartcontainer {
  width: 800px;
  height: 600px;
}
</style>
@/utils/open@/utils/readData