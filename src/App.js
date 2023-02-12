import React , {useState, useEffect} from 'react';
import './App.css';
import Table from './components/Table';


function App() {

  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedType, setSelectedType] = useState("");
  const [companiesList, setCompaniesList] = useState([]);
  

  // Fetching data from API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://my-json-server.typicode.com/capcito/frontend-ws/companies");
      const data = await response.json();
      setCompanies(data);
    }
    fetchData();
  }, []);


  //Sort by asc and desc
  const sortCompanies = (companies, sortOrder, selectedType) => {
    return companies.sort((a, b) => {
      if (selectedType) {
        if (sortOrder === "desc") {
          return a.type.localeCompare(b.type);
        } else {
          return b.type.localeCompare(a.type);
        }
      } else {
        if (sortOrder === "desc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }
    });
  };

  //Search Filter
  useEffect(() => {
    setCompaniesList(
      sortCompanies(
        selectedType
          ? companies.filter(company => company.type === selectedType && company.name.toLowerCase().includes(searchTerm.toLowerCase()))
          : companies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase())),
        sortOrder,
        selectedType
      )
    );
  }, [searchTerm, sortOrder, companies, selectedType]);



  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  


  return (
    <div className='flex flex-col justify-start h-screen w-full md:w-[50vw] px-2 pt-16 md:pt-12 pb-12'>
      <div className='relative'>
        <input
          className='flex items-start justify-start border-b border-slate-600 md:w-[49vw] py-2 px-3'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm !== "" && (
          <button
            className='absolute top-0 right-0 mr-3 mt-1'
            onClick={() => {
              setSearchTerm("");
            }}
          >
            &times;
          </button>
        )}
      </div>
      <div className='flex items-center justify-start w-full'>
        <button
          className='underline underline-offset-2 rounded-md mt-6 text-sm font-semibold hover:cursor-pointer' 
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          Sort {sortOrder === "desc" ? "Ascending" : "Descending"}
        </button>

      <select className='mt-6 ml-4 px-2 underline underline-offset-2 rounded-md text-sm font-semibold hover:cursor-pointer' value={selectedType} onChange={handleTypeChange}>
          <option className='underline underline-offset-2 rounded-md mt-6 text-sm font-semibold' value="">Sort by Type</option>
            {Array.from(new Set(companies.map((company) => company.type))).sort().map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
))}

      </select>

      </div>

      <Table companiesList={companiesList} />
      {companiesList.length === 0 && searchTerm !== "" && (
        <div className='text-center text-gray-400 mt-4'>No results found</div>
      )}
    </div>
  );
}

export default App;
