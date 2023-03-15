import './App.css';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App">
      <aside className='App-aside'>
        <div className='aside-contianer'>
          <p>欢迎来到jason的个人空间</p>
        </div>
      </aside>
      <main className='App-main'>
        <Main />
      </main>
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header> */}
    </div>
  );
}

export default App;
