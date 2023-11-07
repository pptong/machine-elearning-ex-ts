import * as echarts from "echarts";

export default class MyEcharts {
  chartContainerId: string;
  option: any;

  constructor(
    _chartContainerId: string,
    _xMin: number = 0,
    _xMax: number = 0,
    _yMin: number = 0,
    _yMax: number = 0
  ) {
    this.chartContainerId = _chartContainerId;
    this.option = {
      xAxis: { gridIndex: 0, min: _xMin, max: _xMax },
      yAxis: { gridIndex: 0, min: _yMin, max: _yMax },
      series: [],
    };
  }

  //画点阵
  writeScatter(_data: any) {
    var chartDom = document.getElementById(this.chartContainerId);
    var myChart = echarts.init(chartDom);

    this.option.series.push({
      data: _data,
      type: "scatter",
    });
    myChart.setOption(this.option);
  }

  //画不规则曲线
  writeCustomLine(_data: Array<any>) {
    var chartDom = document.getElementById(this.chartContainerId);
    var myChart = echarts.init(chartDom);

    this.option.xAxis = {
      type: "category",
      data: _data.map((x) => x.x),
    };

    this.option.series.push({
      data: _data.map((x) => x.value),
      type: "line",
      smooth: true,
    });


    myChart.setOption(this.option);
  }

  //画直线
  writeLine(dotStartX: any, dotStartY: any, dotEndX: any, dotEndY: any) {
    const markLineOpt = {
      animation: false,
      data: [
        [
          {
            coord: [dotStartX, dotStartY],
            symbol: "none",
          },
          {
            coord: [dotEndX, dotEndY],
            symbol: "none",
          },
        ],
      ],
    };
    this.option.series[0].markLine = markLineOpt;
    const chartDom = document.getElementById(this.chartContainerId)!;
    const myChart = echarts.init(chartDom);
    myChart.setOption(this.option);
  }
}
