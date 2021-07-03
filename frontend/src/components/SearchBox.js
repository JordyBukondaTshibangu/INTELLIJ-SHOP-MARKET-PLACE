import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [ keyword, setKeyword ] = useState('')

    const submitHandler = event => {
        event.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit = { submitHandler} inline>
            <Form.Control type='text' value={keyword} placeholder="Search product..." name='q' className='mr-sm-2 ml-sm-5' onChange={e => setKeyword(e.target.value)}></Form.Control>
            <Button type='submit'  vairant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}

export default SearchBox
