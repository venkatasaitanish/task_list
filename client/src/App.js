import DisplayTasks from './components/DisplayTasks/DisplayTasks';
import SubmitTask from './components/SubmitTask/SubmitTask';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayTasks />} />
        <Route path="/addTask" element={<SubmitTask />} />
        <Route path="/updateTask/:id" element={<SubmitTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
