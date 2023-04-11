import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { ComponentSpinner } from "../components/Loading/loading";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { data: usersData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "users", id));
    toast.success("usuario deletado");
  };
  return (
    // <Helmet title="Orders">
    //   <ComponentSpinner />
    // </Helmet>
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <ComponentSpinner />
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {usersData?.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <img src={user.photoURL} alt="ss" />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllUsers;
