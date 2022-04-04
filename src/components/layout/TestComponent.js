import React,{useEffect,useState} from 'react';
import getKurserFranProgram from '../../connections/getKurserFranProgram';

const CardWithCourses = ({selectedProgram}) => {

    const [kurser,setKurser] = useState([]);

    useEffect(() => {

        getKurserFranProgram(selectedProgram).then((res) => {
            setKurser(res.data);
            console.log(res);
        })

    },[selectedProgram]);

    return (
        <div>
            {kurser.map((data) => (<div>{data.UTBILDNING_SV}</div>)) }      
        </div>
    );
};

export default CardWithCourses;