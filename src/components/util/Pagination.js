const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
  
    return (
      <div>
        <ul>
          {Array(totalPages).map((page, i) => (
            <li key={i} onClick={() => setCurrentPage(page + 1)}>
              {page + 1}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Pagination;