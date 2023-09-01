import React, { useEffect, useRef, useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import axios, { isCancel, AxiosError } from "axios";

import LoadingDepartment from './LoadingDepartment';
import { departmentAPI } from '../../enviroment';

import { Space, Table, Button, FloatButton, Popconfirm, Typography} from 'antd';
import {EditOutlined, DeleteOutlined, FilterTwoTone, ReloadOutlined, PlusOutlined, LogoutOutlined} from '@ant-design/icons';

import { setAuthToken } from '../Login/Login';

import SetCurrentContext from '../../context/Current';

import styles from './department.module.css';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend'],
  },
  {
    title: 'Tên phòng ban',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Số lượng nhân viên',
    dataIndex: 'totalMembers',
    key: 'totalMembers',
    width: 200,
    sorter: (a, b) => a.totalMembers - b.totalMembers,
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Loại phòng ban',
    key: 'type',
    dataIndex: 'type',
    filters: [
      {
        text: 'DEVELOPER',
        value: 'DEVELOPER'
      },
      {
        text: 'TESTER',
        value: 'TESTER'
      },
      {
        text: 'SCRUM_MASTER',
        value: 'SCRUM_MASTER'
      },
      {
        text: 'PROJECT_MANAGER',
        value: 'PROJECT_MANAGER'
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
    sorter: (a, b) => a.totalMembers - b.totalMembers,
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Thời gian tạo',
    key: 'createdAt',
    dataIndex: 'createdAt',
    sorter: (a, b) => {
      const DateA = new Date(a.createdAt); 
      const DateB = new Date(b.createdAt);
      return DateA - DateB;
    },
    sortDirections: ['ascend','descend'],
  },
  {
    title: 'Cập nhật lúc',
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    sorter: (a, b) => {
      const DateA = new Date(a.updatedAt); 
      const DateB = new Date(b.updatedAt);
      return DateA - DateB;
    },
    sortDirections: ['ascend','descend'],
  },
];

const Department = () => {

  const { Text  } = Typography;

  const navigate = useNavigate();

  const setCurrent = useContext(SetCurrentContext);

  const searchRef = useRef(null);
  const minCreatedDateRef = useRef(null);
  const maxCreatedDateRef = useRef(null);
  const minIdRef = useRef(null);
  const maxIdRef = useRef(null);

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
      fetchData();
  },[pageSize, currentPage]);

  const fetchData = () => {
      let departmentAPISearch = `${departmentAPI}?size=${pageSize}&page=${currentPage}`;

      const refData = [
        { ref: searchRef, paramName: 'search' },
        { ref: minCreatedDateRef, paramName: 'minCreatedDate' },
        { ref: maxCreatedDateRef, paramName: 'maxCreatedDate' },
        { ref: minIdRef, paramName: 'minId'},
        { ref: maxIdRef, paramName: 'maxId'},
      ];
      
      refData.forEach(({ ref, paramName }) => {
        if (ref?.current?.value) {
          departmentAPISearch += `&${paramName}=${ref.current.value}`;
        }
      });

      axios
          .get(departmentAPISearch)
          .then((res) => {
              // console.log("res", res);
              console.log(res.headers);
              setData(res.data.content);
              setTotalElements(res.data.totalElements); // update total elements
          })
          .catch((err) => console.log(err));
  }


  const handleDelete = (id) => {
    axios
      .delete(departmentAPI+`/${id}`)
      .then(res => {
        console.log('ok');
        fetchData();
      })
      .catch(err => console.error(err));
  }

  const finalColumns = [
  ...columns,
      {
        title: 'Action',
        key: 'action',
        render: (item) => (
            <Space size="middle">
              <Link to={`/departments/${item.id}`}><EditOutlined style={{ fontSize: '20px'}}/></Link>
              <Popconfirm 
                title="Bạn có muốn xóa phòng ban này không?" 
                onConfirm={() => handleDelete(item.id)} 
                onCancel={() => {}} 
                okText="Yes" cancelText="No">
                  <Button type='link'><DeleteOutlined style={{ fontSize: '20px'}}/></Button>
              </Popconfirm>
            </Space>
        ),
        align: 'center'
      },
   ];

  const handleSearch = (e) => {
  e.preventDefault();
  fetchData();
}

  const handleReset = (e) => {
    e.preventDefault();
    searchRef.current.value = null;
    minCreatedDateRef.current.value = null;
    maxCreatedDateRef.current.value = null;
    minIdRef.current.value = null;
    maxIdRef.current.value = null;
    fetchData();
  }

   return(
    <>
        <div className={styles.department__filter_form}>
          <Space>
            <Text style={{fontSize: 30}}>Quản lí phòng ban</Text>
            <Popconfirm
              title="Đăng xuất"
              description="Bạn có muốn đăng xuất không?"
              onConfirm={() => {
                setAuthToken(null);
                setCurrent('login');
                navigate('/login');
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <LogoutOutlined style={{fontSize: 30}}/>
            </Popconfirm>
          </Space>
          <div className={styles.department__filter_field}>
            <input
              placeholder="Tìm kiếm" 
              className={styles.department__input_search}
              ref={searchRef}
            />
            <p>Ngày tạo:</p>
            <input type='date' className={styles.department__input_date} ref={minCreatedDateRef}/>
            -
            <input type='date' className={styles.department__input_date} ref={maxCreatedDateRef}/>
            <p>Nhân viên:</p>
            <input 
            type="number" 
            placeholder="Id nhân viên" 
            className={styles.department__input_id}
            ref={minIdRef}/>
            - 
            <input 
            type="number" 
            placeholder="Id nhân viên" 
            className={styles.department__input_id}
            ref={maxIdRef}/>
            <Button type="primary" icon={<FilterTwoTone />} onClick={handleSearch} className={styles.department__btn_search}>
              Filter and Search
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
        {data.length > 0 ?
        <Table columns={finalColumns} 
            dataSource={data.map((item) => ({...item,key: item.id}))}  
            pagination={{ 
                current: currentPage,
                pageSize: pageSize,
                total: totalElements,
                position: ['bottomCenter'], 
                showSizeChanger:true,
                pageSizeOptions:['10', '20', '30'],
                onShowSizeChange : (_, size) => {setPageSize(size); setCurrentPage(1)},
                onChange : (page) => setCurrentPage(page),
            }}
        /> : <LoadingDepartment />}
        <Link to='/departments/create'>
          <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          tooltip="Create"
          className={styles.department__btn_create}/>
        </Link>
    </>
)
}

export default Department;



