import { useRef, useEffect, type CSSProperties } from 'react'
import { SVGRenderer } from 'echarts/renderers'
import { init, getInstanceByDom, use, registerTheme } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  type TooltipComponentOption,
  LegendComponent,
  type LegendComponentOption
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import { themeEcharts } from '../../assets/themeEcharts'

// Register the required components
use([
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  PieChart,
  SVGRenderer // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
])

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

export interface ReactEChartsProps {
  option: EChartsOption
  style?: CSSProperties
  settings?: SetOptionOpts
  loading?: boolean
  theme?: 'light' | 'dark'
}

export function PieEchart ({
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
