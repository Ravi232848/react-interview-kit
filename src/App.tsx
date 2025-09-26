import "./App.css";
import Pagination from "./component/Pagination/Pagination";
import { useState, useEffect } from "react";

function App() {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const url = process.env.PRODUCT_API_URL;

  useEffect(() => {
    async function fetchTableData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/products?&limit=200&skip=0"
        );
        if (!response.ok) {
          setError("Error while fetching data...");
        }
        const data = await response.json();
        setTotalCount(data.total);
        setIsLoading(false);
        setData(data.products);
      } catch (error) {
        setError("Error while fetching data...");
      }
    }
    fetchTableData();
  }, []);
  useEffect(() => {
    const indexOfLastItem = 1 * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const tableData = data && data.slice(indexOfFirstItem, indexOfLastItem);
    setTableData(tableData);
  }, [data]);

  function handlePagination(newPage: number) {
    const indexOfLastItem = newPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const tableData = data && data.slice(indexOfFirstItem, indexOfLastItem);
    setTableData(tableData);
    setCurrentPage(newPage);
  }
  return (
    <>
      <div className="list">
        {tableData.length === 0 ? (
          "No Data..."
        ) : (
          <ul>
            {tableData &&
              tableData.map((item: any) => <li key={item.id}>{item.title}</li>)}
          </ul>
        )}
      </div>
      <div className="pagination-container">
        <Pagination
          totalCount={totalCount}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePagination}
        />
      </div>
    </>
  );
}

export default App;
