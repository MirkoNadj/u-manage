import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './UserCoFormModalStyles/UserCoFormModal.css';
import { User, ValidationErrors, LocationProps, SetIsModal } from '../../../Interfaces/ObjectInterfaces';
import { formValidation } from '../../../services/formValidation';
import { guIdGenerator } from '../../../services/guidGenerator';
import { newUserInfo, findUserById, positionsList, findCompanyById } from '../../../services/StorageRepository';
import { InputField } from '../../partials/InputField/InputField';
import { SelectField } from '../../partials/SelectField/SelectField';
import { AppDispatch, RootState } from '../../../app/store';
import { connect, ConnectedProps } from 'react-redux';
import { addUser, editUser } from '../../../features/usersSlice';
import { updateCompanyUsers } from '../../../features/companiesSlice';
import { motion } from 'framer-motion';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import moment from 'moment'

export const UserFormModal = (props: PropsFromRedux) => {
    //let [userInfo, setUserInfo] = useState<User>(newUserInfo);
    const companiesList = props.companies.companiesList;
    const [date, setDate] = useState<any>();

    let nekidob;

    function onChange(date: any, dateString: any) {
        nekidob = moment(date).toDate()
        console.log('dooob2 ,', nekidob)
    }

    const location = useLocation() as LocationProps;
    const [form] = Form.useForm();


    let currentCompany = '';
    if (location.state) {
        currentCompany = location.state.currentCompanyId;
    };

    let { currentUserId } = useParams();
    let navigate = useNavigate();
    let userInfo = { ...newUserInfo };
    if (currentUserId) {
        userInfo = { ...(findUserById(currentUserId, props.users.usersList)!) };
    };
    console.log('userInfo start ', userInfo)


    // useEffect(() => {
    //     if (currentUserId) {
    //         setUserInfo(findUserById(currentUserId, props.users.usersList)!);
    //     };
    // }, [currentUserId, props.users.usersList])

    // const [formErrors, setFormErrors] = useState<ValidationErrors>({ isValid: false });

    // const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    //     setUserInfo({
    //         ...userInfo,
    //         [event.target.id]: event.target.value,
    //     });
    // };

    // const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    //     setUserInfo({
    //         ...userInfo,
    //         [event.target.id]: event.target.value,
    //     });
    // };

    const saveUser = () => {
        console.log('userInfo stari ', userInfo);
        const formValues = form.getFieldsValue();
        console.log('form values', formValues);

        // setUserInfo({
        //     ...userInfo,
        //     [userInfo.firstName]: formValues.firstName,
        //     [userInfo.lastName]: formValues.lastName,
        // })


        userInfo = { ...userInfo, ...formValues }
        // userInfo.firstName = formValues.firstName;
        // userInfo.lastName = formValues.lastName;
        // userInfo.companyId = formValues.companyId;
        userInfo.dOB = moment(formValues.dOB).toDate().toDateString();
        // userInfo.position = formValues.position;
        // userInfo.phoneNumber = formValues.phoneNumber;

        console.log('userInfo posle set ', userInfo);

        if (currentCompany) {
            userInfo.companyId = currentCompany;
        }
        //setFormErrors(formValidation(userInfo));
        userInfo.companyName = findCompanyById(userInfo.companyId, props.companies.companiesList)!.name;


        if (currentUserId) {
            props.editUser(userInfo);     // for editing old user
            //props.editUser(form.getFieldsValue());

        }
        if (!currentUserId) {
            userInfo.id = guIdGenerator();    // saving new user
            props.addUser(userInfo);

        };
        if (true) {
            props.updateCompanyUsers(userInfo);
            props.setIsModall(false);
            navigate('/users/')
            console.log('novi info', userInfo)
            //setUserInfo(newUserInfo);
        };
    };

    const cancelUser = () => {
        props.setIsModall(false);
        currentCompany ? navigate(`/companies/${currentCompany}`) : navigate('/users/');
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
            {/* <motion.form className='user-co-form-container theme'
                variants={modalDropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <div className='form-title'>
                    <h1 onClick={cancelUser}><CloseOutlined /></h1>
                    <label>{(!userInfo.id) ? 'Create New User' : 'Edit User Info'}</label>
                </div>
                <div className='form-body form-body-theme'>
                    <InputField
                        label="First name"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name here..."
                        value={userInfo.firstName}
                        onChange={handleChangeInput}
                        onFocus={() => { formErrors.firstName = '' }}
                        error={formErrors.firstName}
                    />
                    <InputField
                        label="Last name"
                        type="text"
                        id="lastName"
                        name="firstName"
                        placeholder="Last name here..."
                        value={userInfo.lastName}
                        onChange={handleChangeInput}
                        onFocus={() => { formErrors.lastName = '' }}
                        error={formErrors.lastName}
                    />
                    <SelectField
                        label='Company:'
                        id='companyId'
                        name='companyName'
                        value={currentCompany ? currentCompany : userInfo.companyId}
                        defaultValue={currentCompany ? currentCompany : 'defaultValue'}
                        itemArr={companiesList}
                        onChange={handleChangeSelect}
                        onFocus={() => { formErrors.companyId = '' }}
                        error={formErrors.companyId}
                        isDisabled={companiesList.length === 0 ? true : false}
                    >
                    </SelectField>
                    <InputField
                        label="Date Of Birth"
                        type="text"
                        id="dOB"
                        name="dOB"
                        placeholder='Enter birthday please...'
                        value={userInfo.dOB}
                        onChange={handleChangeInput}
                        onFocus={(e: any) => { e.target.value = userInfo.dOB; e.target.type = 'date' }}
                        error={formErrors.dOB}
                    />
                    <SelectField
                        label='Position:'
                        id='position'
                        name='position'
                        value={userInfo.position}
                        defaultValue={'defaultId'}
                        itemArr={positionsList}
                        onChange={handleChangeSelect}
                        onFocus={() => { formErrors.position = '' }}
                        error={formErrors.position}
                    >
                    </SelectField>
                    <InputField
                        label="Phone Number"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='Enter phone number here...'
                        value={userInfo.phoneNumber}
                        onChange={handleChangeInput}
                        onFocus={() => { formErrors.phoneNumber = '' }}
                        error={formErrors.phoneNumber}
                    />
                </div>
                <div className='form-footer'>
                    <button className='cancel-btn' type='button' onClick={cancelUser}>Cancel</button>
                    <button className='save-btn' type='button' onClick={saveUser}>Save</button>
                </div>
            </motion.form> */}
            <div>
                <Form
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
                            value: userInfo.companyId
                        },
                        {
                            name: ['dOB'],
                            value: moment(userInfo.dOB)
                        },
                        {
                            name: ['position'],
                            value: userInfo.position
                        },
                        {
                            name: ['phoneNumber'],
                            value: userInfo.phoneNumber
                        },
                    ]}
                >
                    <Form.Item
                        name='firstName'
                        label='First Name'
                        rules={[
                            {
                                required: true,
                                message: "Must enter name"
                            },
                            { whitespace: true }
                        ]}

                    >
                        <Input placeholder='Enter your first name...' />
                    </Form.Item>
                    <Form.Item name='lastName' label='Last Name'>
                        <Input placeholder='Enter your last name...' />
                    </Form.Item>
                    <Form.Item name='companyId' label='Company'>
                        <Select placeholder='Enter your company name...' >
                            {companiesList.map((companyItem) => {
                                return <Select.Option value={companyItem.id}>{companyItem.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name='dOB' label='Date Of Birth'>
                        <DatePicker placeholder='Enter your birthday...' value={date} format={'DD/MM/YYYY'} />
                    </Form.Item>
                    <Form.Item name='position' label='Position'>
                        <Select>
                            <Select.Option value='Manager'>Manager</Select.Option>
                            <Select.Option value='Developer'>Developer</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='phoneNumber' label='Phone Number'>
                        <Input type='number' placeholder='Enter your phone number...' />
                    </Form.Item>
                    <div className='form-footer'>
                        <Form.Item name='cancel'>
                            <Button type='primary' onClick={() => { cancelUser() }}>
                                Cancel
                            </Button>
                        </Form.Item>
                        <Form.Item name='save'>
                            <Button type='primary' htmlType='submit'>
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>

        </motion.div>

    </>
    );
};

let mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        users: state.users,
        companies: state.companies,
        setIsModall: ownProps.setIsModall
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