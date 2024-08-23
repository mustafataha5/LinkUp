import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AdminStatBar from "../components/AdminStatBar";
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import '../css/AdminStats.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminDashboard = () => {
  return (

    <div>
        <div> {<AdminNavbar />} </div> 

        <div className="container">
        <div className="row">
            {/* 1st Column?? */}
            <div className="col-xs-6">
            <div className="centered-content">
                <div>
                    <h2>2024 Monthly Membership</h2>
                    <p> {< AdminStatBar  />}  </p>
                </div>
            </div>
            </div>

            {/* 2nd Column */}
            <div className="col-xs-6">
            <div className="centered-content">
                <div>
                    <h2>Gender Distribution</h2>
                    <p> {< AdminStatPie  /> }</p>
                </div>
            </div>
            </div>
        </div>

        <style jsx>
            {`
                // .centered-content {
                //     display: flex;
                //     justify-content: center; /* Horizontal centering */
                //     align-items: center;     /* Vertical centering */
                //     height: 100%;            /* Full height of the column */
                //     margin-top: 75px;
                // }
                // .centered-content h2 { 
                //      text-align: center; margin-bottom: 50px;}
                // }
        `}
        </style>
        </div>
    </div>
  );
};

export default AdminDashboard;


{/* <Route path='/admin/dashboard' element={<AdminPage />}/> */}