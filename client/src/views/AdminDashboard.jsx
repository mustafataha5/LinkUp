import React, { useEffect, useState } from 'react';
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import axios from 'axios';
import '../css/AdminStats.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminStatAgeBar from '../components/AdminStatAgeBar';
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
            console.log(response.data);
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

    return (
        <div>
            <div className='navbar'> { <AdminNavbar /> } </div>

            <div className="container">
                <div className="row charts-row">
                    {/* Gender Distribution Pie Chart */}
                    <div className="col-md-6 chart-container">
                        <AdminStatPie genderCounts={genderCounts} />
                    </div>

                    {/* Age Distribution Bar Chart */}
                    <div className="col-md-6 chart-container">
                        <AdminStatAgeBar users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;