import React, { Component, Fragment } from 'react'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import axios from 'axios'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteSweep } from 'react-icons/md'
class ProductApi extends Component {
    constructor() {
        super()
        this.state = {
            obj: {},
            arr: []
        }
    }
    save = (e) => {
        e.preventDefault()
        if (this.state.obj._id === undefined) {
            this.postapi()
        }
        else {
            this.updateapi()
        }
    }
    componentDidMount() {
        this.getapi()
    }
    getapi = () => {
        axios.get('https://student-api.mycodelibraries.com/api/product/get')
            .then((res) => {
                this.state.arr = res.data.data
                this.setState({ arr: this.state.arr })
            })
            .catch((err) => { })
    }
    postapi = () => {
        axios.post('https://student-api.mycodelibraries.com/api/product/add', this.state.obj)
            .then((res) => {
                this.getapi()
                this.setState({ obj: {} })
            })
            .catch((err) => { })
    }
    updateapi = () => {
        this.state.obj.id = this.state.obj._id;
        axios.post('https://student-api.mycodelibraries.com/api/product/update', this.state.obj).then((res) => {
            this.getapi()
            this.setState({ obj: {} })
        }).catch((err) => { })
    }
    editFunction = (id) => {
        axios.get('https://student-api.mycodelibraries.com/api/product/get-product-by-id?id=' + id).then((res) => {
            res.data.data.clothSize = res.data.data.clothSize.split(",")
            this.setState({ obj: { ...res.data.data } })
        })
            .catch((err) => { })
    }
    deleteapi = (id) => {
        axios.delete('https://student-api.mycodelibraries.com/api/product/delete?id=' + id).then((res) => { this.getapi() }).catch((err) => { })
    }
    changeData = (e) => {
        if (e.target.name === 'clothSize') {
            if (e.target.checked) {
                this.state.obj.clothSize =
                    this.state.obj.clothSize ? [...this.state.obj.clothSize, e.target.value] : [e.target.value]
            }
            else {
                this.state.obj.clothSize = this.state.obj.clothSize.filter((x) => x !== e.target.value)
            }
        }
        else {
            this.state.obj[e.target.name] = e.target.value
        }
        this.setState({ obj: { ...this.state.obj } })
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} sm={8} md={6} className="offset-sm-3">
                        <Container fluid='sm' className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
                            <h1 className="text-center py-3">Student Form</h1>
                            <Form onSubmit={this.save}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Category" className="fw-600">
                                                Category
                                            </Label>
                                            <select id='Category' className='form-select'
                                                onChange={this.changeData} name='category'>
                                                <option value='boys' selected={this.state.obj.category?.includes('boys')}>Boys</option>
                                                <option value='girls' selected={this.state.obj.category?.includes('girls')}>Girls</option>
                                                <option value='trans' selected={this.state.obj.category?.includes('trans')}>Trans</option>
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="productName" className="fw-600">
                                                Product Name
                                            </Label>
                                            <Input
                                                id="productName"
                                                name="productName"
                                                placeholder="Product Name"
                                                type="text"
                                                className="main"
                                                onChange={this.changeData}
                                                value={this.state.obj.productName || ''}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="description" className="fw-600 ">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                name="description"
                                                placeholder="description"
                                                type="text"
                                                className="main"
                                                onChange={this.changeData}
                                                value={this.state.obj.description || ''}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="price" className="fw-600 ">
                                                Price
                                            </Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                type="number"
                                                className="main"
                                                onChange={this.changeData}
                                                value={this.state.obj.price || ''}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <Label for="example" className="fw-600 ">
                                            Stock Status
                                        </Label>
                                        <div className="d-flex">
                                            <div>
                                                <Input
                                                    id="radioone"
                                                    name="inStock"
                                                    type="radio"
                                                    className="gender me-2"
                                                    value='inStock'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.inStock?.includes('inStock') || false}
                                                />
                                                <Label
                                                    check
                                                    for="radioone"
                                                    className="px-2"
                                                >
                                                    In Stock
                                                </Label>
                                            </div>
                                            <div>
                                                <Input
                                                    id="radiotwo"
                                                    name="inStock"
                                                    type="radio"
                                                    className="gender me-2"
                                                    onChange={this.changeData}
                                                    value='notInStock'
                                                    checked={this.state.obj.inStock?.includes('notInStock') || false}
                                                />
                                                <Label
                                                    check
                                                    for="radiotwo"
                                                    className="px-2"
                                                >
                                                    Not in Stock
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
                                            Cloth Size
                                        </Label>
                                        <Row className="">
                                            <Col xs={6} md={2}>
                                                <Input
                                                    id="XXL"
                                                    name="clothSize"
                                                    type="checkbox"
                                                    className="me-2"
                                                    value='XXl'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.clothSize?.includes('XXl')}
                                                />
                                                <Label
                                                    check
                                                    for="XXL"
                                                    className="px-2"
                                                >
                                                    XXL
                                                </Label>
                                            </Col>

                                            <Col xs={6} md={2}>
                                                <Input
                                                    id="XL"
                                                    name="clothSize"
                                                    type="checkbox"
                                                    className="me-2"
                                                    value='XL'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.clothSize?.includes('XL')}
                                                />
                                                <Label
                                                    check
                                                    for="XL"
                                                    className="px-2"
                                                >
                                                    XL
                                                </Label>
                                            </Col>

                                            <Col xs={6} md={2}>
                                                <Input
                                                    id="L"
                                                    name="clothSize"
                                                    type="checkbox"
                                                    className="me-2"
                                                    value='L'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.clothSize?.includes('L')}

                                                />
                                                <Label
                                                    check
                                                    for="L"
                                                    className="px-2"
                                                >
                                                    L
                                                </Label>
                                            </Col>
                                            <Col xs={6} md={2}>
                                                <Input
                                                    id="M"
                                                    name="clothSize"
                                                    type="checkbox"
                                                    className="me-2"
                                                    value='M'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.clothSize?.includes('M')}

                                                />
                                                <Label
                                                    check
                                                    for="M"
                                                    className="px-2"
                                                >
                                                    M
                                                </Label>
                                            </Col>

                                            <Col xs={6} md={2}>
                                                <Input
                                                    id="S"
                                                    name="clothSize"
                                                    type="checkbox"
                                                    className="me-2"
                                                    value='S'
                                                    onChange={this.changeData}
                                                    checked={this.state.obj.clothSize?.includes('S')}
                                                />
                                                <Label
                                                    check
                                                    for="S"
                                                    className="px-2"
                                                >
                                                    S
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
                    <h2 className='text-center py-3'>Products</h2>
                    <Row className='g-2'>
                        {this.state.arr.map((x, i) => {
                            return (
                                <Col xs={4} key={i}>
                                    <Card>
                                        <div className='d-flex justify-content-between my-2 card-header'>
                                            <MdDeleteSweep className='me-2 fs-1 text-bg-danger rounded' onClick={() => this.deleteapi(x._id)} />
                                            <FiEdit className='fs-2 text-bg-warning rounded ' onClick={() => this.editFunction(x._id)} />
                                        </div>
                                        <CardBody>
                                            <h1 className='fs-3 fw-1 text-center'>{x.productName}</h1>
                                            <div className='d-flex justify-content-between'>
                                                <h5>Price={x.price}Rs</h5>
                                                <h5>Category={x.category}</h5>
                                            </div>
                                            <div>
                                                <h4>Stock={x.inStock}</h4>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        )
    }
}
export default ProductApi