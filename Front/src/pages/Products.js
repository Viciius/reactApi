import React, { Fragment, Component } from "react";
import { getProducts } from './../redux/products/actions';
import { connect } from "react-redux";
import { socket } from './../constants/const';
import {
    Button, Modal, ModalHeader, ModalBody, Input, Row, Col
} from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductForm } from './../components/products/ProductForm';
import { ProductView } from "../components/products/ProductView";

class Products extends Component {

    constructor(props) {
        super();
        this.state = {
            modal: false,
            actualProduct: {},
            action: 'none',

        }

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        socket.on('NEW_CHANGES', (data) => {
            this.props.getProducts(data);
        });

        fetch('http://localhost:3300/api/products',
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(data => {
                return data.json();
            }).then(data => {
                this.props.getProducts(data);
            });
    }

    delete(data) {
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    do(action, data) {
        this.setState({ actualProduct: data, action });
        this.toggle();
    }

    actionTemplate(rowData, Column) {
        return (
            <div>
                <Button color="info" onClick={this.do.bind(this, 'VIEW', rowData)}>Detail</Button>
                {'\u00A0' /* &nbsp; */}
                <Button color="primary" onClick={this.do.bind(this, 'EDIT', rowData)}>Edit</Button>
                {'\u00A0' /* &nbsp; */}
                <Button color="danger" onClick={this.delete.bind(this, rowData)}>Delete</Button>
            </div>
        );
    }

    render() {
        let tableHeader = (
            <div style={{ 'textAlign': 'left' }}>
                <Input onChange={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
            </div>
        );

        return (
            <Fragment>
                <Row>
                    <Col md="12">
                        <Button color="success" onClick={this.do.bind(this, 'REGISTER', {})}
                            className="mb-3 float-right">Register</Button>
                    </Col>

                    <Col md="12">
                        <DataTable value={this.props.products} paginator={true}
                            rows={7} rowsPerPageOptions={[7, 14, 21]}
                            header={tableHeader} globalFilter={this.state.globalFilter}>
                            <Column field="name" header="Name"></Column>
                            <Column field="description" header="Description"></Column>
                            <Column field="price" header="Price"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column body={this.actionTemplate.bind(this)} header="Actions"></Column>
                        </DataTable>
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        {this.state.action} PRODUCT
                    </ModalHeader>
                    <ModalBody>
                        {this.state.action === 'REGISTER' &&
                            <ProductForm onDone={this.toggle}></ProductForm>
                        }
                        {this.state.action === 'EDIT' &&
                            <ProductForm onDone={this.toggle} product={this.state.actualProduct} edit></ProductForm>
                        }
                        {this.state.action === 'VIEW' &&
                            <ProductView product={this.state.actualProduct}></ProductView>
                        }
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ products }, ownProps) => {
    return {
        products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts(products) {
            dispatch(getProducts(products));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)