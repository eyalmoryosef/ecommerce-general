//npm packages
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
//components
import Message from "../components/Message";
import Loader from "../components/Loader";

//actions
import { listUsers, deleteUser } from "../actions/userActions";
const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;

  const { success: successDelete } = useSelector((state) => state.userDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successDelete]);
  return (
    <>
      <h1>users:</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped responsive hover bordered className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <span className='center'>&#10003;</span>
                    ) : (
                      <span className='center'>&#10060;</span>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
