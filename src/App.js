import "./App.css";
import Pagination from "./Pagination.tsx";
import { useState, useEffect } from "react";

function App() {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [itemPerPage, setItemPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchTableData() {
      setIsLoading(true);
      let url = "https://dummyjson.com/products?&limit=150&skip=0";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError("Error while fetching data...");
        }
        const data = await response.json();
        setTotalCount(data.total);
        setIsLoading(false);
        setData(data.products)
      } catch (error) {
        setError("Error while fetching data...");
      }
    }
    fetchTableData();
  }, []);
  useEffect(()=> {
    const indexOfLastItem = 1 * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const tableData = data && data.slice(indexOfFirstItem, indexOfLastItem);
    setTableData(tableData);
  }, [data])

  function handlePagination(newPage) {
    const indexOfLastItem = newPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const tableData = data && data.slice(indexOfFirstItem, indexOfLastItem);
    setTableData(tableData);
    setCurrentPage(newPage);

  }
  return (
    <>
      <ul>{tableData && tableData.length && tableData.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
      <Pagination
        totalCount={totalCount}
        itemPerPage={itemPerPage}
        currentPage={currentPage}
        setCurrentPage={handlePagination}
      />
    </>
  );
}

export default App;
