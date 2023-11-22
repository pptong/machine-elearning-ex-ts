<template>
  <div class="ex2">
    <div>ex1 - logical regression </div>
    <div>1.1 - data scatter <button @click="showScatter">show</button> </div>
    <div id="scatterContainer" class="chartcontainer"></div>
    <div>1.2 - θ=[0,0,0],J(θ) = {{ output.cost }} <button @click="showCost">show</button> </div>
    <div>1.3 - data scatter <button @click="showScatterAndLine">show</button> </div>
    <div id="scatterAndLineContainer" class="chartcontainer"></div>
    <div>2.1 - data scatter <button @click="showScatter2">show</button> </div>
    <div id="scatterContainer2" class="chartcontainer"></div>
    <div>2.2 - data scatter lumbda 1 <button @click="showScatterAndLineLambda1">show</button> </div>
    <div id="scatterContainerLambda1" class="chartcontainer"></div>
    <div>2.3 - data scatter lumbda 0 <button @click="showScatterAndLineLambda0">show</button> </div>
    <div id="scatterContainerLambda0" class="chartcontainer"></div>
    <div>2.3 - data scatter lumbda 100 <button @click="showScatterAndLineLambda100">show</button> </div>
    <div id="scatterContainerLambda100" class="chartcontainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import MyCharts from '@/utils/myEcharts'
import Get from '@/utils/get'


export default defineComponent({
  name: 'ex1',

  setup() {
    let output = reactive({ cost: 0 });

    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;


    const showScatter = () => {
      var myCharts = new MyCharts('scatterContainer', 20, 100, 20, 100);
      let data = Get('ex2/data1_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);

      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
    }


    const showScatter2 = () => {
      var myCharts = new MyCharts('scatterContainer2', -1.2, 1.2, -1.2, 1.2);
      let data = Get('ex2/data2_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);

      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
    }

    const showCost = () => {
      let data = Get('ex2/data1_costValue')
      output.cost = JSON.parse(data)[0]
    }


    const showScatterAndLine = () => {
      var myCharts = new MyCharts('scatterAndLineContainer', 0, 130, 0, 130);
      let data = Get('ex2/data1_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);
      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
      let thetaData  = Get('ex2/data1_gradientDescent')
      let theta  =JSON.parse(thetaData);
      myCharts.writeLine(-1 * theta[0] / theta[1], 0, 0, -1 * theta[0] / theta[2])
    }




    const showScatterAndLineLambda1 = () => {
      var myCharts = new MyCharts('scatterContainerLambda1', -1.2, 1.2, -1.2, 1.2);
      let data = Get('ex2/data2_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);
      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));

      let dataContour = Get('ex2/data2_GradientDescent_Lambda1')
      const dataContourJson: Array<Array<number>> = JSON.parse(dataContour);
      myCharts.writeScatter(dataContourJson);


    }


    const showScatterAndLineLambda0 = () => {
      var myCharts = new MyCharts('scatterContainerLambda0', -1.2, 1.2, -1.2, 1.2);
      let data = Get('ex2/data2_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);
      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));

      let dataContour = Get('ex2/data2_GradientDescent_Lambda0')
      const dataContourJson: Array<Array<number>> = JSON.parse(dataContour);
      myCharts.writeScatter(dataContourJson);


    }


    const showScatterAndLineLambda100 = () => {
      var myCharts = new MyCharts('scatterContainerLambda100', -1.2, 1.2, -1.2, 1.2);
      let data = Get('ex2/data2_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);
      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));

      let dataContour = Get('ex2/data2_GradientDescent_Lambda100')
      const dataContourJson: Array<Array<number>> = JSON.parse(dataContour);
      myCharts.writeScatter(dataContourJson);


    }
    


    return {
      showScatter, showCost, output, showScatterAndLine,showScatter2,showScatterAndLineLambda1,showScatterAndLineLambda0,showScatterAndLineLambda100
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
