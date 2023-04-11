import React, { useState, useEffect } from "react";
import "./styles/admin-add-product.scss";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { ComponentSpinner } from "../components/Loading/loading";
import { AddPalaTypes } from "./components/modal/AddPalaTypes";
import { AddBrand } from "./components/modal/AddBrand";
import useGetData from "../custom-hooks/useGetData";
import AddPadelPala from "./Forms/AddPadelPala";
import AddBeachPala from "./Forms/AddBeachPala";
import AddAcessorios from "./Forms/AddAcessorios";
import AddCalcados from "./Forms/AddCalcados";
import { border } from "@chakra-ui/react";

const AddProducts = () => {
  const { data: brands } = useGetData("brands");
  const { data: formatTypes } = useGetData("pala_padel_formats");
  const { data: categories } = useGetData("category");
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueModalAddPalaTypeOpen, setValueModalAddPalaTypeOpen] =
    useState(false);
  const [valueModalAddBrandOpen, setValueModalAddBrandOpen] = useState(false);

  const navigate = useNavigate();

  const products__info__nav = [
    { function: () => setValueModalAddPalaTypeOpen(true), display: "Add type" },
    { function: () => setValueModalAddBrandOpen(true), display: "Add Brand" },
  ];

  // useEffect(() => {
  //   console.log("pala_padel", enterCategory);
  // }, [enterCategory]);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    //==== Add to firebase =====

    try {
      const docRef = collection(db, "products");
      if (enterProductImg) {
        const storageRef = ref(
          storage,
          `productImages/${Date.now() + enterProductImg?.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
              default:
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                await addDoc(docRef, {
                  productName: enterTitle,
                  ref: "",
                  shortDesc: enterShortDesc,
                  description: enterDescription,
                  category: enterCategory,
                  brand: "",
                  productType: "",
                  format: "",
                  weight: "",
                  nivel: "",
                  price: enterPrice,
                  imgUrl: downloadURL,
                  reviews: [],
                  avgRating: "",
                }).then((e) => {
                  console.log("e", e);
                  setLoading(false);
                  toast.success("product successfully added!");
                  navigate("/dashboard/all-products");
                });
              }
            );
          }
        );
        // setLoading(false);
        // toast.success("product successfully added!");
      } else {
        await addDoc(docRef, {
          productName: enterTitle,
          shortDesc: enterShortDesc,
          description: enterDescription,
          category: enterCategory,
          price: enterPrice,
          imgUrl: "",
        }).then((e) => {
          console.log("e", e);
          setLoading(false);
          toast.success("product successfully added!");
          navigate("/dashboard/all-products");
        });
        // setLoading(false);
        // toast.success("product successfully added!");
      }

      // navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("product not added!");
    }

    // console.log(product);
  };

  return (
    <>
      <AddPalaTypes
        title="Titulo"
        isOpen={valueModalAddPalaTypeOpen}
        setIsOpen={setValueModalAddPalaTypeOpen}
        hasFooter={true}
      />

      <AddBrand
        title="Titulo"
        isOpen={valueModalAddBrandOpen}
        setIsOpen={setValueModalAddBrandOpen}
        hasFooter={true}
      />
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {products__info__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <button type="button" onClick={item.function}>
                      {item.display}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {loading ? (
                <ComponentSpinner />
              ) : (
                <>
                  <h4 className="mb-5">Add product</h4>

                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    style={{ border: `1px solid black` }}
                    required
                  >
                    <option value={`0`}>Selecione...</option>
                    {categories &&
                      categories?.map((item, index) => (
                        <option value={item.type} key={index}>
                          {item.title}
                        </option>
                      ))}
                    {/* <option value="padel_pala">Raquete Padel</option>
                        <option value="beach_pala">Raquete Beach Tenis</option>
                        <option value="roupa">Roupa</option>
                        <option value="acessorio">Acessorio</option> */}
                  </select>
                  {enterCategory && enterCategory === "pala_padel" ? (
                    <AddPadelPala category={enterCategory} />
                  ) : (
                    <></>
                  )}
                  {enterCategory && enterCategory === "acessorios" ? (
                    <AddAcessorios category={enterCategory} />
                  ) : (
                    <></>
                  )}
                  {enterCategory && enterCategory === "pala_beach" ? (
                    <AddBeachPala category={enterCategory} />
                  ) : (
                    <></>
                  )}
                  {enterCategory && enterCategory === "calcados" ? (
                    <AddCalcados category={enterCategory} />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AddProducts;
