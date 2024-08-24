import React, { useEffect, useState } from 'react';
import AdminStatBar from "../components/AdminStatBar";
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import axios from 'axios';
import '../css/AdminStats.css';
import AgeAnalysisBarChart from '../components/AgeAnalysisBarChart';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const [users, setUsers] = useState([]);
    const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate() ; 
     // Get the user (we will get the id from the cookies then find the user)
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
        console.log(response.data.user)   
      if(response.data.user.role === 'user'){
            navigate('/401');
           }
    setLoading(false)    
      
    } catch (error) {
      console.error('Error checking authentication', error);
      navigate('/403'); // Redirect to login if not authenticated
    } finally {
      setLoading(false); // Ensure loading is false even if requests fail
    }
  };
    // Get all users to display them in a table in admin page
    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = () => {
        axios.get(`http://localhost:8000/api/users`)
        .then(response => {
            console.log(response.data)
            setUsers(response.data.users);   
        })
    }

    // Update gender counts when users change
    useEffect(() => {
        const counts = users.reduce((acc, user) => {
            if (user.gender === 'male') {
                acc.male += 1;
            } else if (user.gender === 'female') {
                acc.female += 1;
            }
            return acc;
        }, { male: 0, female: 0 });

        setGenderCounts(counts);
    }, [users]);

    if(loading){
        return (
            <div>
                <AdminNavbar/>
            </div>

        )
    }
  return (

    <div>
        <div> {<AdminNavbar />} </div> 

        <div className="container">
        <div className="row">
            {/* 1st Column?? */}
            <div className="col-xs-6">
            <div className="centered-content">
                <div>
                    {/* <h2>Age Distribution</h2> */}
                    <p> {< AgeAnalysisBarChart  />}  </p>
                </div>
            </div>
            </div>

            {/* 2nd Column */}
            <div className="col-xs-6">
            <div className="centered-content">
                <div>
                    <h2>Gender Distribution</h2>
                    <p> { < AdminStatPie genderCounts={genderCounts} /> }</p>
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