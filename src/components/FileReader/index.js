import './style.css';
import textImg from '../../assets/image.txt'
import textImg2 from '../../assets/file2.txt'
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const herDoB = '2003-11-22';

export default function TextFileReader() {
    const [nameInput, setNameInput] = useState('');
    const [isShowName, setIsShow] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [isShowImg, setShowImg] = useState(false);
    const [fileData, setFileData] = useState('Tap here to see!')

    const showNameInput = () => {
        if (nameInput !== '') {
            console.log(nameInput);
            setIsShow(true)
        }
        else alert('Please enter your name ^^')
    }

    const checkBirthday = () => {
        if (birthday === '') alert('Empty input, please enter your birthday!');
        else {
            if (birthday !== herDoB) alert("It's not your birthday!");
            else setShowImg(true);
        }
    }
    const processData = () => {
        fetch(textImg)
            .then(r => r.text())
            .then(text => {
                // Split the file contents on newlines
                const lines = text.split('\n');
                // Set the value of the textarea to the array of lines
                setFileData(lines);
            });
    }

    const handleChange = (event) => {
        fetch(textImg2)
            .then(r => r.text())
            .then(text => {
                setFileData(text);
            });
    }

    return (
        <div className="check-bar">
            <label>Enter your name!</label>
            <p>
                <input className='style' type="text" value={nameInput} onChange={(data) => { setNameInput(data.target.value) }} />
                <button onClick={showNameInput} className='style'>Submit</button>
            </p>
            {isShowName &&
                <div>
                    <p>Hi, {nameInput}!</p>
                    <label>Enter your birthday: </label>
                    <p>
                        <input className='style' type="date" value={birthday} onChange={(data) => { setBirthday(data.target.value) }} />
                        <button className='style' type="submit" onClick={checkBirthday}> Let's see!</button>
                    </p>
                </div>
            }
            {isShowImg &&
                <TextareaAutosize className="output" value={fileData} onChange={processData} onFocus={handleChange}/>
            }
        </div>
    );
}
