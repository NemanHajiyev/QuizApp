import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Card from './Card';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const { difficulty, amount } = useParams()

    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
            );
            const data = await response.json();
            setQuestions(data.results);
        }
        getData();
    }, [amount, difficulty]);
    console.log(questions)

    return (
        <div className='general'>
            <Card
                questions={questions}
            />
        </div >
    )
}

export default Quiz