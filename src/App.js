import './App.css';
import React from 'react';  
import Table from 'react-bootstrap/Table';  
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  

function App() {
  const url = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json"
  const request = new XMLHttpRequest();
  request.open('GET', url);  
  request.onload = function(){ 
    if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    localStorage.setItem('info', JSON.stringify(data));
    console.log('data',data);
  } else {}
};
  request.send();
  const data = JSON.parse(localStorage.getItem('info'));
  console.log('data', data);
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
                    <th>Name</th>
                    <th>Channel</th>
                    <th>seasons</th>
                    <th>episodes</th>
                    <th>release Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: data.length }).map((_, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data[index].name}</td>
                    <td>{data[index].channel}</td>
                    <td>{data[index].seasons}</td>
                    <td>{data[index].episodes}</td>
                    <td>{data[index].release}</td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs lg="2">
            <div class="detailbox">
              <img src={data[0].poster}></img>
              <h2>{data[0].name}</h2>
              <p>{data[0].description}</p>
              <a href={data[0].webpage}></a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>    
  );
}

export default App;
