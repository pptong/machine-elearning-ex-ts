import ex2Controller from "../controller/ex2Controller";
import { RouterItem } from "./appRouter";
export const ex2Routers: RouterItem[] = [
  {
    path: "/ex2/data1_showData",
    method: "post",
    action: ex2Controller.data1_showData,
  },
  {
    path: "/ex2/data2_showData",
    method: "post",
    action: ex2Controller.data2_showData,
  },
  {
    path: "/ex2/data1_costValue",
    method: "post",
    action: ex2Controller.data1_costValue,
  },
  {
    path: "/ex2/data1_gradientDescent",
    method: "post",
    action: ex2Controller.data1_GradientDescent,
  },

  {
    path: "/ex2/data2_GradientDescent_Lambda1",
    method: "post",
    action: ex2Controller.data2_GradientDescent_Lambda1,
  },
  {
    path: "/ex2/data2_GradientDescent_Lambda0",
    method: "post",
    action: ex2Controller.data2_GradientDescent_Lambda0,
  },
  {
    path: "/ex2/data2_GradientDescent_Lambda100",
    method: "post",
    action: ex2Controller.data2_GradientDescent_Lambda100,
  },
];
