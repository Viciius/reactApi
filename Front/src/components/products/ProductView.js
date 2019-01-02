import React, {Fragment} from 'react'
import { FormGroup, Label } from "reactstrap";

export const ProductView = ({product}) => {
    return (
        <Fragment>
            <FormGroup>
                <Label className="font-weight-bold mr-1">Name: </Label>
                <Label>{product.name}</Label>
            </FormGroup>
            <FormGroup>
                <Label className="font-weight-bold mr-1">Description: </Label>
                <Label>{product.description}</Label>
            </FormGroup>
            <FormGroup>
                <Label className="font-weight-bold mr-1">Category: </Label>
                <Label>{product.category}</Label>
            </FormGroup>
            <FormGroup>
                <Label className="font-weight-bold mr-1">Price: </Label>
                <Label>{product.price}</Label>
            </FormGroup>
        </Fragment>
    );
}