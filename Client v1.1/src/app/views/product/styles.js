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
  height: 500px;
  overflow: scroll;
  padding-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
  overflow: scroll;
  & th {
    text-align: left;

    background: rgba(34, 42, 69, 0.96);
    font-weight: bold;
    color: white;
    border: 1px solid white;
    position: sticky;
  }
  & th,
  & td {
    padding: 0.3rem;
    font-size: 0.7rem;
  }
  & tbody tr:nth-child(even) {
    & td {
      background: #edeef6;
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
