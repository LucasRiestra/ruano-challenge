import { ReactElement } from "react";

export interface PosterArt {
    url: string;
    width: number;
    height: number;
  }

  export interface Entry {
    title: string;
    description: string;
    programType: string;
    images: {
      'Poster Art': PosterArt;
    };
    releaseYear: number;
  }

  export interface CardData {
    id: number;
    text: string;
    image: string;
    subtitle: string;
    location: string;
  }

  export interface SampleData {
    entries: Entry[];
  }

  export interface FilterProps {
    items: Entry[];
    setItems: React.Dispatch<React.SetStateAction<Entry[]>>;
  }

  export interface PaginationProps {
    children: (props: { currentPage: number; nextPage: () => void; prevPage: () => void; }) => ReactElement;
  }