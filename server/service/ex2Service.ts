import * as tf from "@tensorflow/tfjs-node";
export default class ex2Service {
  // 代价函数
  // theta 为向量 ( m*1 ) , feature 为矩阵 (m * n) , y 为向量
  // 最终返回当前θ下的损益
  async Cost(
    feature: tf.Tensor<tf.Rank>,
    theta: tf.Tensor<tf.Rank>,
    y: tf.Tensor<tf.Rank>,
    lambda: number = 0
  ) {
    const yi = y.transpose();
    const h = await this.Hypothesis(feature, theta);
    const e = tf.fill([1, h.shape[1] || 1], Math.E);
    const ones = tf.ones([1, h.shape[1] || 1]);
    const a1 = yi.mul(-1).mul(h.log()); //-yi*log(h(xi))
    const a2 = ones.sub(yi).mul(ones.sub(h).log()); //(1-yi)*log(1-h(xi))
    let sumData = a1.sub(a2).sum();
    const data = sumData.div(feature.shape[0]).dataSync();


    return data
  }

  // 梯度函数dataSync
  // theta为向量 ( m*1 )  feature 为矩阵 (m * n) , y 为向量
  async Gradient(
    feature: tf.Tensor<tf.Rank>,
    theta: tf.Tensor<tf.Rank>,
    y: tf.Tensor<tf.Rank>,
    alpha: number,
    lambda: number = 0
  ) {


    const h = await this.Hypothesis(feature, theta);
    const ones = tf.ones([feature.shape[0], 1]);
    const featureData = tf.concat([ones, feature], 1);


    let sumData = h
      .transpose()
      .sub(y)
      .mul(featureData)

    let descent = sumData.sum(0, true)
      .transpose().div(feature.shape[0])

    if (lambda > 0) {
      const thetaProcess = theta.mul(tf.zeros([1, 1]).concat(tf.ones([theta.shape[0] - 1, 1])));
      const data_Regularization = thetaProcess.mul(lambda / feature.shape[0])
      descent = descent.add(data_Regularization);


    }

    const data = theta.sub(descent.mul(alpha));



    return data;
  }

  async Sigmoid(pow: tf.Tensor<tf.Rank>) {
    const e = tf.fill([1, pow.shape[1] || 1], Math.E);
    const ones = tf.ones([1, pow.shape[1] || 1]);
    const data = ones.div(ones.add(e.pow(pow.mul(-1))));
    return data
  }

  // feature 为向量 ( n*1 ) , feature 为矩阵 ((m-1) * n)
  // 最终返回不同特征下的值形式为 (1 * m)
  // 具体计算公式为 1/(1-e^(θTX))
  async Hypothesis(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
    return await this.Sigmoid(await this.Polynomial(feature, theta));
  }


  async Polynomial(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
    const ones = tf.ones([feature.shape[0], 1]);
    const data = tf.concat([ones, feature], 1);
    const powForE = theta.transpose().matMul(data.transpose());
    return powForE;
  }


  //梯度算法
  async GradientDescent(
    feature: tf.Tensor<tf.Rank>,
    alpha: number,
    theta: tf.Tensor<tf.Rank>,
    yi: tf.Tensor<tf.Rank>,
    iterations: number,
    lambda: number = 0
  ) {
    let rTheta = theta;
    for (let i = 0; i < iterations; i++) {
      //console.log(i)
      rTheta = await this.Gradient(feature, rTheta, yi, alpha, lambda);
    }
    return rTheta;
  }

  //
  async MapFeature(feature: Array<Array<number>>) {
    let data: Array<Array<number>> = [];
    for (let i = 0; i < feature.length; i++) {
      let e: Array<number> = [];
      for (let pow = 1; pow <= 6; pow++) {
        for (let j = 0; j <= pow; j++) {
          e.push(Math.pow(feature[i][0], j) * Math.pow(feature[i][1], pow - j));
        }
      }
      data.push(e);
    }
    return data;
  }
}
