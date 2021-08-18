import React from "react";
import { Form, InputGroup } from "react-bootstrap";

function Search({ term, searchKeyword }) {
    return (
        <Form
            className='d-flex flex-row align-items-center justify-content-between'
            autoComplete='off'>
            <InputGroup className='rounded border'>
                <Form.Control
                    type='email'
                    className='py-2 border-0 bg-light'
                    placeholder='Search...'
                    value={term}
                    onChange={(e) => searchKeyword(e.target.value)}
                />
                <span
                    className='d-flex align-items-center justify-content-center input-group-append'
                    style={{
                        cursor: "pointer",
                    }}>
                    <i className='bi-search bg-light p-2'></i>
                </span>
            </InputGroup>
        </Form>
    );
}

export default Search;
