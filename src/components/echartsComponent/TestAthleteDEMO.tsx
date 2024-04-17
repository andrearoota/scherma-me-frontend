import { useRef, useEffect, type CSSProperties } from 'react'
import { SVGRenderer } from 'echarts/renderers'
import { init, getInstanceByDom, use, registerTheme } from 'echarts/core'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  type TitleComponentOption,
  ToolboxComponent,
  type ToolboxComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  LegendComponent,
  type LegendComponentOption
  , GridComponent,
  type GridComponentOption,
  MarkLineComponent,
  type MarkLineComponentOption
} from 'echarts/components'
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core'
import { themeEcharts } from '../../assets/themeEcharts'

// Register the required components
use([
  GridComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  MarkLineComponent,
  SVGRenderer // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
])

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
| TitleComponentOption
| ToolboxComponentOption
| TooltipComponentOption
| GridComponentOption
| LegendComponentOption
| LineSeriesOption
| MarkLineComponentOption
>

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

export function LineEchart ({
  option,
  style,
  settings,
  loading,
  theme
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null) {
      registerTheme('macarons', themeEcharts)
      chart = init(chartRef.current, 'macarons')
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart (): void {
      chart?.resize()
    }
    window.addEventListener('resize', resizeChart)

    // Return cleanup function
    return () => {
      chart?.dispose()
      window.removeEventListener('resize', resizeChart)
    }
  }, [theme])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.setOption(option, settings)
    }
  }, [option, settings, theme]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading()
    }
  }, [loading, theme])

  return <div ref={chartRef} style={{ width: '100%', height: '100px', ...style }} />
}
