const Search = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search news</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search news"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default Search;