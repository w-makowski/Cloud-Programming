express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

albums = [
    { 
        id: 1, 
        artist: "Eminem", 
        title: "The Marshall Mathers LP", 
        year: 2000, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/The_Marshall_Mathers_LP.jpg/250px-The_Marshall_Mathers_LP.jpg"
      },
      { 
        id: 2, 
        artist: "Eminem", 
        title: "The Slim Shady LP", 
        year: 1999, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Eminem_-_The_Slim_Shady_LP_CD_cover.jpg/250px-Eminem_-_The_Slim_Shady_LP_CD_cover.jpg"
      },
      { 
        id: 3, 
        artist: "2Pac", 
        title: "All Eyez on Me", 
        year: 1996, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Alleyezonme.jpg/250px-Alleyezonme.jpg"
      },
      { 
        id: 4, 
        artist: "2Pac", 
        title: "Me Against the World", 
        year: 1995, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Meagainsttheworldcover.jpg/250px-Meagainsttheworldcover.jpg"
      },
      { 
        id: 5, 
        artist: "Biggie", 
        title: "Ready to Die", 
        year: 1994, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Ready_To_Die.jpg/250px-Ready_To_Die.jpg"
      },
      { 
        id: 6, 
        artist: "Biggie", 
        title: "Life After Death", 
        year: 1997, 
        genre: "Hip-Hop", 
        cover: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/NotoriousB.I.G.LifeAfterDeath.jpg/250px-NotoriousB.I.G.LifeAfterDeath.jpg"
      }
];

app.use(cors());
app.use(express.json());

app.get('/albums', (req, res) => {
    res.json(albums);
});

app.get('/albums/:artist', (req, res) => { 
    const artist = req.params.artist.toLowerCase();
    const filteredAlbums = albums.filter(album => 
        album.artist.toLowerCase() === artist ||
        album.artist.toLowerCase().includes(artist)
    );
    if (filteredAlbums.length > 0) {
        res.json(filteredAlbums);
    } else {
        res.status(404).json({ message: "Nie znaleziono albumów dla tego artysty." });
    }
});

app.post('/albums', (req, res) => {
    const { artist, title, year, genre, cover } = req.body;
    if (!artist || !title || !year || !genre || !cover) {
        return res.status(400).json({ message: "Brak wymaganych danych." });
    }
    const newAlbum = { 
        id: Math.max(...albums.map(a => a.id)) + 1, 
        artist, 
        title, 
        year: parseInt(year),
        genre: genre || "Unknown",
        cover: cover
    };
    albums.push(newAlbum);
    res.status(201).json(newAlbum);
});

app.put('/albums/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const { title, genre, cover } = req.body;
    const album = albums.find(album => album.id === id); 
    if (!album) {
        return res.status(404).json({ message: "Album nie znaleziony." });
    }
    if (title) album.title = title; 
    if (genre) album.genre = genre; 
    if (cover) album.cover = cover;

    res.json(album);
});

app.delete('/albums/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = albums.findIndex(album => album.id === id); 
    if (index === -1) {
        return res.status(404).json({ message: "Album nie znaleziony." });
    }
    albums.splice(index, 1);
    res.json({ message: "Album usunięty." });
});

// Uruchomienie serwera 
app.listen(port, () => {
    console.log(`Serwer REST API działa na http://localhost:${port}`);
});
