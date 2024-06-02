import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const getCharacterSummary = (character) => {
  const summaries = {
    1: "Rick Sanchez est un scientifique brillant mais alcoolique qui entraîne son petit-fils Morty dans des aventures interdimensionnelles.",
    2: "Morty Smith est un adolescent souvent entraîné dans des aventures dangereuses par son grand-père Rick.",
    3: "Summer Smith est la sœur de Morty, souvent agacée par ses escapades avec Rick.",
    4: "Beth Smith est la fille de Rick et mère de Morty, une chirurgienne vétérinaire compétente.",
    5: "Jerry Smith est le père de Morty, souvent présenté comme incompétent et insécure."
    // Ajoutez des résumés ici
  };

  return summaries[character.id] || "Résumé indisponible.";
};

function CharacterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetchCharacterDetails(id);
  }, [id]);

  const fetchCharacterDetails = async (id) => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    const response = await fetch(url);
    const character = await response.json();
    setCharacter(character);
  };

  const handleFilter = (status) => {
    // Logique de filtrage ici, peut-être navigation ou état à mettre à jour
    console.log(`Filtrer par statut: ${status}`);
  };

  if (!character) return <div>Chargement...</div>;

  const summary = getCharacterSummary(character);

  return (
    <div>
      <header className="header">
        <div className="left-header">
          <a href="/"><img src={`${process.env.PUBLIC_URL}/images/brandify_logo.svg`} alt="Logo Brandify Cuisine" className="logo" /></a>
          <div className="buttons-retour">
          <button className="button" onClick={() => navigate('/')}>Retour</button>
          </div>
        </div>
        
      </header>
      <main className="main-content-details">
        <article className="group flex rounded-xl max-w-sm flex-col overflow-hidden border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 img-color">
          <div className="h-44 md:h-64 overflow-hidden"> 
            <img src={character.image} className="object-cover transition duration-700 ease-out group-hover:scale-105 img-détails" alt={character.name} />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <span className="text-sm font-medium">Features</span>
            <h3 className="text-balance text-xl lg:text-2xl font-bold text-black dark:text-white" aria-describedby="featureDescription">{character.name}</h3>
            <p id="featureDescription" className="text-pretty text-sm">
              {summary}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

export default CharacterDetails;
