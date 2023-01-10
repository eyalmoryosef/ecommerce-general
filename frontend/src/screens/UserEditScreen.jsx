//npm packages
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
//components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
//actions
import {
  getUserDetails,
  loginInfoUpdate,
  updateUser,
} from "../actions/userActions";

//constants

import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    loading: loadingDetails,
    error: detailsError,
    user,
  } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: updateError,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
    if (userId === userInfo._id) {
      dispatch(loginInfoUpdate());
    }
  }, [dispatch, user, userId, successUpdate, navigate, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {updateError && <Message variant='danger'>{updateError}</Message>}

        {loadingDetails ? (
          <Loader />
        ) : detailsError ? (
          <Message variant='danger'>{detailsError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {user._id !== userInfo._id && (
              <Form.Group controlId='password' className='my-3'>
                <Form.Check
                  label='Is Admin'
                  type='checkbox'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            )}
            <Button type='submit' variant='primary' className='my-3'>
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
