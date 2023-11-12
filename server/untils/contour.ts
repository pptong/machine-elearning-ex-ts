// 获取等高点
export default function Contour(
    data: Array<number>,
    lower: number,
    upper: number,
    x1Start: number,
    x1End: number,
    x2Start: number,
    x2End: number,
    step: number
): Array<Array<number>> {
    var rData: Array<Array<number>> = []
    let i = 0;
    for (let x1 = x1Start; x1 <= x1End; x1 += step) {
        for (let x2 = x2Start; x2 <= x2End; x2 += step) {
            if (data[i] >= lower && data[i] <= upper) rData.push([x1, x2])
            i++
        }
    }
    return rData;
}