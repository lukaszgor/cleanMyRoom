import logo from './logo.svg';
import './App.css';
import supabase from "../src/supabaseClient"
import Routing from './config/Routing';
function App() {

console.log(supabase)


  return (
    <Routing></Routing>
  );
}

export default App;
