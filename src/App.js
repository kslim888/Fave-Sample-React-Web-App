import React from 'react';
import './App.css';
import MerchantRow from './merchantRow';
import $ from 'jquery';
import fave from '../src/fave.png'; // Tell Webpack this JS file uses this image
import Papa from 'papaparse';

var jsonToBeExportAsCSV = []

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataToDownload: []
    }
    this.getDataFromFirestore()
  }

  getDataFromFirestore(searchMerchantName) {

    const baseUrl = 'https://web-api-dot-fave-technical-assignment.appspot.com/'
    const urlRead = baseUrl + 'ReadFirestore?merchant=' + searchMerchantName

    $.ajax({
      url: urlRead,
      headers:{
        'Accept': 'application/json',
      },
      dataType: 'json',
      "method": "GET",
      success: (searchResults) => {

        var merchantRows = []
        console.log(searchResults)
        jsonToBeExportAsCSV = searchResults

        searchResults.forEach((merchant) => {
          const merchantRow = <MerchantRow key={merchant._id} merchant={merchant}/>
          merchantRows.push(merchantRow)
        })

        this.setState({rows: merchantRows})
      },
      error: (xhr, status, err) => {
        console.log("Error: " + err + "\nStatus: " + status)
      }
    })
  }

  searchChangeHandler = (event) => {
    console.log(event.target.value)
    var searchMerchantName = event.target.value
    if(searchMerchantName === "A&W") {
      searchMerchantName = "A W"
    }
    console.log(event.target.value)
    this.getDataFromFirestore(searchMerchantName)
  }

  downloadCSV(csv) {
    const fileName = 'Merchant Details.csv';

    const blob = new Blob([csv], { type: 'text/csv;' });
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a");

    link.style.visibility = 'hidden';
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  generateCSV = (event) => {
    const csv = Papa.unparse(jsonToBeExportAsCSV);
    console.log(csv)
    this.downloadCSV(csv)
  }

  render() {
    return (
      <div>
        <table className="titleBar"> 
          <tbody> 
            <tr> 
              <td>
                <img alt="fave-logo" width="100" src={fave} />
              </td>
              
              <td width="8"/>

              <td>
                <h1> Merchant List </h1>
              </td>
            </tr>
          </tbody>
        </table>

          <input className="searchBar"
            onChange={this.searchChangeHandler}
            placeholder="Enter merchant name to search" />
          
          {this.state.rows}

          <button onClick={this.generateCSV} 
          style={{
            marginTop: 16,
            marginBottom: 16 
          }}> 

          Generate CSV File 
          </button>
      </div>
    );
  }
}

export default App;
