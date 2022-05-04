/**
 * Function that visualizes the grade distribution of a course.
 */

import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer,
} from 'recharts';
import getBetygsfordelning from '../../connections/getBetygsfordelning';
import Loading from '../layout/Loading';
import AnalysInfo from '../layout/AnalysInfo';
import { Help, Info } from './Help';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
let kursData;
let programData;
const Betygsfordelning = (props) => {
    const [loading, setLoading] = useState(true);
    const [howManyCourses, setHowManyCourses] = useState(true);
    const [howManyPrograms, setHowManyPrograms] = useState(true);

    useEffect(() => {
        setLoading(true);
        getBetygsfordelning(props.programKod, props.kursKoder).then((res) => {
            setLoading(true);
            kursData = [];
            programData = {};

            for (let prop in res.kursData) {
                kursData.push({ name: prop, data: res.kursData[prop] });
            }

            for (let q = 0; q < props.programKod.length; ++q) {
                programData[props.programKod[q]] = [];
                setLoading(true);
                //Rearanging the data to suit the histogram
                let myData = {};
                for (let i = 0; i < res.programData[q].length; ++i) {
                    if (!myData[res.programData[q][i].kurskod])
                        myData[res.programData[q][i].kurskod] = {};
                    myData[res.programData[q][i].kurskod][res.programData[q][i].betyg] =
                        res.programData[q][i].value;
                }

                for (let prop in myData) {
                    programData[props.programKod[q]].push({ name: prop });
                    for (let prop2 in myData[prop]) {
                        programData[props.programKod[q]][programData[props.programKod[q]].length - 1][prop2] =
                            myData[prop][prop2];
                    }
                }
            }

            let k = {};
            for (let program in programData) {
                for (let kurs in programData[program]) {
                    k[programData[program][kurs].name] = "";
                }
            }

            setHowManyCourses(Object.keys(k).length);
            setHowManyPrograms(Object.keys(programData).length);

            setLoading(false);
        });
    }, [props]);

    return loading ? (
        <Loading />
    ) : (
        <div style={{ width: '90%' }}>
            <Help text="Håll muspekaren över en stapel i diagrammet för att se betygsfördelningen för respektive kurs." />
            <AnalysInfo
                firstVal={howManyCourses}
                firstTitle='Antal kurser analyserade'
                secondVal={howManyPrograms}
                secondTitle='Antal program analyserade'
            />
            {Object.keys(programData).map((program, i) => {
                return stackedBar(programData[program], program, i);
            })}
        </div>
    );
};

function stackedBar(data, program, i) {
    return (
        <Grid key={i} style={{ backgroundColor: "white", marginBottom: "20px", padding: "15px", paddingBottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "400px" }}>
            <h1 style={{ color: "#11636C", margin: 0 }}>{program}</h1>
            <Grid style={{ width: "100%", height: "80%", backgroundColor: "white" }}>
                <Info text="Håll muspekaren över en stapel i diagrammet för att se betygsfördelningen för respektive kurs." />
                <ResponsiveContainer width='100%' height='100%' >
                    <BarChart
                        width={500}
                        data={data}
                        style={{ backgroundColor: "white", height: "100%" }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' style={{ display: 'none' }} label={{ value: 'Kurs', position: "insideBottom" }} />
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
            </Grid>
        </Grid>
    );
}

export default Betygsfordelning;
