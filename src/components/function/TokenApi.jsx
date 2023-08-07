import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
const TokenApi = () => {
    let [arr, setarr] = useState([])
    let [obj, setobj] = useState({})
    let token = {
        headers: {
            "Authorization": 'Bearer 8c4b9e86d5eb981e06cbcd32fe3e31a40a5337d7e3c4af1c018b11e32db4862a'
        }
    }

    const setData = () => {
        axios.post('https://gorest.co.in/public/v2/users', obj, token)
            .then((res) => {
                console.log(res)
                getData()
            }
            )
            .catch((err) => console.log(err))
    }
    const getData = () => {
        axios.get('https://gorest.co.in/public/v2/users', token)
            .then((res) => {
                arr = res.data
                setarr([...arr])
            }
            )
            .catch((err) => console.log(err))
    }
    const deleteapi = (a) => {
        axios.delete('https://gorest.co.in/public/v2/users/' + a, token).then((res) => {
            getData()
        }).catch((err) => console.log(err))
    }

    const editFunction = (id) => {
        obj = arr.find((x) => x.id == id)
        setobj({ ...obj })
    }

    const updateapi = () => {
        axios.patch('https://student-api.mycodelibraries.com/api/user/update', obj).then((res) => getData()).catch((err) => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    const changeData = (e) => {
        obj[e.target.name] = e.target.value
        setobj({ ...obj })
    }

    const submitFunction = (e) => {
        e.preventDefault();
        if (obj.id === undefined) {
            setData()
        }
        else {
            updateapi()
        }
        obj = {}
        setobj({ ...obj })
    }
    return (
        <div>
            <Row>
                <Col xs={6} className="offset-3">
                    <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
                        <h1 className="text-center py-3">Student Form</h1>
                        <Form onSubmit={(e) => { submitFunction(e) }}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name" className="fw-600">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.name || ''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email" className="fw-600 ">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            type="email"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.email || ''}
                                        />
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
                                <Col md={6}>
                                    <Label for="example" className="fw-600 ">
                                        Status
                                    </Label>
                                    <div className="d-flex">
                                        <div>
                                            <Input
                                                id="active"
                                                name="status"
                                                type="radio"
                                                className="status me-2"
                                                onChange={changeData}
                                                value="active"
                                                checked={obj.status === "active" || obj.status === "male"}
                                            />
                                            <Label
                                                check
                                                for="active"
                                                className="px-2"
                                            >
                                                Active
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="status"
                                                type="radio"
                                                className="status me-2"
                                                onChange={changeData}
                                                value="inactive"
                                                checked={obj.gender === "Inacive" || obj.gender === "inactive"}
                                            />
                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Inactive
                                            </Label>
                                        </div>
                                    </div>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr?.map((x, i) => {
                            return <tr key={i + 1}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.gender}</td>
                                <td>{x.status}</td>
                                <td>
                                    <button onClick={() => deleteapi(x.id)} className='me-2 btn text-bg-danger'>Delete</button>
                                    <button onClick={() => editFunction(x.id)} className='btn text-bg-warning'>Edit</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TokenApi