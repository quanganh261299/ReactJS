import { useParams, useNavigate  } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import { departmentAPI } from "../../enviroment";
import {Form, Alert, Button} from 'antd';
import styles from './newdepartment.module.css';
import React, { useState, useRef} from "react";

const EditDepartment = () => {
    const[data, setData] = useState({name: '', type: '', totalMembers: ''});

    const paramUrl = useParams();

    const [displayAlertSuccess, setDisplayAlertSuccess] = useState('none');
    const [displayAlertError, setDisplayAlertError] = useState('none');

    const inputRefName = useRef(null);
    const inputRefType = useRef(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        // call api get lay ra chi tiet cua item user data
        if(paramUrl?.id){
         axios.get(departmentAPI+`/${paramUrl?.id}`).then(res => setData(res.data));
         console.log(data.name);
         console.log(data.type);
        }
    }, []);

    const handlePutData = async() => {
        const dataPut = { 
            name: inputRefName.current.value,
            type: inputRefType.current.value,
            totalMembers: data.totalMembers
        }  

        await axios.put(departmentAPI+`/${paramUrl?.id}`, dataPut)
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
                message="Sửa phòng ban thành công!"
                type="success"
                showIcon
                style={{display: displayAlertSuccess}}
                />
            </div>
            <div style={{position: 'absolute', top: '28vh'}}>
                <Alert
                message="Sửa phòng ban thất bại!"
                type="error"
                showIcon
                style={{display: displayAlertError}}
                />
            </div>
            <h2>Sửa thông tin phòng ban</h2>
            <label>
            <span>Tên phòng ban</span>
            <input
                placeholder="Tên phòng ban"
                aria-label="name"
                type="text"
                name="name"
                defaultValue={data.name}
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
                value={data.type}
            >
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="TESTER">TESTER</option>
                <option value="SCRUM_MASTER">SCRUM_MASTER</option>
                <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
            </select>
            </label>
            <div className={styles.department__btn_create_form_group}>
                <Button 
                onClick={handlePutData}
                type='primary' 
                className={styles.department__create_btn}>
                    Submit
                </Button>
                <Button type="primary" onClick={() => navigate(-1)} className={styles.department__create_btn}>Cancel</Button>
            </div>
        </Form>
    )
}

export default EditDepartment;