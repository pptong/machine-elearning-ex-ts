import ex3Controller from "../controller/ex3Controller";
import { RouterItem } from "./appRouter";
export const ex3Routers: RouterItem[] = [
  {
    path: "/ex3/data1_showData",
    method: "post",
    action: ex3Controller.data1_showData,
  },
  {
    path: "/ex3/tran_getAccuracyRate",
    method: "post",
    action: ex3Controller.tran_getAccuracyRate,
  },
  {
    path: "/ex3/getAccuracyRateByWeight",
    method: "post",
    action: ex3Controller.getAccuracyRateByWeight,
  },
]
