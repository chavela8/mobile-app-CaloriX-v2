import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

interface ChartProps {
  data: any;
  type: 'line' | 'bar';
}

const ResponsiveChart: React.FC<ChartProps> = ({ data, type }) => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: dimensions.width < 375 ? 10 : 12,
    },
  };

  const chartWidth = dimensions.width - 32;
  const chartHeight = Math.min(dimensions.height * 0.3, 220);

  const ChartComponent = type === 'line' ? LineChart : BarChart;

  return (
    <View style={styles.container}>
      <ChartComponent
        data={data}
        width={chartWidth}
        height={chartHeight}
        chartConfig={chartConfig}
        bezier={type === 'line'}
        style={styles.chart}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withInnerLines={true}
        yAxisInterval={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default ResponsiveChart;