import { usePieChart } from "../../hooks/useHandleEcharts"

export default function PieChart() {
    let [domRef] = usePieChart()
    return (
        <div className='cylinder' ref={domRef}>
            饼图
        </div>
    )
}
