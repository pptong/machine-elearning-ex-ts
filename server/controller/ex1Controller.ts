import { Context } from "koa";
import * as tf from "@tensorflow/tfjs";
import ReadData from "../untils/readData";
import ex1Service from "../service/ex1Service";

class ex1Controller {
  async data1_showData(ctx: Context) {
    const _ex1Service = new ex1Service();
    const data = ReadData("./data/ex1data/ex1data1.txt");
    ctx.body = data;
  }

  // 显示θ=[0,0]的时候误差值
  async data1_showCost(ctx: Context) {
    const _ex1Service = new ex1Service();
    const data = ReadData("./data/ex1data/ex1data1.txt");
    const feature = tf.tensor(data);
    const initTheta = tf.tensor([[0], [0]]);
    const cost = _ex1Service.Cost(feature, initTheta);
    ctx.body = cost;
  }

  // 显示点阵图和估值图
  async data1_showScatterAndLine(ctx: Context) {
    const _ex1Service = new ex1Service();
    const data = ReadData("./data/ex1data/ex1data1.txt");
    let feature = tf.tensor(data);
    let thInit = tf.tensor([[0], [0]]);
    let theta = _ex1Service.GradientDescent(feature, 0.01, thInit, 1000);
    ctx.body = theta;
  }

  // 显示点阵图和估值图
  async data1_showLearningCurve(ctx: Context) {
    const _ex1Service = new ex1Service();
    const data = ReadData("./data/ex1data/ex1data1.txt");
    let feature = tf.tensor(data);
    let thInit = tf.tensor([[0], [0]]);
    let curveValue = _ex1Service.LearningCurve(feature, 0.01, thInit, 1000);
    ctx.body = curveValue;
  }

  async data2_showLearningCurveByEveryAlpha(ctx: Context) {
    const _ex1Service = new ex1Service();
    const data = ReadData("./data/ex2data/ex2data1.txt");

    let alpha = [0.001, 0.003, 0.1, 0.3];
    let thInit = tf.tensor([[0], [0], [0]]);
    let feature = tf.tensor(data);
    feature = feature
      .sub(feature.mean(0, true))
      .div(tf.moments(feature, 0, true).variance.sqrt());
    let curveValue: Array<any> = [];
    for (let i = 0; i < alpha.length; i++) {
      curveValue.push(
        _ex1Service.LearningCurve(feature, alpha[i], thInit, 2000)
      );
    }

    ctx.body = curveValue;
  }
}

export default new ex1Controller();
