/**
 * Function that visualizes the grade distribution of a course.
 */

import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Sector,
    Cell,
  ResponsiveContainer,
} from 'recharts';
import getBetygsfordelning from '../../connections/getBetygsfordelning';
import Loading from '../layout/Loading';
import AnalysInfo from '../layout/AnalysInfo';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
let kursData;
let programData;
const Betygsfordelning = (props) => {
  const [loading, setLoading] = useState(true);

    useEffect(() => {

        getBetygsfordelning(props.programKod, props.kursKoder).then((res) => {
            setLoading(true);
            kursData = [];
            programData = [];

            for (let prop in res.kursData) {
                kursData.push({ name: prop, data: res.kursData[prop] });
            }
            
            console.log(kursData)
            for (let q = 0; q < props.programKod.length; ++q) {

                programData.push([]);
                //Rearanging the data to suit the histogram
                let myData = {};
                for (let i = 0; i < res.programData[q].length; ++i) {
                    if (!myData[res.programData[q][i].kurskod]) myData[res.programData[q][i].kurskod] = {};
                    myData[res.programData[q][i].kurskod][res.programData[q][i].betyg] = res.programData[q][i].value;
                }

                for (let prop in myData) {
                    programData[q].push({ name: prop });
                    for (let prop2 in myData[prop]) {
                        programData[q][programData[q].length - 1][prop2] = myData[prop][prop2];
                    }
                }
            }


            setLoading(false);
        });

    }, [props]);

    return loading ? (
        <Loading />
    ) : (
            <div style={{ width: '100%', height: '10000px' }}>
                <AnalysInfo

                    firstVal={69}
                    firstTitle='Placeholder'
                    secondVal={69}
                    secondTitle='Placeholder'
                />
                {
                    pieRow(kursData)
                }                                                                                                                
                {
                    programData.map(data => {
                        return stackedBar(data);
                    })
                }
            </div>
    );
};

function pieRow(kursData) {

    return (
        <PieChart width={800} height={160}>
            {
                kursData.map((kurs, i) => {
                    return (
                        <Pie
                            data={kurs.data}
                            cx={(i + 1) * 800 / (kursData.length + 1)}
                            cy={60}
                            innerRadius={30}
                            outerRadius={50}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {kurs.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    );
                })
            }
            {
                kursData.map((kurs, i) => {
                    return (
                        <text x={(i + 1) * 800 / (kursData.length + 1) + 8} y={140} dy={8} textAnchor="middle" fill={"#11636C"}>
                            {kurs.name}
                        </text>
                    );
                })
            }
        </PieChart>
    );
}

function stackedBar(data) {
    return (<div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' style={{ display: 'none' }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='U' stackId='a' fill='#C82828' />
                <Bar dataKey='F' stackId='a' fill='#C82828' />
                <Bar dataKey='1' stackId='a' fill='#C82828' />
                <Bar dataKey='G' stackId='a' fill='#64DC8C' />
                <Bar dataKey='E' stackId='a' fill='#64DC8C' />
                <Bar dataKey='3' stackId='a' fill='#64DC8C' />
                <Bar dataKey='D' stackId='a' fill='#4BD2A5' />
                <Bar dataKey='VG' stackId='a' fill='#32C8BE' />
                <Bar dataKey='C' stackId='a' fill='#32C8BE' />
                <Bar dataKey='4' stackId='a' fill='#32C8BE' />
                <Bar dataKey='B' stackId='a' fill='#19BED7' />
                <Bar dataKey='A' stackId='a' fill='#00B6F0' />
                <Bar dataKey='5' stackId='a' fill='#00B6F0' />
            </BarChart>
        </ResponsiveContainer>
    </div>);
}

export default Betygsfordelning;
