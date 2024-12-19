import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(" ");
  const [selectedPdf, setSelectedPdf] = useState(null);

  


  // Fetch PDF data from API
  useEffect(() => {
    fetch("https://api.npoint.io/dee51ea017d20efdfcc8")
      .then((response) => response.json())
      .then((data) => setPdfs(data))
      .catch((error) => console.error("Error fetching PDFs:", error));
  }, []);

  // Filtered PDFs based on search query
  const filteredPdfs = pdfs.filter((pdf) =>{
    //  console.log(pdf.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return pdf?.name.toLowerCase().includes(searchQuery?.toLowerCase())
  });



  // const val = "Understanding Machine Learning:";
  // console.log(val.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="app">
      {!selectedPdf ? (
        <div>
          {/* Header Section */}
          <header>
            <h1 className="heading"><i>PDF Explorer</i></h1>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
              placeholder="Search"
            />
          </header>

          {/* List View */}
          <div className="list-view">
            {filteredPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="pdf-item"
              >
               
                <div className="pdf-info">
                  <h3 className="pdfname">{pdf.name}</h3>
                  <p className="pdfauthor">by {pdf.author? pdf.author: "Anoynymus"}</p>
                  <p className="pdfpublish"> in {pdf.published ? pdf.published: "2024"}</p>
                  <a
                      href={pdf.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-pdf-link"
                    >
                      View Pdf
                    </a>
                </div>
              </div>

            ))}
            {filteredPdfs.length === 0 && (
              <p className="no-results">Fetching Data .....</p>
            )}
          </div>
        </div>
      ) : (
        <div className="reader-view">
          {/* Back Button */}
          <button onClick={() => setSelectedPdf(null)} className="back-button">
            Back to List
          </button>

          {/* Reader View */}
          <h1>{selectedPdf.name}</h1>
          <p>by {selectedPdf.author}</p>
          <iframe
            src={selectedPdf.link}
            title={selectedPdf.name}
            width="100%"
            height="500px"
            className="pdf-reader"
          />
        </div>
      )}
      <footer>
  <div className="footer-content">
    <p>&copy; 2024 Your Website. All rights reserved.</p>
    <p>Created by <a href="#">Nikhil Kumar</a> | <a href="tel:9548427497">Call: 9548427497</a></p>
    <div className="social-icons">
      <a href="https://github.com/NIKHIL-1905-Y" target="_blank" aria-label="Github">Github</a>
      <a href="https://www.linkedin.com/in/nikhil-kr-yaduvanshi/" target="_blank" aria-label="LinkedIn">LinkedIn</a>
      
    </div>
  </div>
</footer>

    </div>

  );
};

export default App;
