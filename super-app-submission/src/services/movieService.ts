import axios from 'axios';

const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Genre: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Actors: string;
  Poster: string;
  Released: string;
  Director: string;
  Language: string;
}

const FALLBACK_MOVIES: Record<string, Movie[]> = {
  Action: [
    { imdbID: 'tt0448115', Title: 'Black Adam', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg', Type: 'movie' },
    { imdbID: 'tt9032400', Title: 'Eternals', Year: '2021', Poster: 'https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNbbe2EVzuDmns2.jpg', Type: 'movie' },
    { imdbID: 'tt1745960', Title: 'Top Gun: Maverick', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDabo8diEjYR47b.jpg', Type: 'movie' },
    { imdbID: 'tt6723592', Title: 'Tenet', Year: '2020', Poster: 'https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijZTr8.jpg', Type: 'movie' },
  ],
  Drama: [
    { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', Type: 'movie' },
    { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeMLinKjFZd.jpg', Type: 'movie' },
    { imdbID: 'tt0993846', Title: 'The Wolf of Wall Street', Year: '2013', Poster: 'https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg', Type: 'movie' },
    { imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', Type: 'movie' },
  ],
  Romance: [
    { imdbID: 'tt3783958', Title: 'La La Land', Year: '2016', Poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', Type: 'movie' },
    { imdbID: 'tt0071562', Title: 'Titanic', Year: '1997', Poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', Type: 'movie' },
    { imdbID: 'tt0109830', Title: 'Forrest Gump', Year: '1994', Poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', Type: 'movie' },
    { imdbID: 'tt0388795', Title: 'The Notebook', Year: '2004', Poster: 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg', Type: 'movie' },
  ],
  Thriller: [
    { imdbID: 'tt10293406', Title: 'Oxygen', Year: '2021', Poster: 'https://image.tmdb.org/t/p/w500/ouB7hwclG7PtWMeiqIfqJRlh4bT.jpg', Type: 'movie' },
    { imdbID: 'tt15474916', Title: 'Smile', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagqNvCrSXVmd.jpg', Type: 'movie' },
    { imdbID: 'tt1649418', Title: 'The Gray Man', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/7x17X8GBbLKYnMSHWFZg1ZVKGAI.jpg', Type: 'movie' },
    { imdbID: 'tt9764362', Title: 'The Menu', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/v1VtE4DkYBG7TFDGPThCFsVGJdh.jpg', Type: 'movie' },
  ],
  Western: [
    { imdbID: 'tt0059578', Title: 'The Good the Bad and the Ugly', Year: '1966', Poster: 'https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg', Type: 'movie' },
    { imdbID: 'tt0903624', Title: 'True Grit', Year: '2010', Poster: 'https://image.tmdb.org/t/p/w500/cMPMjoAEYiSABkzSbA5cYNFMVXc.jpg', Type: 'movie' },
    { imdbID: 'tt2193215', Title: 'The Hateful Eight', Year: '2015', Poster: 'https://image.tmdb.org/t/p/w500/gKI3RQMW0G0gMrSzD3gQaQsJfQA.jpg', Type: 'movie' },
    { imdbID: 'tt0407304', Title: 'Brokeback Mountain', Year: '2005', Poster: 'https://image.tmdb.org/t/p/w500/4bxQkzIRi6QO3wZi5SaxVHG89MD.jpg', Type: 'movie' },
  ],
  Horror: [
    { imdbID: 'tt10589852', Title: 'M3GAN', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg', Type: 'movie' },
    { imdbID: 'tt13554592', Title: 'The Invitation', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/eeB3B4QsT7tFmJBhRNBVGFTVuEt.jpg', Type: 'movie' },
    { imdbID: 'tt7652160', Title: 'Orphan: First Kill', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/qRnVDrpDHPqmfLXs50R0Qxgzw6q.jpg', Type: 'movie' },
    { imdbID: 'tt2705436', Title: 'Ouija: Origin of Evil', Year: '2016', Poster: 'https://image.tmdb.org/t/p/w500/pKsEGRgqDRVaXRQjvbV5AdbFuVb.jpg', Type: 'movie' },
  ],
  Fantasy: [
    { imdbID: 'tt0120737', Title: 'The Lord of the Rings: The Fellowship of the Ring', Year: '2001', Poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', Type: 'movie' },
    { imdbID: 'tt0167260', Title: 'The Lord of the Rings: The Return of the King', Year: '2003', Poster: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', Type: 'movie' },
    { imdbID: 'tt4154796', Title: 'Avengers: Endgame', Year: '2019', Poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', Type: 'movie' },
    { imdbID: 'tt0926084', Title: 'Doctor Strange', Year: '2016', Poster: 'https://image.tmdb.org/t/p/w500/uGBVAWorkYnUrH9HoVitbnN3IAd.jpg', Type: 'movie' },
  ],
  Music: [
    { imdbID: 'tt5083738', Title: 'Bohemian Rhapsody', Year: '2018', Poster: 'https://image.tmdb.org/t/p/w500/lHu1wtNaczFPiz8w4oCU9iyAasa.jpg', Type: 'movie' },
    { imdbID: 'tt1340800', Title: 'Begin Again', Year: '2013', Poster: 'https://image.tmdb.org/t/p/w500/obwnr5GfGBP4fmEOcPjJXfGfJFZ.jpg', Type: 'movie' },
    { imdbID: 'tt6105098', Title: 'Rocketman', Year: '2019', Poster: 'https://image.tmdb.org/t/p/w500/glHIgQbdNBMRiKihlVDEjGxLCfZ.jpg', Type: 'movie' },
    { imdbID: 'tt4975722', Title: 'La Bamba', Year: '1987', Poster: 'https://image.tmdb.org/t/p/w500/2WVsOVcVK26m4FS6A7HVmNrwAUD.jpg', Type: 'movie' },
  ],
  Fiction: [
    { imdbID: 'tt1630029', Title: 'Avatar: The Way of Water', Year: '2022', Poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', Type: 'movie' },
    { imdbID: 'tt0816692', Title: 'Interstellar', Year: '2014', Poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', Type: 'movie' },
    { imdbID: 'tt0133093', Title: 'The Matrix', Year: '1999', Poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', Type: 'movie' },
    { imdbID: 'tt0421715', Title: 'Avatar', Year: '2009', Poster: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', Type: 'movie' },
  ],
};

const CATEGORY_SEARCH_TERMS: Record<string, string> = {
  Action: 'action',
  Drama: 'drama',
  Romance: 'love',
  Thriller: 'The Menu',
  Western: 'western',
  Horror: 'M3GAN',
  Fantasy: 'Lord of the Rings',
  Music: 'Bohemian Rhapsody',
  Fiction: 'Interstellar',
};

export async function fetchMoviesByCategory(category: string): Promise<Movie[]> {
  const fallback = FALLBACK_MOVIES[category];
  try {
    if (!OMDB_KEY) return fallback || [];
    const term = CATEGORY_SEARCH_TERMS[category] || category.toLowerCase();
    const { data } = await axios.get(OMDB_URL, {
      params: { s: term, type: 'movie', apikey: OMDB_KEY },
      timeout: 5000,
    });
   if (
  data.Response === 'False' ||
  !data.Search?.length ||
  data.Search.length < 4
) {
  return fallback || [];
}
   const movies = (data.Search as Movie[]).slice(0, 4);

const valid = movies.filter(
  (m) => m.Poster && m.Poster !== 'N/A'
);

if (valid.length < 4) {
  return fallback || [];
}

return valid;
  } catch {
    return fallback || [];
  }
}

export async function fetchMovieDetail(imdbID: string): Promise<MovieDetail> {
  if (OMDB_KEY) {
    try {
      const { data } = await axios.get(OMDB_URL, {
        params: { i: imdbID, apikey: OMDB_KEY },
        timeout: 5000,
      });
      if (data.Response !== 'False') return data;
    } catch {
    }
  }
  const all = Object.values(FALLBACK_MOVIES).flat();
  const m = all.find((x) => x.imdbID === imdbID);
  return {
    imdbID,
    Title: m?.Title || 'Unknown',
    Year: m?.Year || '',
    Genre: 'Drama, Thriller',
    imdbRating: '7.5',
    Runtime: '120 min',
    Plot: 'An gripping story that keeps you on the edge of your seat.',
    Actors: 'Various Actors',
    Poster: m?.Poster || '',
    Released: m?.Year || '',
    Director: 'Director',
    Language: 'English',
  };
}
