// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart,PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    LineChart,
    PieChart
]);

// 圆柱
export function useCylinder() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);

        myChart.setOption({
            // 标题
            title: {
                text: '信息展示'
            },
            tooltip: {},
            // 行 x
            xAxis: {
                data: ['a', '6', '1', '裤子', '高跟鞋', '袜子']
            },
            // 高 y
            yAxis: {
                type: 'value',
                name: '销售数量',
                min: 0,
                max: 250,
            },
            // 没一行圆柱数据
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                },
                {
                    type: 'bar',
                    data: [23, 24, 18, 25, 27, 0]
                },
            ]
        });
    }, [])


    return [domRef]
}


// 折线图
export function useBrokenLine() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);

        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['A', 'B', 'C']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150],
                    type: 'line'
                }
            ]
        });
    }, [])


    return [domRef]
}



export function usePieChart() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);

        myChart.setOption({
            series: [
                {
                    type: 'pie',
                    data: [
                        {
                            value: 335,
                            name: '直接访问'
                        },
                        {
                            value: 234,
                            name: '联盟广告'
                        },
                        {
                            value: 1548,
                            name: '搜索引擎'
                        }
                    ]
                }
            ]
        });
    }, [])


    return [domRef]
}
