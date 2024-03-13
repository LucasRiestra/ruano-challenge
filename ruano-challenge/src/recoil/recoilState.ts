import { atom } from 'recoil';
import { Entry } from '../interfaces/interfaces';

export const seriesState = atom({
  key: 'seriesState',
  default: [] as Entry[],
});

export const loadingState = atom({
  key: 'loadingState',
  default: true,
});

export const errorState = atom({
  key: 'errorState',
  default: false,
});

export const popupVisibleState = atom({
  key: 'popupVisibleState',
  default: false,
});

export const selectedSeriesState = atom({
  key: 'selectedSeriesState',
  default: null as Entry | null,
});

export const selectedMovieState = atom({
    key: 'selectedMoviesState',
    default: null as Entry | null,
  });

  export const movieState = atom({
    key: 'movieState',
    default: [] as Entry[],
  });