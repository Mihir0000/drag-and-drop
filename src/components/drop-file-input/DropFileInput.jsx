import React, { useEffect, useRef, useState } from 'react';
import './DropFileInput.css';
import { Button, Row, ProgressBar } from 'react-bootstrap';

const DropFileInput = (props) => {
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [newFile, setNewfile] = useState([]);
    const [preview, setPreview] = useState([]);
    const [prog, setProg] = useState();
    const [now, setNow] = useState(0);
    const [uploadAll, setUploadAll] = useState(false);
    const onDragEnter = () => {
        wrapperRef.current.classList.add('dragover');
    };
    const onDragLeave = () => {
        wrapperRef.current.classList.remove('dragover');
    };
    const onDrop = () => {
        wrapperRef.current.classList.remove('dragover');
    };
    const onFileDrop = (e) => {
        setNewfile([...newFile, ...e.target.files]);
        // console.log([...newFile, ...e.target.files]);
    };
    const uploadClick = (e) => {
        setTimeout(() => {
            if (newFile.length > 0) {
                const updatedList = [...fileList, ...newFile];
                setFileList(updatedList);
                props.onFileChange(updatedList);
            } else {
                alert('Click Upload All Button after selecting file');
            }
            setNewfile([]);
        }, 1000);
        setUploadAll(true);
    };
    const singleUpload = (item) => {
        console.log(item);
        progress(item);
        setTimeout(() => {
            const updatedList = [...fileList, item];
            setFileList(updatedList);
            props.onFileChange(updatedList);
            setNewfile(newFile.filter((i) => i !== item));
        }, 1000);
    };

    const progress = (item) => {
        setProg(item);
        // console.log(item);
        let val = 0;
        setNow(0);
        while (val <= 100) {
            setNow(val);
            val += 10;
            console.log(val);
        }
    };
    const singleRemove = (item) => {
        // console.log(item);
        setNewfile(newFile.filter((i) => i !== item));
    };

    // const fileRemove = (file) => {
    //     console.log(file);
    //     const updatedList = [...fileList];
    //     updatedList.splice(fileList.indexOf(file), 1);
    //     setFileList(updatedList);
    //     props.onFileChange(updatedList);
    // };

    useEffect(() => {
        if (!newFile || newFile.length < 1) {
            return;
        }
        const objectUrlArr = [];
        for (let i = 0; i < newFile.length; i++) {
            const objectUrl = URL.createObjectURL(newFile[i]);
            objectUrlArr.push(objectUrl);
        }
        setPreview(objectUrlArr);
        // return () => URL.revokeObjectURL(objectUrl);
    }, [newFile]);

    return (
        <>
            <div
                className="drop-file-input"
                ref={wrapperRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img
                        src="/image/cloud-upload-regular-240.png"
                        alt="upload"
                    />
                    <p>Drag and drop your file here</p>
                </div>
                <input type="file" multiple value="" onChange={onFileDrop} />
            </div>
            <div className="my-3">
                {newFile &&
                    newFile.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="d-flex justify-content-between my-1"
                            >
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <p className="">
                                            {newFile && item.name}
                                        </p>
                                        <span>(</span>
                                        {newFile &&
                                            parseFloat(
                                                item.size / 1024
                                            ).toFixed(2)}
                                        <span>kB)</span>
                                        <img
                                            className="imagePreview"
                                            src={preview[index]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row">
                                    {uploadAll ? (
                                        <ProgressBar
                                            animated
                                            className="mx-2 progressBar"
                                            variant="success"
                                            now={now}
                                            label={`${now} %`}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    {prog === item ? (
                                        <ProgressBar
                                            animated
                                            className="mx-2 progressBar"
                                            variant="success"
                                            now={now}
                                            label={`${now} %`}
                                        />
                                    ) : (
                                        ''
                                        // <ProgressBar
                                        //     className="mx-2 progressBar notActive"
                                        //     variant="success"
                                        //     now={0}
                                        //     label={0}
                                        // />
                                    )}
                                    {!uploadAll && prog !== item ? (
                                        <ProgressBar
                                            className="mx-2 progressBar notActive"
                                            variant="success"
                                            now={0}
                                            label={0}
                                        />
                                    ) : (
                                        ''
                                    )}
                                    <Button onClick={() => singleRemove(item)}>
                                        <i className="fa-solid fa-trash" />
                                    </Button>
                                    <Button
                                        className="mx-2"
                                        onClick={() => singleUpload(item)}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Row className="px-3 py-2">
                <Button onClick={uploadClick}>Upload All</Button>
            </Row>
            {/* {fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Uploaded File</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            <img src={preview[index]} alt="" />
                            <div className="drop-file-preview__item__info">
                                <p>{item.name}</p>
                                <p>
                                    {parseFloat(item.size / 1024).toFixed(2)}kB
                                </p>
                            </div>
                            <span
                                className="drop-file-preview__item__del"
                                onClick={() => fileRemove(item)}
                            >
                                X
                            </span>
                        </div>
                    ))}
                </div>
            ) : null} */}
        </>
    );
};

// DropFileInput.propTypes = {
//     onFileChange: PropTypes.func,
// };

export default DropFileInput;
