import './style.css';
import textImg from './textimg.txt'
import {useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';

const herDoB = '2000-03-11';

export default function TextFileReader() {
    const [nameInput, setNameInput] = useState('');
    const [isShowName, setIsShow] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [isShowImg, setShowImg] = useState(false);
    const [fileData, setFileData] = useState('Press Enter to see!')

    const showNameInput = () => {
        if (nameInput !== '') {
            console.log(nameInput);
            setIsShow(true)
        }
        else alert('Empty Input')
    }

    const processData = () => {
        if (birthday !== herDoB) alert('Wrong input')
        else {
            setShowImg(true);
            fetch(textImg)
                .then(r => r.text())
                .then(text => {
                    setFileData(text)
                });
        }
    }

    return(
        <div className="check-bar">
            <label>Enter your name!</label>
            <p>
                <input type="text" value={nameInput} onChange={(data) => {setNameInput(data.target.value)}}/>
                <button onClick={showNameInput}>Submit</button>
            </p>
            {isShowName &&
                <div>
                    <p>Hello {nameInput}</p>
                    <label>Enter your birthday: </label>
                    <p>
                        <input type="date" value={birthday} onChange={(data) => {setBirthday(data.target.value)}}/>
                        <button type="submit" onClick={processData}> Let's see!</button>
                    </p>
                </div>
            }
            {isShowImg &&
                <TextareaAutosize className="output" value={fileData} onChange={(data) => {setFileData(fileData)}}/>
            }
        </div>
    );
}
