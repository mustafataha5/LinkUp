import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatAgeBar = () => {
    const [ageData, setAgeData] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                const users = response.data.users;
                const ageGroups = groupByAge(users);
                setAgeData(ageGroups);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const groupByAge = (users) => {
        // Define age bins with new ranges
        const bins = { '13-19': 0,  '20-29': 0, '30-39': 0,  '40-49': 0,  '50-59': 0, '60+': 0  };

        // Count users in each age bin
        users.forEach(user => {
            const age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
            if (age >= 13 && age <= 19) bins['13-19'] += 1;
            else if (age >= 20 && age <= 29) bins['20-29'] += 1;
            else if (age >= 30 && age <= 39) bins['30-39'] += 1;
            else if (age >= 40 && age <= 49) bins['40-49'] += 1;
            else if (age >= 50 && age <= 59) bins['50-59'] += 1;
            else if (age >= 60) bins['60+'] += 1;
        });

        // Convert bins to arrays for Chart.js
        const labels = Object.keys(bins);
        const data = Object.values(bins);

        return { labels, data };
    };

    const chartData = {
        labels: ageData.labels || [],
        datasets: [
            {
                label: 'Number of Users',
                data: ageData.data || [],
                backgroundColor: 'orange', // Set bar color to yellow
                borderColor: 'rgba(0, 0, 0, 0.1)', // Optional: Set border color for better visibility
                borderWidth: 1, // Optional: Set border width
            },
        ],
    };

    return (
        <div>
            <h2>Age Distribution of Users</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false, // Remove the legend
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Age Range',
                            },
                            grid: {
                                display: false // Hide grid lines on the x-axis
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Users',
                            },
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                display: false // Hide grid lines on the y-axis
                            }
                        }
                    }
                }}
            />
        </div>
    );
};
export default AdminStatAgeBar;


// {/* 2nd Column */}
// <div className="col-xs-6">
// <div className="centered-content">
//     <div>
//         <h2>Gender Distribution</h2>
//         <p> { < AdminStatPie genderCounts={genderCounts} /> }</p>
//     </div>
// </div>
// </div>