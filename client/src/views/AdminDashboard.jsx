import React, { useEffect, useState } from 'react';
import AdminStatBar from "../components/AdminStatBar";
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import axios from 'axios';
import '../css/AdminStats.css';
import AgeAnalysisBarChart from '../components/AgeAnalysisBarChart';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });

    // Fetch users to display them in the admin page
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
                <div className="row">
                    {/* Gender Distribution Pie Chart */}
                    <div className="col-md-6">
                        <h2>Gender Distribution</h2>
                        <AdminStatPie genderCounts={genderCounts} />
                    </div>

                    {/* Age Distribution Bar Chart */}
                    <div className="col-md-6">
                        {/* <h2>Age Distribution</h2> */}
                        <AdminStatAgeBar />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
