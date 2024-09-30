import type React from 'react';
// TODO: Uncomment when Film interface is added
import type Film from '../utils/interfaces/Film.interface';
import { IoEyeOutline } from 'react-icons/io5';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';
import { useState } from 'react';

// TODO: Define FilmCardProps
type FilmCardProps = {
  currentFilm: Film
  addToWatchList: () => void
  addToSeenItList: () => void
};





const FilmCard = ({currentFilm, addToWatchList, addToSeenItList}: FilmCardProps) => {

  const [onWatchList, setOnWatchList] = useState<boolean>(false)
  const [onSeenItList, setOnSeenItList] = useState<boolean>(false)

  const handleAddToWatchList = (): void => {
    setOnWatchList(true)
    addToWatchList()
  }

  const handleAddToSeenList = (): void => {
    setOnSeenItList(true)
    addToSeenItList()
  }
  

  const removeFromLocalStorage = () => {
    let parsedFilmsToWatch: Film[] = [];
    const storedFilmsToWatch = localStorage.getItem('filmsToWatch');
    if (typeof storedFilmsToWatch === 'string') {
      parsedFilmsToWatch = JSON.parse(storedFilmsToWatch);
    }
    let parsedAlreadySeenFilms: Film[] =  [];
    const storedAlreadySeenFilms = localStorage.getItem('alreadySeenFilms');
    if (typeof storedAlreadySeenFilms === 'string') {
      parsedAlreadySeenFilms = JSON.parse(storedAlreadySeenFilms);
    }
    for(let i = 0; i < parsedFilmsToWatch.length; i++){
      if(parsedFilmsToWatch[i].Title === currentFilm.Title){
        parsedFilmsToWatch.splice(i, 1)
      }
    }
    for(let i = 0; i < parsedAlreadySeenFilms.length; i++){
      if(parsedAlreadySeenFilms[i].Title === currentFilm.Title){
        parsedAlreadySeenFilms.splice(i, 1)
      }
    }
    localStorage.setItem('filmsToWatch', JSON.stringify(parsedFilmsToWatch));
    localStorage.setItem('alreadySeenFilms',JSON.stringify(parsedAlreadySeenFilms));
    setOnWatchList(false)
    setOnSeenItList(false)
  }

  return (
    <>
      {currentFilm?.Title ? (
        <section className='filmCard'>
          <figure>{/* TODO: Add film poster*/}</figure>
          <article className='details'>
            {/* TODO: Add film title, director, actors, released, and genre */}
            <p>Title: {currentFilm.Title}</p>
            <hr/>
            <p>Director: {currentFilm.Director}</p>
            <hr/>
            <p>Actors: {currentFilm.Actors}</p>
            <hr/>
            <p>Released: {currentFilm.Released}, {currentFilm.Year}</p>
          </article>
          <article className='plot'>{currentFilm.Plot}</article>
          {/* If film is on Watch List or Seen It list film can be removed
              Else film can be added to Watch List or Seen It list */}
          {onWatchList || onSeenItList ? (
            <aside className='icons'>
              {/* TODO: Add remove film from localStorage logic here */}
              <ImCross style={{ fontSize: '40px', cursor: 'pointer' }} onClick={removeFromLocalStorage}/>
            </aside>
          ) : (
            <aside className='icons'>
              {/* TODO: Implement add to WatchList logic here*/}
              <CgPlayListAdd style={{ fontSize: '50px', cursor: 'pointer' }} onClick={handleAddToWatchList} />
              {/* TODO: Implement add to Seen It list logic here*/}
              <IoEyeOutline style={{ fontSize: '50px', cursor: 'pointer' }} onClick={handleAddToSeenList}/>
            </aside>
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for a film.</h1>
      )}
    </>
  );
};

export default FilmCard;
