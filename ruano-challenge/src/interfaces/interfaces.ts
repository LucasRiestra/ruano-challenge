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