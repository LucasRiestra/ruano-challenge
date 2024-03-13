import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { seriesState, loadingState, errorState } from '../recoil/recoilState';
import { SampleData } from '../interfaces/interfaces';

export const useSeries = (sampleData: SampleData, currentPage: number) => {
  const [series, setSeries] = useRecoilState(seriesState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    setLoading(true);
    try {
      const startIndex = (currentPage - 1) * 20;
      const sortedData = sampleData.entries
        .filter(item => item.programType === 'series' && item.releaseYear >= 2010)
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(startIndex, startIndex + 20);
      const timer = setTimeout(() => {
        setSeries(sortedData);
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [sampleData, currentPage]);

  return { series, loading, error, setSeries };
};