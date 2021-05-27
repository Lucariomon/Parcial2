import './App.css';
import React from 'react';  
import Table from 'react-bootstrap/Table';  
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';

function App() {
  /** internacionalizado */
  const [t, i18n] = useTranslation("global");
  const language = navigator.language;
  if(language.startsWith("es")){
    i18n.changeLanguage("es")
  }
  /** subida de information */
  var det = 0
  const url = t("data")
  const request = new XMLHttpRequest();
  request.open('GET', url);  
  request.onload = function(){ 
    if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    localStorage.setItem('info', JSON.stringify(data));
  } else {}
  };
  request.send();
  const data = JSON.parse(localStorage.getItem('info'));
  function handleClick(e,ind) {
    e.preventDefault();
    det = ind;
    var cont = document.getElementById("det")
    var row =  `<img class="w-100" src=${data[det].poster} alt="Error loading image."></img>
                <div class="detailtext">
                  <h2>${data[det].name}</h2>
                  <p>${data[det].description}</p>
                  <a href=${data[det].webpage}>${t("link")}</a>
                </div>`;
    cont.innerHTML = row;
  };
  /** web page */
  return (
    <div>
      <div>
        <h1>T.V. series</h1>
      </div>
      <hr/>
      <Container>
        <Row>
          <Col>
            <div>  
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("name")}</th>
                    <th>{t("channel")}</th>
                    <th>{t("seasons")}</th>
                    <th>{t("episodes")}</th>
                    <th>{t("release")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: data.length }).map((_, index) => (
                  <tr>                      
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{index + 1}</button></td>
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{data[index].name}</button></td>
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{data[index].channel}</button></td>
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{data[index].seasons}</button></td>
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{data[index].episodes}</button></td>
                    <td><button href="#" onClick={(e) => handleClick(e,index)}>{data[index].release}</button></td>
                  </tr>                  
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs lg="4">
            <div id="det" class="detailbox">
              
            </div>
          </Col>
        </Row>
      </Container>
      <div id="canvas">

      </div>
    </div>    
  );
}

export default App;
