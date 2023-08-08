import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Input, Label, Row, Spinner, Table } from 'reactstrap'
const UserApi = () => {
    let [arr, setarr] = useState([])
    let [obj, setobj] = useState({ hobbies: '' })
    let [rowdelet, setrowdelet] = useState(false)
    let reference = useRef()
    let [deleteid, setdeleteid] = useState(null)
    let [loading, setloading] = useState(false)
    const [apicall, setapicall] = useState(false)
    /* api methods are different type. Which is created by backend developer
    Mostly 4 to 5 api method available
    1=>getapi
    2=>getapi by id
    3=>post api
    4=>delete api 
    5=>update api
    
    1=>getapi 
        in this api we have link which we put in axios.get('url').then((res)=> res) in response all data we get in res. if error occur then it is show in catch. if api get run then it is show in inspect network in fetch/xhr show 
        headers=>in which status code show. if 200 means run successfully if we write wrong anythingthen 404 not found. 
                    that type of different status code available for network.
        response=>in response we get data from api
        payload=> in payload we see query which we pass for get data like id we pass for data find
        preview=> in preview status preview
        
    2=>getapi by id in we have pass url with query means id or anything by which api find data from database and get data
    url=>https://student-api.mycodelibraries.com/api/student/get-student-by-id?id=anyid  like this

    3=>post api=>we have to pass obj which we want to set data in database
    4=>in delete api url is connect with query which we want to delete quer yis any possible id or any key firstName lastName
    url=>https://student-api.mycodelibraries.com/api/student/delete?id=64ca1518378d0635bc1001fc
    5=>update api we have to pass new obj which we want to replace with existing for that 
    that new obj pass with same id which is previous one
    and for that formate given like in this api we have to pass obj id like this 
            obj.id  not like this obj._id    

            sample object pass given in api
                            {
                "firstName": "Shaikhs",
                "lastName": "Irshad",
                "age": 1,
                "hobbies": "Reading,Exersice",
                "gender": "Male",
                "city": "Surat",
                "id": "612a05e155c2d838a4c62e5f"
                }
        */

    const setData = () => {
        let formdata = new FormData()
        formdata.append('userImage', obj.userImage)
        formdata.append('firstName', obj.firstName)
        formdata.append('lastName', obj.lastName)
        formdata.append('age', obj.age)
        formdata.append('city', obj.city)
        formdata.append('gender', obj.gender)
        formdata.append('hobbies', obj.hobbies)
        for (let x of formdata.entries()) {
            console.log(x)
        }
        setapicall(true)
        setTimeout(() => {
            axios.post('https://student-api.mycodelibraries.com/api/user/add', formdata)
                .then((res) => {
                    console.log(res)
                    getData()
                    setapicall(false)
                }
                )
                .catch((err) => console.log(err))
        }, 5000);
    }
    const getData = () => {
        setapicall(true)
        axios.get('https://student-api.mycodelibraries.com/api/user/get')
            .then((res) => {
                arr = res.data.data
                setarr([...arr])
                setapicall(false)
            }
            )
            .catch((err) => console.log(err))
    }
    const deleteapi = (id) => {
        setdeleteid(id)
        setrowdelet(true)
    }
    useEffect(() => {
        if (loading) {
            setapicall(true)
            axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${deleteid}`).then((res) => {
                setrowdelet(false)
                getData()
                setapicall(false)
            }).catch((err) => {
                console.log(err)
                setrowdelet(false)
            })
        }
        else {
            setrowdelet(false)
        }
    }, [loading])

    const Delete = () => {
        setloading(true)
    }
    const NoDelete = () => {
        setloading(false)
    }
    const editFunction = (id) => {
        setapicall(true)
        axios.get("https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=" + id).then((res) => {
            obj = res.data.data
            obj.hobbies = obj.hobbies.split(",")
            setobj({ ...obj })
            setapicall(false)
        }).catch((err) => { console.log(err) })
    }

    const updateapi = () => {
        obj.id = obj._id
        setapicall(true)
        axios.post('https://student-api.mycodelibraries.com/api/user/update', obj).then((res) => {
            getData()
            setapicall(false)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    const changeData = (e) => {
        if (e.target.name === "hobbies") {
            if (e.target.checked) {
                obj.hobbies = [...obj.hobbies, e.target.value]
            }
            else {
                obj.hobbies = obj.hobbies.filter((x) => !x.includes(e.target.value))
            }
        }
        else if (e.target.name === 'userImage') {
            obj[e.target.name] = e.target.files[0]
        }
        else {
            obj[e.target.name] = e.target.value
        }
        setobj({ ...obj })
    }

    const submitFunction = (e) => {
        e.preventDefault();
        if (obj._id === undefined) {
            setData()
        }
        else {
            updateapi()
        }
        obj = { hobbies: '' }
        setobj({ ...obj })
        reference.current.value = ''
    }
    return (
        <div>
            {rowdelet && <div className='parent'>
                <div>
                    <div className='pop-up'>
                        <h5><b>Are You Sure You Want to Delete?</b></h5>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-danger me-2' onClick={Delete}>OK</button>
                            <button onClick={NoDelete} className='btn btn-warning '>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}
            {apicall && <div className='loader position-fixed vh-100 vw-100  d-flex justify-content-center align-items-center'><img src={require('../../assets/images/1200x1200.gif')} alt="" style={{ width: '200px', height: '200px' }} /></div>}

            <Row>
                <Col xs={6} className="offset-3">
                    <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">

                        <h1 className="text-center py-3">Student Form</h1>
                        <Form onSubmit={(e) => { submitFunction(e) }}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName" className="fw-600">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.firstName || ''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName" className="fw-600 ">
                                            last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.lastName || ''}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="age" className="fw-600 ">
                                            Age
                                        </Label>
                                        <Input
                                            id="age"
                                            name="age"
                                            placeholder=""
                                            type="number"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.age || ''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="city" className="fw-600 ">
                                            City
                                        </Label>
                                        <select onChange={changeData} value={obj.city || ''} name="city" className="form-select">
                                            <option value="surat">Surat</option>
                                            <option value="bharuch">Bharuch</option>
                                            <option value="vadodara">Vadoadara</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <Label for="example" className="fw-600 ">
                                        Gender
                                    </Label>
                                    <div className="d-flex">
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                onChange={changeData}
                                                value="Male"
                                                checked={obj.gender === "Male" || obj.gender === "male"}
                                            />
                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Male
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                onChange={changeData}
                                                value="Female"
                                                checked={obj.gender === "Female" || obj.gender === "female"}
                                            />

                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Female
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} className="">
                                    <Label
                                        check
                                        for="example"
                                        className="fw-600 
                                my-2"
                                    >
                                        hobbies
                                    </Label>
                                    <Row className="">
                                        <Col xs={3}>
                                            <Input
                                                id="Travelling"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Travelling"
                                                checked={obj.hobbies?.includes('Travelling')}
                                            />
                                            <Label
                                                check
                                                for="Travelling"
                                                className="px-2"
                                            >
                                                Travelling
                                            </Label>
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                                id="Reading"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Reading"
                                                checked={obj.hobbies?.includes('Reading')}
                                            />
                                            <Label
                                                check
                                                for="Reading"
                                                className="px-2"
                                            >
                                                Reading
                                            </Label>
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                                id="Exersice"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Exersice"
                                                checked={obj.hobbies?.includes('Exersice')}
                                            />
                                            <Label
                                                check
                                                for="Exersice"
                                                className="px-2"
                                            >
                                                Exersice
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row className='py-2'>
                                        <Col xs={12}>
                                            <Label
                                                check
                                                for="Exersice"
                                                className="py-2"
                                            >
                                                Profile
                                            </Label>
                                            <input
                                                id="userImage"
                                                name="userImage"
                                                type="file"
                                                className="language me-2 form-control"
                                                onChange={changeData}
                                                ref={reference}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <button className="my-2 btn btn-secondary submit fs-4">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>

            <div className="container bg-body-secondary mt-3">
                <h2 className='text-center py-3'>Form</h2>
                <Table className="">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Profile</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Gender</th>
                            <th>Hobbies</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr?.map((x, i) => {
                            return <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={x.image} alt="" width={40} height={40} />
                                </td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.age}</td>
                                <td>{x.city}</td>
                                <td>{x.gender}</td>
                                <td>{x.hobbies}</td>
                                <td>
                                    <button onClick={() => deleteapi(x._id)} className='me-2 btn text-bg-danger'>Delete</button>
                                    <button onClick={() => editFunction(x._id)} className='btn text-bg-warning'>Edit</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default UserApi