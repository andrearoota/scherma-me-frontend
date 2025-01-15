import { useEffect, useRef, type CSSProperties } from 'react';
import { registerLocale } from 'echarts';
import { BarChart, type BarSeriesOption } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  type GridComponentOption,
  type LegendComponentOption,
  type TooltipComponentOption,
} from 'echarts/components';
import {
  ComposeOption,
  ECharts,
  getInstanceByDom,
  init,
  registerTheme,
  SetOptionOpts,
  use,
} from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { themeEcharts } from '@/assets/themes/themeEcharts';
import { langIT } from '@/assets/translations/langEchartsIT';

// Register the required components
use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  SVGRenderer, // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>;

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

export function BarEchart({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      registerTheme('customTheme', themeEcharts);
      registerLocale('IT', langIT);
      chart = init(chartRef.current, 'customTheme', {
        locale: 'IT',
        renderer: 'svg',
      });
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart(): void {
      chart?.resize();
    }
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: '100%', height: '100px', ...style }} />;
}
