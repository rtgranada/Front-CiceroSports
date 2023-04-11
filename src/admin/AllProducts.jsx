import React from "react";
import "./styles/admin-all-products.scss";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { ComponentSpinner } from "../components/Loading/loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");
  console.log("products", productsData);
  const deleteProduct = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "products", id));
    toast.success("item deletado");
  };
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {loading ? (
                <ComponentSpinner />
              ) : productsData.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productsData?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {console.log("item", item)}
                          <img src={item.imgCapa} alt="imgChair" />
                        </td>
                        <td>
                          <Link to={`/shop/${item?.id}`}>
                            {item?.productName}
                          </Link>
                        </td>
                        <td>{item.category}</td>
                        <td>{`R$ ${item.price}`}</td>
                        <td>
                          <button
                            onClick={() => {
                              deleteProduct(item.id);
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
              ) : (
                <h4>Nenhum registro encontrado</h4>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllProducts;
