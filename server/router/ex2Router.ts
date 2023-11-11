import ex2Controller from "../controller/ex2Controller";
import { RouterItem } from "./appRouter";
export const ex2Routers: RouterItem[] = [
  {
    path: "/ex2/data1_showData",
    method: "get",
    action: ex2Controller.data1_showData,
  },
  {
    path: "/ex2/data2_showData",
    method: "get",
    action: ex2Controller.data2_showData,
  },
  {
    path: "/ex2/data1_costValue",
    method: "get",
    action: ex2Controller.data1_costValue,
  },
  {
    path: "/ex2/data1_gradientDescent",
    method: "get",
    action: ex2Controller.data1_GradientDescent,
  },

  {
    path: "/ex2/data2_GradientDescent_Lambda1",
    method: "get",
    action: ex2Controller.data2_GradientDescent_Lambda1,
  },
  
];
