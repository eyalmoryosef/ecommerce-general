import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //handlers
  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  // useEffect(() => {
  //   if (keyword.trim()) {
  //     navigate(`/search/${keyword}`);
  //   } else {
  //     navigate("/");
  //   }
  // }, [keyword, navigate]);
  return (
    <div>
      <Form onSubmit={submitHandler} className='d-inline-flex my-3 '>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder='Search Products'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
