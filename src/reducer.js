export const reducer = (state, action) => {
  if (action.type === "SET_POPULAR") {
    return {
      ...state,
      popular: action.payload,
      top5: action.payload.slice(0, 5),
      popularIsLoading: false,
    };
  }
  if (action.type === "SET_TOPRATED") {
    return { ...state, topRated: action.payload, topRatedIsLoading: false };
  }
  if (action.type === "SET_NOWPLAYING") {
    return { ...state, nowPlaying: action.payload, nowPlayingIsLoading: false };
  }
  if (action.type === "IS_SEARCHING") {
    return { ...state, isSearching: true };
  }
  if (action.type === "IS_NOT_SEARCHING") {
    return { ...state, isSearching: false };
  }
  if (action.type === "SEARCHING") {
    return { ...state, searchResults: action.payload };
  }
  if (action.type === "SEARCHTERM_CHANGED") {
    return { ...state, searchTerm: action.payload };
  }
  if (action.type === "CLEAR") {
    return { ...state, searchTerm: "", searchResults: null };
  }
  if (action.type === "CLEAR_SEARCH") {
    return { ...state, searchTerm: "" };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      popularIsLoading: false,
      topRatedIsLoading: false,
      nowPlayingIsLoading: false,
    };
  }
  if (action.type === "SET_FOCUS") {
    return {
      ...state,
      isFocus: true,
    };
  }
  if (action.type === "UNSET_FOCUS") {
    return {
      ...state,
      isFocus: false,
    };
  }

  if (action.type === "ADD_ITEMS_TO_STORAGE") {
    return {
      ...state,
      favorites: [...state.favorites, ...action.payload],
    };
  }

  if (action.type === "ADD_ITEM_TO_STORAGE") {
    return {
      ...state,
      favorites: [...state.favorites, action.payload],
      searchresults: state.searchResults?.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: true } : x
      ),
      popular: state.popular.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: true } : x
      ),
      nowPlaying: state.nowPlaying.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: true } : x
      ),
      topRated: state.topRated.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: true } : x
      ),
    };
  }

   if (action.type === "REMOVE_ITEM_TO_STORAGE") {
    return {
      ...state,
      favorites: state.favorites.filter(x => x.id !== action.payload),
      searchresults: state.searchResults?.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: false } : x
      ),
      popular: state.popular.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: false } : x
      ),
      nowPlaying: state.nowPlaying.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: false } : x
      ),
      topRated: state.topRated.map((x) =>
        x.id === action.payload.id ? { ...x, favorite: false } : x
      ),
    };
  }

  return state;
};
