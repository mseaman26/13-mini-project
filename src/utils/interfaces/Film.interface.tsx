// TODO: Define an interface for the `Film` object based on the data provided by OMDb API
// TODO: Can the properties be marked as readonly?
export default interface Film {
    Title: string,
    Year: string,
    imdbID: string,
    Type: 'movie' | 'series' | 'episode',
    Poster: string,
    Director: string,
    Actors: string,
    Released: string,
    Plot: string
}
