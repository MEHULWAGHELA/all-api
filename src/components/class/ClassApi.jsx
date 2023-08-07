import { Fragment, PureComponent } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";
import axios from "axios";
class ClassApi extends PureComponent {
    constructor() {
        super()
        this.state = {
            obj: {},
            arr: []
        }
    }
    getapi = () => {
        axios.get('https://student-api.mycodelibraries.com/api/student/get')
            .then((res) =>
                this.setState({ arr: res.data.data })
            )
            .catch((error) => console.log(error))
    }
    postapi = () => {
        axios.post('https://student-api.mycodelibraries.com/api/student/add', this.state.obj)
            .then((res) =>
                this.getapi()
            )
            .catch((error) => console.log(error))
    }
    componentDidMount() {
        this.getapi()
        // this.state.obj = { hobbies: [], firstName: '', lastName: '', gender: '', age: '', city: '' }
        // this.setState({ obj: this.state.obj })
    }
    save = (e) => {
        e.preventDefault()
        if (this.state.obj._id == undefined) {
            this.postapi()
        }
        else {
            console.log("updateapi")
            this.updateapi()
        }
        this.setState({ obj: {} })

    }
    changedata = (e) => {
        if (e.target.name == "hobbies") {
            // if (e.target.checked) {
            //     this.state.obj.hobbies.push(e.target.value)
            // }
            // else {
            //     this.state.obj.hobbies = this.state.obj.hobbies.filter((x) => !x.includes(e.target.value))
            // }
            if (e.target.checked === true) {
                this.state.obj.hobbies = [
                    ...this.state.obj.hobbies ? [...this.state.obj.hobbies] : [], e.target.value
                ]
            }
            else {
                this.state.obj.hobbies = this.state.obj.hobbies.filter((x) => {
                    return x !== e.target.value
                })
            }
        }
        else {
            this.state.obj[e.target.name] = e.target.value;
        }
        this.setState({ obj: { ...this.state.obj } })

    }
    deleteapi = (id) => {
        let a = `https://student-api.mycodelibraries.com/api/student/delete?id=${id}`
        axios.delete(a)
            .then((res) =>
                this.getapi()
            )
            .catch((error) => console.log(error))
    }
    updateapi = () => {
        console.log(this.state.obj)
        this.state.obj.id = this.state.obj._id
        axios.post('https://student-api.mycodelibraries.com/api/student/update', this.state.obj).then((res) => this.getapi()).catch((err) => console.log(err))
    }
    editFunction = (id) => {
        axios.get('https://student-api.mycodelibraries.com/api/student/get-student-by-id?id=' + id)
            .then((res) => {
                res.data.data.hobbies = res.data.data.hobbies.split(',')
                this.setState({ obj: { ...res.data.data } })
            })
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col xs={6} className="offset-3">
                        <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
                            <h1 className="text-center py-3">Student Form</h1>
                            <Form onSubmit={(e) => { this.save(e) }}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstName" className="fw-600">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                type="text"
                                                className="main"
                                                onChange={this.changedata}
                                                value={this.state.obj.firstName ?? ""}
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
                                                placeholder="Last Name"
                                                type="text"
                                                className="main"
                                                onChange={this.changedata}
                                                value={this.state.obj.lastName ?? ''}
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
                                                placeholder="Age"
                                                type="number"
                                                className="main"
                                                value={this.state.obj.age ?? ''}
                                                onChange={this.changedata}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="city" className="fw-600 ">
                                                City
                                            </Label>
                                            <select onChange={this.changedata}
                                                value={this.state.obj.city ?? ''}
                                                name="city" className="form-select">
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
                                                    onChange={this.changedata}
                                                    value="Male"
                                                    checked={this.state.obj.gender?.includes("Male") || this.state.obj.gender?.includes("male")}
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
                                                    onChange={this.changedata}
                                                    value="Female"
                                                    checked={this.state.obj.gender?.includes("Female") || this.state.obj.gender?.includes("female")}
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
                                            className="fw-600 my-2"
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
                                                    onChange={this.changedata}
                                                    value="Travelling"
                                                    checked={this.state.obj.hobbies?.includes('Travelling')}
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
                                                    onChange={this.changedata}
                                                    value="Reading"
                                                    checked={this.state.obj.hobbies?.includes('Reading')}
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
                                                    onChange={this.changedata}
                                                    value="Exersice"
                                                    checked={this.state.obj.hobbies?.includes('Exersice')}
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
                            {this.state.arr?.map((x, i) => {
                                return <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{x.firstName}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.age}</td>
                                    <td>{x.city}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobbies}</td>
                                    <td>
                                        <button onClick={() => this.deleteapi(x._id)} className='me-2 btn text-bg-danger'>Delete</button>
                                        <button onClick={() => this.editFunction(x._id)} className='btn text-bg-warning'>Edit</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        )
    }
}
export default ClassApi