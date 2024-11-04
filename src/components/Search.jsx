import searchIcon from './../image/search.svg'

export const Search = ({ searchQuery, setSearchQuery }) =>{
    return(
        <div className="search">
            <div className="container search__container">
                <button className="search-btn">
                    <input className="search-btn__input" type="text" placeholder="чек" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <img src={searchIcon} alt="search icon"/>
                </button>
            </div>
        </div> 
    )
}