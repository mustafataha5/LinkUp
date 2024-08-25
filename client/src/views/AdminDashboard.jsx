// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import AdminStatPie from "../components/AdminStatPie";
import AdminNavbar from "../components/AdminNavbar";
import axios from 'axios';
import '../css/AdminStats.css'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminStatAgeBar from '../components/AdminStatAgeBar';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
            if (response.data.user.role === 'user') {
                navigate('/401');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error checking authentication', error);
            navigate('/403');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                const users = response.data.users;
                setUsers(users);
                setTotalUsers(users.length);
                const activeCount = users.filter(user => user.status === 'active').length;
                setActiveUsers(activeCount);
                setInactiveUsers(users.length - activeCount);
            });
    };

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
            <div className='navbar'>{<AdminNavbar />}</div>

            <div className="container p-3">
                {/* Cards Row */}
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card text-center bg-light-orange">
                            <div className="card-body">
                                <h5 className="card-title">Total Users</h5>
                                <p className="card-text">{totalUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center bg-light-orange">
                            <div className="card-body">
                                <h5 className="card-title">Active Users</h5>
                                <p className="card-text">{activeUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center bg-light-orange">
                            <div className="card-body">
                                <h5 className="card-title">Inactive Users</h5>
                                <p className="card-text">{inactiveUsers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <h2 className="col-md-6" style={{ textAlign: 'center' }}>Gender Distribution</h2>
                    <h2 className="col-md-6" style={{ textAlign: 'center' }}>Users Age Distribution</h2>
                </div>
                <div className="row charts-row">
                    <div className="col-md-6 chart-container">
                        <AdminStatPie genderCounts={genderCounts} />
                    </div>
                    <div className="col-md-6 chart-container">
                        <AdminStatAgeBar users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
