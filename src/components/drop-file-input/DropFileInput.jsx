import React, { useRef, useState } from 'react';
import './DropFileInput.css';
import { ImageConfig } from '../../config/imageConfig';
import PropTypes from 'prop-types';

const DropFileInput = (props) => {
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
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
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
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
                <input type="file" value="" onChange={onFileDrop} />
            </div>
            {fileList.length > 0 ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Ready to Upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            <img
                                src={
                                    ImageConfig[item.type.split('/')[1]] ||
                                    ImageConfig['default']
                                }
                                alt=""
                            />
                            <div className="drop-file-preview__item__info">
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span
                                className="drop-file-preview__item__del"
                                onClick={() => fileRemove(item)}
                            >
                                x
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

export default DropFileInput;
