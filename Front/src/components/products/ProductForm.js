import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { PRODUCT, stateToModel } from '../../constants/models';
import { socket, API } from "../../constants/const";
import { headers } from './../../constants/const';


export class ProductForm extends Component {

    constructor(props) {
        super();
        this.state = { ...PRODUCT, ...props.product }
        console.log(this.state);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validateProduct(action) {
        let product = stateToModel(this.state, PRODUCT);
        fetch(`${API}/products/${action}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({product, _id:this.state._id})
            }).then(data => {
                return data.json();
            }).then(data => {
                socket.emit('PRODUCT_CHANGES');
                this.props.onDone();
            });
    }

    render() {

        return (
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" value={this.state.name}
                        onChange={this.handleInput.bind(this)} placeholder="Product Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" value={this.state.description}
                        onChange={this.handleInput.bind(this)} placeholder="Product Description" />
                </FormGroup>
                <FormGroup>
                    <Label for="category">Category</Label>
                    <Input type="text" name="category" value={this.state.category}
                        onChange={this.handleInput.bind(this)} placeholder="Product Category" />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" name="price" value={this.state.price}
                        onChange={this.handleInput.bind(this)} placeholder="Product Price" />
                </FormGroup>
                {this.props.edit &&
                    <Button color="success" className="float-right"
                        onClick={this.validateProduct.bind(this, 'modify')}>Modify</Button>
                }
                {!this.props.edit &&
                    <Button color="success" className="float-right"
                        onClick={this.validateProduct.bind(this, 'add')}>Save</Button>
                }
            </Form>
        );
    }
}
