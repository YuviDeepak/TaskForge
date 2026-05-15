import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const LeaderBoard = () => {

    const [leader, setLeader] = useState([]);

    const fetchLeader = async () => {

        try {

            let res = await fetch(
                `https://taskforge-backend-hgwj.onrender.com/users/leader`
            );

            let data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            setLeader(data.response);

        } catch (err) {

            alert(err.message);

        }
    };

    useEffect(() => {
        fetchLeader();
    }, []);

    const chartData = {

        series: [
            {
                name: "Completed Tasks",
                data: leader.map((l) => l.completedTask || 0),
            },
        ],

        options: {

            chart: {
                type: "bar",
                toolbar: {
                    show: false,
                },
            },

            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: "45%",
                },
            },

            dataLabels: {
                enabled: true,
            },

            xaxis: {
                categories: leader.map((l) => l.name),
            },

            // colors: ["#9C27B0"],
            colors: [
                "oklch(57.906% 0.27439 300.028)"
            ],

            title: {
                text: "Leaderboard",
                align: "center",
            },

            grid: {
                borderColor: "#e5e5e5",
            },
        },
    };

    return (
        <>
            <div className="groupContainer">

                {/* BAR GRAPH */}
                <div className="groupsBox leaderboardChart">

                    {
                        leader.length > 0 ? (

                            <Chart
                                options={chartData.options}
                                series={chartData.series}
                                type="bar"
                                height={350}
                            />

                        ) : (

                            <div className="grpCard">
                                <h4>No data</h4>
                            </div>

                        )
                    }

                </div>

                {/* OLD CARD DESIGN */}
                <div className="groupsBox">

                    <div className="gp">

                        {
                            leader.length > 0 ? (

                                leader.map((l) => (

                                    <div className="grpCard" key={l._id}>

                                        <div className="grpName">
                                            {l.name}
                                        </div>

                                        <div className="grpView">
                                            <button disabled>
                                                {l.completedTask || 0}
                                            </button>
                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="grpCard">
                                    <h4>No data</h4>
                                </div>

                            )
                        }

                    </div>

                </div>

            </div>
        </>
    );
};

export default LeaderBoard;