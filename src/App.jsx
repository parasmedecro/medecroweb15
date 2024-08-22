import { PopupProvider } from './Context/PopupContext';
import { ScheduleContextProvider } from './Context/ScheduleContext';
import Layout from './Layout';

function App() {
  return (
    <div className="App" >
      <PopupProvider>
        <ScheduleContextProvider>
      <Layout/>
        </ScheduleContextProvider>
      </PopupProvider>
    </div>
  );
}

export default App;
