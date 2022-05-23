import React, { useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './UserFormModal.scss';
import { User, LocationProps, PickerDate } from '../../../Interfaces/ObjectInterfaces';
import { guIdGenerator } from '../../../services/guidGenerator';
import { newUserInfo, findUserById, positionsList, findCompanyById, formatDateForTable } from '../../../services/StorageRepository';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { addUser, editUser } from '../../../features/usersSlice';
import { updateCompanyUsers } from '../../../features/companiesSlice';
import { motion } from 'framer-motion';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import moment, { Moment } from 'moment';

export const UserFormModal = (props: PropsFromRedux) => {
    const companiesList = props.companies.companiesList;

    const date = useRef<PickerDate>(null);
    const location = useLocation() as LocationProps;
    const [form] = Form.useForm();
    let navigate = useNavigate();

    let currentCompany = '';
    if (location.state) {
        currentCompany = location.state.currentCompanyId;
    };

    let { currentUserId } = useParams();

    let userInfo = { ...newUserInfo };

    if (currentUserId) {
        userInfo = { ...(findUserById(currentUserId, props.users.usersList)!) };
    };

    const saveUser = () => {
        const formValues = form.getFieldsValue();

        userInfo = { ...userInfo, ...formValues }
        userInfo.dOB = moment(date.current).toDate().toDateString().slice(4)
        formatDateForTable(userInfo.dOB);

        if (currentCompany) {
            userInfo.companyId = currentCompany;
        }

        userInfo.companyName = findCompanyById(userInfo.companyId, props.companies.companiesList)!.name;

        if (currentUserId) {
            props.editUser(userInfo);     // for editing old user
        }
        if (!currentUserId) {
            userInfo.id = guIdGenerator();    // saving new user
            props.addUser(userInfo);
        };

        props.updateCompanyUsers(userInfo);
        props.setIsModal(false);
        currentCompany ? navigate(`/companies/${currentCompany}`) : navigate('/users/');
    };

    const cancelUser = () => {
        props.setIsModal(false);
        currentCompany ? navigate(`/companies/${currentCompany}`) : navigate('/users/');
    }

    function disabledDate(current: Moment) {
        return current && current > moment().endOf('day');
    }

    const modalDropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25,
                stiffness: 500,
            }
        },
        exit: {
            y: '100vh',
            opacity: 0,
        }
    }

    return (<>
        <motion.div className='user-co-form-backdrop backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div className='user-co-form-container theme'
                variants={modalDropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <Form className='form'
                    form={form}
                    onFinish={() => { saveUser() }}
                    fields={[
                        {
                            name: ['firstName'],
                            value: userInfo.firstName
                        },
                        {
                            name: ['lastName'],
                            value: userInfo.lastName
                        },
                        {
                            name: ['companyId'],
                            value: ((currentCompany || currentUserId) ? (userInfo.companyId || currentCompany) : undefined)
                        },
                        {
                            name: ['dOB'],
                            value: (currentUserId ? moment(userInfo.dOB) : '')
                        },
                        {
                            name: ['position'],
                            value: (userInfo.position !== '' ? userInfo.position : undefined)
                        },
                        {
                            name: ['phoneNumber'],
                            value: userInfo.phoneNumber
                        },
                    ]}
                    layout={'vertical'}
                    requiredMark={false}
                >
                    <div className='form-title'>
                        <h1 className='close' onClick={cancelUser}><CloseOutlined /></h1>
                        <label>{(!userInfo.id) ? 'Create New User' : 'Edit User Info'}</label>
                    </div>

                    <div className='form-body form-body-theme'>
                        <Form.Item
                            name='firstName'
                            label='First Name'
                            rules={[
                                {
                                    required: true,
                                    message: "First name required"
                                },
                                { whitespace: true }
                            ]}
                        >
                            <Input placeholder='Enter your first name...' />
                        </Form.Item>
                        <Form.Item
                            name='lastName'
                            label='Last Name'
                            rules={[
                                {
                                    required: true,
                                    message: "Last name required"
                                },
                                { whitespace: true }
                            ]}
                        >
                            <Input placeholder='Enter your last name...' />
                        </Form.Item>
                        <Form.Item
                            name='companyId'
                            label='Company'
                            rules={[
                                {
                                    required: true,
                                    message: "Company required"
                                },

                            ]}
                        >
                            <Select placeholder='Choose company' disabled={currentCompany ? true : false}>
                                {companiesList.map((companyItem) => {
                                    return <Select.Option value={companyItem.id} key={companyItem.id}>{companyItem.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='dOB'
                            label='Date Of Birth'

                            rules={[
                                {
                                    required: true,
                                    message: "Birthday required",
                                },
                            ]}

                        >
                            <DatePicker
                                placeholder='Enter birthday...'
                                format={'DD/MM/YYYY'}
                                ref={date}
                                disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item
                            name='position'
                            label='Position'
                            rules={[
                                {
                                    required: true,
                                    message: "Position required"
                                },
                            ]}
                        >
                            <Select placeholder="Select position" >
                                {positionsList.map((positionItem) => {
                                    return <Select.Option value={positionItem.id} key={positionItem.id}>{positionItem.name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='phoneNumber'
                            label='Phone Number'
                            rules={[
                                {
                                    required: true,
                                    message: "Phone number required"
                                },
                                { whitespace: true },
                                { min: 9 }
                            ]}
                        >
                            <Input type='number' placeholder='Enter your phone number...' />
                        </Form.Item>
                    </div>
                    <div className='form-footer'>
                        <Form.Item name='cancel-save'>
                            <Button type='default' onClick={() => { cancelUser() }}>
                                Cancel
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </motion.div>
        </motion.div>

    </>
    );
};

let mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        users: state.users,
        companies: state.companies,
        setIsModal: ownProps.setIsModal
    };
};

let mapDispatchToProps = (dispatch: AppDispatch,) => {
    return {
        addUser: (user: User) => dispatch(addUser(user)),
        editUser: (user: User) => dispatch(editUser(user)),
        updateCompanyUsers: (user: User) => dispatch(updateCompanyUsers(user)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(UserFormModal);