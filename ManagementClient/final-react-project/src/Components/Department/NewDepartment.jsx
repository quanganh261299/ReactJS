import {Button, Form, Alert} from 'antd'
import React, { useRef } from 'react'
import axios, { isCancel, AxiosError } from "axios";
import { departmentAPI } from '../../enviroment';
import styles from './newdepartment.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewDepartment = () => {
    const [displayAlertSuccess, setDisplayAlertSuccess] = useState('none');
    const [displayAlertError, setDisplayAlertError] = useState('none');

    const inputRefName = useRef('');
    const inputRefType = useRef('');

    const navigate = useNavigate();

    const handlePostData = async() => {
        const dataPost = { 
            name: inputRefName.current.value,
            type: inputRefType.current.value,
        }  

        await axios.post(departmentAPI, dataPost)
                   .then(res => {
                        console.log('oke');
                        setDisplayAlertError('none');
                        setDisplayAlertSuccess('');
                        setTimeout(() => {
                            navigate('/departments');
                        }, 1500);
                    })
                    .catch(err => {
                        console.log(err, 'opp');
                        setDisplayAlertError('');
                    });
    }

    return(
        <Form className={styles.department__create_form}>
            <div style={{position: 'absolute', top: '28vh'}}>
                <Alert
                message="Thêm phòng ban thành công!"
                type="success"
                showIcon
                style={{display: displayAlertSuccess}}
                />
            </div>
            <div style={{position: 'absolute', top: '28vh'}}>
                <Alert
                message="Thêm phòng ban thất bại!"
                type="error"
                showIcon
                style={{display: displayAlertError}}
                />
            </div>
            <h2>Tạo mới phòng ban</h2>
            <label>
            <span>Tên phòng ban</span>
            <input
                placeholder="Tên phòng ban"
                aria-label="name"
                type="text"
                name="name"
                ref={inputRefName}
                className={styles.department__input_create_form}
            />
            </label>
            <label>
            <span style={{marginLeft: -5}}>Loại phòng ban</span>
            <select
                placeholder="Loại phòng ban"
                aria-label="type"
                type="text"
                name="type"
                ref={inputRefType}
                className={styles.department__input_create_form}
            >
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="TESTER">TESTER</option>
                <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
            </select>
            </label>
            <div className={styles.department__btn_create_form_group}>
                <Button 
                onClick={handlePostData}
                type='primary' 
                className={styles.department__create_btn}>
                    Submit
                </Button>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.department__create_btn}>Cancel</Button>
            </div>
        </Form>
    )
}

export default NewDepartment;