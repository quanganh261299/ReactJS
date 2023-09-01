import {Spin, Alert} from 'antd';
import styles from './loadingdepartment.module.css'

const LoadingDepartment = () => {
    return(
    <div className={styles.loading_department__container}>
        <Spin size='large' tip='Loading...'>
            <Alert
            message="Cảnh báo"
            showIcon
            description="Hiện tại chưa có dữ liệu quản lí phòng ban nào được tìm thấy"
            type="warning"
            />
        </Spin>
    </div>
    )
}

export default LoadingDepartment;