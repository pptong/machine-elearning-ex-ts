import * as tf from "@tensorflow/tfjs";
export default class ex2Service {
  // 代价函数
  // theta 为向量 ( m*1 ) , feature 为矩阵 (m * n) , y 为向量
  // 最终返回当前θ下的损益
  async Cost(
    feature: tf.Tensor<tf.Rank>,
    theta: tf.Tensor<tf.Rank>,
    y: tf.Tensor<tf.Rank>
  ) {
    const yi = y.transpose();
    const h = await this.Hypothesis(feature, theta);
    const e = tf.fill([1, h.shape[1] || 1], Math.E);
    const ones = tf.ones([1, h.shape[1] || 1]);
    const a1 = yi.mul(-1).mul(h.log()); //-yi*log(h(xi))
    const a2 = ones.sub(yi).mul(ones.sub(h).log()); //(1-yi)*log(1-h(xi))
    return a1.sub(a2).sum().div(feature.shape[0]).dataSync();
  }

  // 梯度函数dataSync
  // theta为向量 ( m*1 )  feature 为矩阵 (m * n) , y 为向量
  async Gradient(
    feature: tf.Tensor<tf.Rank>,
    theta: tf.Tensor<tf.Rank>,
    y: tf.Tensor<tf.Rank>,
    alpha: number
  ) {
    const h = await this.Hypothesis(feature, theta);
    const ones = tf.ones([feature.shape[0], 1]);
    const featureData = tf.concat([ones, feature], 1);
    const sumValue = h
      .transpose()
      .sub(y)
      .mul(featureData)
      .sum(0, true)
      .transpose();

    const descent = sumValue.mul(alpha).div(feature.shape[0]);
    const data = theta.sub(descent);

    return data;
  }

  async Sigmoid(pow: tf.Tensor<tf.Rank>) {
    const e = tf.fill([1, pow.shape[1] || 1], Math.E);
    const ones = tf.ones([1, pow.shape[1] || 1]);
    return ones.div(ones.add(e.pow(pow.mul(-1))));
  }

  // feature 为向量 ( n*1 ) , feature 为矩阵 ((m-1) * n)
  // 最终返回不同特征下的值形式为 (1 * m)
  // 具体计算公式为 1/(1-e^(θTX))
  async Hypothesis(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
    const ones = tf.ones([feature.shape[0], 1]);
    const data = tf.concat([ones, feature], 1);
    const powForE = theta.transpose().matMul(data.transpose());
    return this.Sigmoid(powForE);
  }

  //梯度算法
  async GradientDescent(
    feature: tf.Tensor<tf.Rank>,
    alpha: number,
    theta: tf.Tensor<tf.Rank>,
    yi: tf.Tensor<tf.Rank>,
    iterations: number
  ) {
    let i = 0;
    let rTheta = tf.zeros([3, 1]);
    for (let i = 0; i < iterations; i++) {
      rTheta = await this.Gradient(feature, rTheta, yi, alpha);
    }
    return rTheta;
  }
}
