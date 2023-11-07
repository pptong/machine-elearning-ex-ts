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
import { J, H, T, computeCost, learningCurve } from './ex1'
import * as tf from "@tensorflow/tfjs";
import { ReadData } from '@/utils/readData'
import MyCharts from '@/utils/myEcharts'

export default defineComponent({
  name: 'ex1',

  setup() {
    let output = reactive({ rang: 0 });
    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;

    // 显示θ=[0,0]的时候误差值
    const showRange = () => {
      const feature = tf.tensor(data1);
      const initTheta = tf.tensor([[0], [0]]);
      const rang = J(feature, initTheta);
      output.rang = rang[0];
    }

    // 显示数据点阵图
    const showScatter = () => {
      var myCharts = new MyCharts('scatterContainer', 0, 30, -6, 30);
      myCharts.writeScatter(data1);
    }

    // 显示点阵图和估值图
    const showScatterAndLine = () => {
      var myCharts = new MyCharts('scatterAndLineContainer', 0, 30, -6, 30);
      let feature = tf.tensor(data1);
      let thInit = tf.tensor([[0], [0]]);
      let theta = computeCost(feature, 0.01, thInit, 1000);
      myCharts.writeScatter(data1);
      myCharts.writeLine(0, H(tf.tensor([[0]]), theta), 26, H(tf.tensor([[26]]), theta))
    }


    // 显示点阵图和估值图
    const showLearningCurve = () => {
      var myCharts = new MyCharts('learningCurveContainer', 0, 30, 4, 7);
      let feature = tf.tensor(data1);
      let thInit = tf.tensor([[0], [0]]);
      let curveValue = learningCurve(feature, 0.01, thInit, 1000);
      myCharts.writeCustomLine(curveValue);
    }


    const showLearningCurveByEveryAlpha = async () => {
      var myCharts = new MyCharts('learningCurveByEveryAlphaContainer', 0, 2000, 0, 0.5);
      let alpha = [0.001, 0.003, 0.1, 0.3]
      let thInit = tf.tensor([[0], [0], [0]]);
      let feature = tf.tensor(data2);
      feature = feature.sub(feature.mean(0, true)).div(tf.moments(feature, 0, true).variance.sqrt());
      for (let i = 0; i < alpha.length; i++) {
        let curveValue = learningCurve(feature, alpha[i], thInit, 2000);
        myCharts.writeCustomLine(curveValue);
      }

    }

    onMounted(() => {
      data1 = ReadData('ex1data/ex1data1.txt');
      data2 = ReadData('ex1data/ex1data2.txt');
    });

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