/**
 * Function that visualizes the grade distribution of a course.
 */

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import getBetygsfordelning from '../../connections/getBetygsfordelning';
import Loading from '../layout/Loading';

let graphData = [];
const Betygsfordelning = (programKod, kursKoder) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBetygsfordelning().then((res) => {

            console.log(res)
            //Rearanging the data to suit the histogram
            graphData = [];
            let myData = {};
            for (let i = 0; i < res.data.length; ++i) {
                if (!myData[res.data[i].kurskod])
                    myData[res.data[i].kurskod] = {};
                myData[res.data[i].kurskod][res.data[i].betyg] = res.data[i].value;
            }

            for (let prop in myData) {
                graphData.push({ name: prop })
                for (let prop2 in myData[prop]) {
                    graphData[graphData.length - 1][prop2] = myData[prop][prop2];
                }
            }

            setLoading(false);

        });

    }, []);


    return loading ? (
        <Loading />
    ) : (
            <div style={{ width: "100%", height: "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={500} height={300} data={graphData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{display: "none"}}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="U" stackId="a" fill="#C82828" />
                    <Bar dataKey="F" stackId="a" fill="#C82828" />
                    <Bar dataKey="1" stackId="a" fill="#C82828" />

                    <Bar dataKey="G" stackId="a" fill="#64DC8C" />
                    <Bar dataKey="E" stackId="a" fill="#64DC8C" />
                    <Bar dataKey="3" stackId="a" fill="#64DC8C" />
                        
                    <Bar dataKey="D" stackId="a" fill="#4BD2A5" />

                    <Bar dataKey="VG" stackId="a" fill="#32C8BE" />
                    <Bar dataKey="C" stackId="a" fill="#32C8BE" />
                    <Bar dataKey="4" stackId="a" fill="#32C8BE" />

                    <Bar dataKey="B" stackId="a" fill="#19BED7" />

                    <Bar dataKey="A" stackId="a" fill="#00B6F0" />
                    <Bar dataKey="5" stackId="a" fill="#00B6F0" />

                </BarChart>
                </ResponsiveContainer>
                </div>
    );
};

export default Betygsfordelning;