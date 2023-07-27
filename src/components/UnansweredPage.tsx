import React, { useState, useEffect } from 'react';
import Question from './Question';
import SectionHeader from './SectionHeader';
const UnansweredPage = (props: {
    questionList: { sender: string, message: string }[], 
    setUnanswered: (u: { sender: string, message: string }[])=>void
}) => {
    const [questionList, setQuestionList] = useState<{ sender: string, message: string }[]>(props.questionList);
    
    const deleteQuestion = (index: number) => {
        const newList = questionList.filter((q, i) => i!==index);
        props.setUnanswered(newList);
        window.eel.save_unanswered(newList);
    }

    useEffect(() => {
        setQuestionList(props.questionList);
    }, [props.questionList])

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'space-between',
                fontSize: '1em',
            }}>
                
                <SectionHeader 
                    title='Unanswered Questions'
                    titleDescription={questionList.length>0?
                        "ChatGPT was unable to answer these questions since their answers were not in the descriptions."
                        :"When ChatGPT was unable to answer a question, it will be recorded below."
                        }
                />
                {/* <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 5,
                        height: 30,
                    }}>
                        Unanswered Questions
                    </div>
                    <div style={{
                        fontSize: '0.75em',
                        color: 'gray'
                    }}>
                        {questionList.length>0?
                        "ChatGPT was unable to answer these questions since their answers were not in the descriptions."
                        :"When ChatGPT was unable to answer a question, it will be recorded below."
                        }
                    </div>

                </div> */}
                <div style={{
                    fontSize: '0.8em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    marginBottom: 5
                }}>
                    {questionList.map((value, index) => {
                        return <Question 
                        sender={value.sender} 
                        message={value.message} 
                        key={index} 
                        index={index}
                        deleteSelf={deleteQuestion} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default UnansweredPage;
