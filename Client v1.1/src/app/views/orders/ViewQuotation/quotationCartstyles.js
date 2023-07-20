import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const TableContainer = styled.div`
  width: 100%;
  // height: 500px;
  overflow: auto;
  padding-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
  overflow: scroll;
  & th {
    text-align: left;

    // background: #6473a6;
    background: #7664a6;
    font-weight: bold;
    color: #fff;
    border: 1px solid #7664a6;
    position: sticky;
  }
  & th,
  & td {
    padding: 1.3rem;
    font-size: 1rem;
    border: 1px solid #7664a6;
  }
  & tbody tr:nth-child(even) {
    & td {
      color: #7664a6;
      background: #fff;
      border: 1px solid #7664a6;
    }
  }
  & tbody tr:nth-child(odd) {
    & td {
      color: #7664a6;
      background: #fff;
    }
  }
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 0.5rem;
  width: 100%;
  color: black;
  padding-top: 1rem;
  > div {
    width: 300px;
  }
`;

export { Container, Table, TableContainer, FilterContainer };
