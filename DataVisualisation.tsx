import React from 'react';
import wineData from './Wine-Data.json';
import './style.css';

  
const calculateMean = (data: number[]): number => {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
};

const calculateMedian = (data: number[]): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedData.length / 2);
  return sortedData.length % 2 === 0
    ? (sortedData[midIndex - 1] + sortedData[midIndex]) / 2
    : sortedData[midIndex];
};

const calculateMode = (data: number[]): number => {
  const frequencyMap = new Map<number, number>();
  let maxCount = 0;
  let mode = 0;

  for (const num of data) {
    const count = (frequencyMap.get(num) || 0) + 1;
    frequencyMap.set(num, count);

    if (count > maxCount) {
      maxCount = count;
      mode = num;
    }
  }

  return mode;
};

const calculateGamma = (row: any): number => {
    return (Number(row.Ash) * row.Hue) / (row.Magnesium);
  };
  
  const DataVisualisation: React.FC = () => {
    const classWiseFlavanoids: Record<string, number[]> = {};
    const classWiseGamma: Record<string, number[]> = {};

  for (const row of wineData) {
    const className = row.Alcohol.toString();

    if (!classWiseFlavanoids[className]) {
      classWiseFlavanoids[className] = [];
    }

    if (!classWiseGamma[className]) {
      classWiseGamma[className] = [];
    }

    classWiseFlavanoids[className].push(Number(row.Flavanoids));
    classWiseGamma[className].push(calculateGamma(row));
  }

  const calculateClassWiseStatistics = (data: Record<string, number[]>): Record<string, Record<string, number>> => {
    const statistics: Record<string, Record<string, number>> = {};

    for (const className in data) {
      const values = data[className];
      const mean = calculateMean(values);
      const median = calculateMedian(values);
      const mode = calculateMode(values);

      statistics[className] = {
        Mean: mean,
        Median: median,
        Mode: mode,
      };
    }

    return statistics;
  };

  const classWiseFlavanoidsStatistics = calculateClassWiseStatistics(classWiseFlavanoids);
  const classWiseGammaStatistics = calculateClassWiseStatistics(classWiseGamma);

  return (
    <div>
      <h2>Flavanoids</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(classWiseFlavanoidsStatistics).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean</td>
            {Object.keys(classWiseFlavanoidsStatistics).map((className) => (
              <td key={className}>
                {classWiseFlavanoidsStatistics[className].Mean.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Median</td>
            {Object.keys(classWiseFlavanoidsStatistics).map((className) => (
              <td key={className}>
                {classWiseFlavanoidsStatistics[className].Median.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Mode</td>
            {Object.keys(classWiseFlavanoidsStatistics).map((className) => (
              <td key={className}>
                {classWiseFlavanoidsStatistics[className].Mode.toFixed(3)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Gamma</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(classWiseGammaStatistics).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean</td>
            {Object.keys(classWiseGammaStatistics).map((className) => (
              <td key={className}>
                {classWiseGammaStatistics[className].Mean.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Median</td>
            {Object.keys(classWiseGammaStatistics).map((className) => (
              <td key={className}>
                {classWiseGammaStatistics[className].Median.toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Mode</td>
            {Object.keys(classWiseGammaStatistics).map((className) => (
              <td key={className}>
                {classWiseGammaStatistics[className].Mode.toFixed(3)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataVisualisation;
