import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from '../src/components/home/home';
import Series from '../src/components/series/series';
import Movies from './components/movies/movies';
import Header from './components/header/header';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;