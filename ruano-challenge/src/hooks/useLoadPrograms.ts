import { useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import sampleData from '../data/sample.json';
import { movieState, seriesState, loadingState } from '../recoil/recoilState';
import { Entry } from '../interfaces/interfaces';

export const useLoadPrograms = (programType: 'movie' | 'series') => {
  const setPrograms = useSetRecoilState(programType === 'movie' ? movieState : seriesState);
  const setLoading = useSetRecoilState(loadingState);

  const checkImage = (url: string) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });

  const loadPrograms = useCallback(async () => {
    setLoading(true);
    const sortedEntries = sampleData.entries
      .filter((item: Entry) => item.programType === programType && item.releaseYear >= 2010)
      .sort((a: Entry, b: Entry) => a.title.localeCompare(b.title));

    const data: Entry[] = [];
    for (const item of sortedEntries) {
      const imageExists = await checkImage(item.images['Poster Art'].url);
      if (imageExists) {
        data.push(item);
      }
    }
    setPrograms(data);
    setLoading(false);
  }, [setPrograms, setLoading, programType]);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  return loadPrograms;
};