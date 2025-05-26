import React, { useState, useEffect } from 'react';
import './App.css';

export default function HipHopAlbumList() {
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState("");
  const [newAlbum, setNewAlbum] = useState({ 
    artist: "", 
    title: "", 
    year: "", 
    genre: "Hip-Hop", 
    cover: "" 
  });
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ładowanie danych przy starcie
  useEffect(() => {
    fetchAllAlbums();
  }, []);

  const fetchAllAlbums = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/albums");
      if (!response.ok) throw new Error("Błąd pobierania danych");
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      setError("Nie można pobrać albumów. Sprawdź czy serwer działa na porcie 3001.");
      console.error("Błąd pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistAlbums = async () => {
    if (!artist.trim()) {
      fetchAllAlbums();
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3001/albums/${encodeURIComponent(artist)}`);
      if (response.status === 404) {
        setAlbums([]);
        setError("Nie znaleziono albumów dla tego artysty.");
      } else if (!response.ok) {
        throw new Error("Błąd pobierania danych");
      } else {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      setError("Błąd podczas wyszukiwania albumów.");
      console.error("Błąd pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  const addAlbum = async () => {
    if (!newAlbum.artist.trim() || !newAlbum.title.trim() || !newAlbum.year.trim()) {
      setError("Wypełnij wszystkie wymagane pola (Artysta, Tytuł, Rok)");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAlbum)
      });
      
      if (!response.ok) throw new Error("Błąd dodawania albumu");
      
      const data = await response.json();
      setAlbums([...albums, data]);
      setNewAlbum({ artist: "", title: "", year: "", genre: "Hip-Hop", cover: "" });
    } catch (error) {
      setError("Błąd dodawania albumu.");
      console.error("Błąd dodawania albumu:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAlbum = async (id) => {
    if (!editingAlbum) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3001/albums/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAlbum)
      });
      
      if (!response.ok) throw new Error("Błąd aktualizacji albumu");
      
      const updatedAlbum = await response.json();
      setAlbums(albums.map(album => album.id === id ? updatedAlbum : album));
      setEditingAlbum(null);
    } catch (error) {
      setError("Błąd aktualizacji albumu.");
      console.error("Błąd aktualizacji albumu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten album?")) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:3001/albums/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) throw new Error("Błąd usuwania albumu");
      
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      setError("Błąd usuwania albumu.");
      console.error("Błąd usuwania albumu:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (album) => {
    setEditingAlbum({ ...album });
  };

  const cancelEditing = () => {
    setEditingAlbum(null);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="main-title">
            🎤 LEGENDARY HIP-HOP ALBUMS 🎤
          </h1>
          <p className="subtitle">
            Eminem • 2Pac • Biggie • Real Legends Only
          </p>
        </div>
      </header>

      <main className="main-content">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Search Section */}
        <section className="card">
          <h2 className="card-title">
            🔍 Wyszukaj Albumy
          </h2>
          <div className="search-container">
            <div className="search-row">
              <input
                type="text"
                className="search-input"
                placeholder="Wpisz nazwę artysty (Eminem, 2Pac, Biggie...)"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, fetchArtistAlbums)}
              />
              <button
                className="btn btn-primary"
                onClick={fetchArtistAlbums}
                disabled={loading}
              >
                {loading ? "⏳" : "🔍"} Szukaj
              </button>
              <button
                className="btn btn-secondary"
                onClick={fetchAllAlbums}
                disabled={loading}
              >
                📋 Wszystkie
              </button>
            </div>
          </div>
        </section>

        {/* Add Album Section */}
        <section className="card">
          <h2 className="card-title">
            ➕ Dodaj Nowy Album
          </h2>
          <div className="form-grid">
            <input
              type="text"
              className="form-input"
              placeholder="Artysta *"
              value={newAlbum.artist}
              onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Tytuł *"
              value={newAlbum.title}
              onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Rok *"
              value={newAlbum.year}
              onChange={(e) => setNewAlbum({ ...newAlbum, year: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="URL okładki"
              value={newAlbum.cover}
              onChange={(e) => setNewAlbum({ ...newAlbum, cover: e.target.value })}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={addAlbum}
            disabled={loading}
          >
            {loading ? "⏳" : "➕"} Dodaj Album
          </button>
        </section>

        {/* Albums Section */}
        <section className="card">
          <div className="albums-header">
            <h2 className="card-title">
              🎵 Hip-Hop Collection
            </h2>
            <div className="albums-count">
              {albums.length} {albums.length === 1 ? 'album' : 'albumów'}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-icon">⏳</div>
              <div className="loading-text">Ładowanie...</div>
            </div>
          )}

          {/* Empty State */}
          {!loading && albums.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🎵</div>
              <div className="empty-text">
                Brak albumów do wyświetlenia
              </div>
            </div>
          )}

          {/* Albums Grid */}
          {!loading && albums.length > 0 && (
            <div className="albums-grid">
              {albums.map(album => (
                <article key={album.id} className="album-card">
                  {/* Album Cover */}
                  <div className="album-cover">
                    <img
                      src={album.cover}
                      alt={`${album.title} cover`}
                    />
                  </div>

                  {/* Album Info */}
                  <div className="album-info">
                    <h3 className="album-artist">{album.artist}</h3>
                    <h4 className="album-title">{album.title}</h4>
                    <div className="album-details">
                      <span>📅 Rok: {album.year}</span>
                      <span>🎵 Gatunek: {album.genre}</span>
                    </div>
                  </div>

                  {/* Edit Form or Action Buttons */}
                  {editingAlbum && editingAlbum.id === album.id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        className="edit-input"
                        placeholder="Tytuł"
                        value={editingAlbum.title}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })}
                      />
                      <input
                        type="text"
                        className="edit-input"
                        placeholder="Gatunek"
                        value={editingAlbum.genre}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, genre: e.target.value })}
                      />
                      <input
                        type="text"
                        className="edit-input"
                        placeholder="URL okładki"
                        value={editingAlbum.cover}
                        onChange={(e) => setEditingAlbum({ ...editingAlbum, cover: e.target.value })}
                      />
                      <div className="edit-buttons">
                        <button
                          className="btn btn-success"
                          onClick={() => updateAlbum(album.id)}
                          disabled={loading}
                        >
                          ✅ Zapisz
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={cancelEditing}
                          disabled={loading}
                        >
                          ❌ Anuluj
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => startEditing(album)}
                        disabled={loading}
                      >
                        ✏️ Edytuj
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteAlbum(album.id)}
                        disabled={loading}
                      >
                        🗑️ Usuń
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>🎤 Legendary Hip-Hop Albums Collection 🎤</p>
          <p>Powered by Real Hip-Hop Legends</p>
        </div>
      </footer>
    </div>
  );
}