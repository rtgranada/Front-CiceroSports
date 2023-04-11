import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../../../firebase.config";
import { ref } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./styles/addpalatype.scss";
import useGetData from "../../../custom-hooks/useGetData";

export const AddPalaTypes = ({ isOpen, setIsOpen, ...props }) => {
  const { data: typesData, loading } = useGetData("pala_padel_formats");
  // console.log("typesData", typesData);

  const [type, setType] = useState("");

  const addType = async (e) => {
    e.preventDefault();
    console.log("e", e);

    try {
      const docRef = collection(db, "pala_padel_formats");

      await addDoc(docRef, {
        title: type,
        type: type.toLowerCase(),
      }).then((e) => {
        console.log("e", e);
        toast.success("Type successfully added!");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}
        className="responsive-modal"
      >
        <ModalHeader className="d-block justify-content-between w-100">
          <div className="d-flex justify-content-between w-100">
            Categoria de raquetes
            <div>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                x
              </span>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="6">
              <h4 className="mb-5">Add Pala Type</h4>
              <Form onSubmit={addType}>
                <FormGroup className="form__group">
                  <span>Product Title</span>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </FormGroup>
                <button className="buy__btn btn " type="submit">
                  Adicionar
                </button>
              </Form>
            </Col>
            <Col lg="6">
              <h4> Tipos:</h4>
              <div className="w-100 messagesArea">
                {typesData &&
                  typesData?.map((item, index) => (
                    <p className="messageItem" key={index}>
                      {item.title}
                    </p>
                  ))}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
