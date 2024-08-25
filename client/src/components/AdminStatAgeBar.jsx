import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatAgeBar = ({ users = [] }) => {
    const [ageData, setAgeData] = useState({ labels: [], data: [] });

    useEffect(() => {
        if (users.length) {
            const ageGroups = groupByAge(users);
            setAgeData(ageGroups);
        }
    }, [users]);

    const groupByAge = (users) => {
        const bins = { '13-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60+': 0 };

        users.forEach(user => {
            const age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
            if (age >= 13 && age <= 19) bins['13-19'] += 1;
            else if (age >= 20 && age <= 29) bins['20-29'] += 1;
            else if (age >= 30 && age <= 39) bins['30-39'] += 1;
            else if (age >= 40 && age <= 49) bins['40-49'] += 1;
            else if (age >= 50 && age <= 59) bins['50-59'] += 1;
            else if (age >= 60) bins['60+'] += 1;
        });

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
                backgroundColor: 'orange',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: '600px', height: '350px', backgroundColor: 'white', padding: '20px', margin: '0 auto' }}>
            {ageData.labels.length > 0 ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,  // Allows the chart to fit custom dimensions
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
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
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default AdminStatAgeBar;
