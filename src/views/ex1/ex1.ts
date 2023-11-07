import * as tf from "@tensorflow/tfjs";

//代价函数
//j(θ0,θ1)=(1/2m)*[Σ(i=0 to m)(h(i)-yi)^2]
export function J(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
  // 特征函数第一列补1
  const one = tf.ones([feature.shape[0], 1]);
  const X = tf.concat([one, feature], 1);

  // 参数θ 最后补-1
  const ones = tf.fill([1, 1], -1);
  const onesTheta = theta.concat(ones);
  const sumData = X.matMul(onesTheta).pow(2).sum();
  return sumData.div(2).div(feature.shape[0]).dataSync();
}

// θj梯度函数
export function T(
  thetaJ: number,
  feature: tf.Tensor<tf.Rank>,
  theta: tf.Tensor<tf.Rank>,
  alpha: number
) {

  //特征矩阵补1
  const one = tf.ones([feature.shape[0], 1]);
  const featureData = tf.concat([one, feature], 1);
  //get Θj
  const cTheta = tf.split(theta, theta.shape[0], 0)[thetaJ];
  //θ:=[[Θ0],[Θ1],[Θ2],...,[-1]]
  const ones = tf.fill([1, 1], -1);
  const onesTheta = theta.concat(ones);
  //Xi
  const xi = tf.split(featureData, featureData.shape[1] || 1, 1)[thetaJ];
  // sumValue = Σ ( X * θ * xi )
  const sumValue = featureData.matMul(onesTheta).mul(xi).sum();
  // return = Θj - ( sumValue * α / m )
  const data = cTheta.sub(sumValue.mul(alpha).div(featureData.shape[0]));

  return data;
}

// h(x) = sum ( X * θ )
export function H(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
  const ones = tf.ones([feature.shape[0], 1]);
  const data = tf.concat([ones, feature], 1);
  const hData = data.matMul(theta).sum();
  return hData.dataSync();
}

//学习速率曲线
export function learningCurve(
  feature: tf.Tensor<tf.Rank>,
  alpha: number,
  theta:tf.Tensor<tf.Rank>,
  iterations: number
) {

  const elearningData: Array<any> = [];
  let i = 0;
  for (let i = 0; i < iterations; i++) {
    var newTheta = [];
    for (let j = 0; j < theta.shape[0]; j++) {
      newTheta.push(T(j, feature, theta, alpha));
    }
    elearningData.push({ x: i, value: J(feature, theta) });
    theta = tf.concat(newTheta, 0);
  }
  return elearningData;
}

//梯度算法
export function computeCost(
  feature: tf.Tensor<tf.Rank>,
  alpha: number,
  theta:tf.Tensor<tf.Rank>,
  iterations: number
) {

  let i = 0;
  for (let i = 0; i < iterations; i++) {
    var newTheta = [];
    for (let j = 0; j < theta.shape[0]; j++) {
      newTheta.push(T(j, feature, theta, alpha));
    }
    theta = tf.concat(newTheta, 0);
  }

  return theta;
}
