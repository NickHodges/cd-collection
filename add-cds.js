const axios = require('axios');

// cds.ts
const cds = [
  { title: 'Thriller', artist: 'Michael Jackson', releaseYear: 1982 },
  { title: 'Like a Virgin', artist: 'Madonna', releaseYear: 1984 },
  { title: 'Born in the U.S.A.', artist: 'Bruce Springsteen', releaseYear: 1984 },
  { title: 'Purple Rain', artist: 'Prince', releaseYear: 1984 },
  { title: 'Back in Black', artist: 'AC/DC', releaseYear: 1980 },
  { title: 'Graceland', artist: 'Paul Simon', releaseYear: 1986 },
  { title: 'Synchronicity', artist: 'The Police', releaseYear: 1983 },
  { title: 'Slippery When Wet', artist: 'Bon Jovi', releaseYear: 1986 },
  { title: 'The Joshua Tree', artist: 'U2', releaseYear: 1987 },
  { title: 'So', artist: 'Peter Gabriel', releaseYear: 1986 },
];

async function addCds() {
  for (let cd of cds) {
    try {
      const response = await axios.post('<YOUR URL GOES HERE>/cds', cd);
      console.log('Added CD:', response.data);
    } catch (error) {
      console.error('Error adding CD:', error.message);
    }
  }
}

addCds();
