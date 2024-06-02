import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = 'https://rickandmortyapi.com/api/character';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, currentFilter, currentSearch]);

  const fetchCharacters = async () => {
    try {
      let url = `${apiBaseUrl}/?page=${currentPage}`;
      if (currentFilter) url += `&status=${currentFilter}`;
      if (currentSearch) url += `&name=${currentSearch}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.results && data.info) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } else {
        setCharacters([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setCharacters([]);
      setTotalPages(1);
    }
  };

  const handleFilter = (status) => {
    setCurrentFilter(status);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  };

  const viewDetails = (id) => {
    navigate(`/character/${id}`);
  };

  const renderPagination = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <header className="header">
        <div className="left-header">
          <a href="/"><img src={`${process.env.PUBLIC_URL}/images/brandify_logo.svg`} alt="Logo Brandify Cuisine" className="logo" /></a>
          <div className="filter-buttons">
            <button onClick={() => handleFilter('alive')} className="button" id="aliveFilter">Vivant</button>
            <button onClick={() => handleFilter('dead')} className="button" id="deadFilter">Mort</button>
          </div>
        </div>
        <input
          type="text"
          value={currentSearch}
          onChange={handleSearch}
          className="search-input"
          id="searchInput"
          placeholder="Recherche de personnage..."
        />
      </header>
      <main className="main-content">
        <div className="character-list">
          {characters.length > 0 ? (
            characters.map(character => (
              <article key={character.id} className="group flex rounded-xl max-w-sm flex-col overflow-hidden border border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 card-1">
                <div className="h-44 md:h-64 overflow-hidden flex justify-center items-center"> 
                  <img src={character.image} className="object-cover transition duration-700 ease-out group-hover:scale-105" alt={character.name} />
                </div>
                <div className="flex flex-col gap-4 p-6 card-1">
                  <h3 className="text-balance text-xl lg:text-2xl font-bold text-black dark:text-white">{character.name}</h3>
                  <p className="text-pretty text-sm mb-2 Alive">
                    {character.status}
                  </p>
                  <button onClick={() => viewDetails(character.id)} className="cursor-pointer whitespace-nowrap bg-blue-700 px-4 py-2 text-center text-sm font-medium tracking-wide text-slate-100 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:opacity-100 active:outline-offset-0 dark:bg-blue-600 dark:text-slate-100 dark:focus-visible:outline-blue-600 rounded-xl">Voir Détails</button>
                </div>
              </article>
            ))
          ) : (
            <p>aucun résultat trouvé</p>
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>&laquo;</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            </li>
            {renderPagination()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default CharacterList;
