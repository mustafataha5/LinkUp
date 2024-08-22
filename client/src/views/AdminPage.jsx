import SearchIcon from '@mui/icons-material/Search';
import AdminStatBar from "../components/AdminStatBar";
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import './App.css';


const AdminPage = () => {

    return (
        <div style={{marginTop:'300px', justifyContent:'space-evenly', alignContent:'center'}}> 
            <AdminNavbar />
            < AdminStatBar  />
            <div style={{marginTop:'150px'}}></div>
            < AdminStatPie  />
        </div>
    )
}
export default AdminPage;



{/* <Route path='/admin/dashboard' element={<AdminPage />}/> */}