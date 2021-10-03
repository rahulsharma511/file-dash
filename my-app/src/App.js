import './App.css';
import FileUpload from './components/fileupload'

const App=()=> (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> File Dash
    </h4>
    <FileUpload />
  </div>
  );

export default App;
