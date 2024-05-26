import { useState } from "react";

const Search = () => {

    const [keyword, setKeyword] = useState();

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={keyword} onChange={handleKeyword}/>
                <button className="btn btn-outline-success me-2" type="submit" onClick={handleSearchSubmit}>Search</button>
            </form>
        </>
    );
}

export default Search;