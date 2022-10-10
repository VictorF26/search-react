import React, { useState, useMemo, useEffect } from "react";
import MarkedItem from './markedItem' 
import styled from 'styled-components'


const ResultsContainer = styled.div`
  postition: absolute;
  width: 400px;
  background: white;
  border: solid 1px #222;
  border-top: solid 1px transparent;
  margin-top: -3px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
`;

function Results({ items, onItemSelected, query, onResultsCaltulated }) {
  const [results, setResults] = useState([]);
  const filteredItems = useMemo(() => findMatch(items, query), [items, query]);
  //cada vez que se utiliza un valor de las dependencias se ejecuta la funcion y se pone lo que devuelve en la variable filteredItems


  useEffect(() => {
    onResultsCaltulated(results);
  }, [results])

  function findMatch(items, query) {
    const res = items.filter((i) => {
      return i.title.toLowerCase().indexOf(query) >= 0 && query.length > 0;
    });

    setResults(res);
    return res;
  }

  return (
    <ResultsContainer>
      {query !== ""
        ? filteredItems.map((item) => <MarkedItem key={item.id} query={query} item={item} onClick={onItemSelected} />)
        : ""}
    </ResultsContainer>
  );
}

export default Results;
