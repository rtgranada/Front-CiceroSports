import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useGetData from "../../custom-hooks/useGetData";
import { collection, addDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import FileInput from "../components/FormComponents/FileInput";
import "../adminStyles/addCalcados.scss";
import ColorInput from "../components/FormComponents/Grade/ColorInput";
import TamanhoInput from "../components/FormComponents/Grade/TamanhoInput";

const tamanhos = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
// const cores = [
//   { name: "Preto", color: "#000000", value: "preto" },
//   { name: "Branco", color: "#FFFFFF", value: "branco" },
//   { name: "Azul", color: "#0b21ae", value: "azul" },
//   { name: "Rosa", color: "#df96b1", value: "rosa" },
// ];

const AddCalcados = (props) => {
  const { data: brands } = useGetData("brands");
  const { data: cores } = useGetData("colors");
  const { data: formatTypes } = useGetData("pala_padel_formats");
  const { data: categories } = useGetData("category");
  const [enterTitle, setEnterTitle] = useState("");
  const [enterRef, setEnterRef] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterFormat, setEnterFormat] = useState("");
  const [enterBrand, setEnterBrand] = useState("");
  const [enterWeight, setEnterWeight] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterGrade, setEnterGrade] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImages1, setSelectedImages1] = useState(null);
  const [selectedImages2, setSelectedImages2] = useState(null);
  const [selectedImages3, setSelectedImages3] = useState(null);
  const [selectedImages4, setSelectedImages4] = useState(null);
  const [selectedImages5, setSelectedImages5] = useState(null);
  const [selectedImages6, setSelectedImages6] = useState(null);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [urlCapa, setUrlCapa] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    console.log("selectedColor", selectedColor);
  }, [selectedColor]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("props", props.category);
  // }, [props]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  useEffect(() => {
    console.log("images", images);
  }, [images]);

  useEffect(() => {
    console.log("urls", urls);

    if (images.length > 0 && urls.length === images.length) {
      console.log("mesmo tamanho", urls.length);
      addProduct();
    }
  }, [urls]);

  useEffect(() => {
    if (selectedImages1) {
      if (selectedImages1.length > 0) {
        setImages((prevState) => [...prevState, selectedImages1[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 1);
        });
      }
    }
  }, [selectedImages1]);

  useEffect(() => {
    if (selectedImages2) {
      if (selectedImages2.length > 0) {
        setImages((prevState) => [...prevState, selectedImages2[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 2);
        });
      }
    }
  }, [selectedImages2]);

  useEffect(() => {
    if (selectedImages3) {
      if (selectedImages3.length > 0) {
        setImages((prevState) => [...prevState, selectedImages3[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 3);
        });
      }
    }
  }, [selectedImages3]);

  useEffect(() => {
    if (selectedImages4) {
      if (selectedImages4.length > 0) {
        setImages((prevState) => [...prevState, selectedImages4[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 4);
        });
      }
    }
  }, [selectedImages4]);
  useEffect(() => {
    if (selectedImages5) {
      if (selectedImages5.length > 0) {
        setImages((prevState) => [...prevState, selectedImages5[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 5);
        });
      }
    }
  }, [selectedImages5]);
  useEffect(() => {
    if (selectedImages6) {
      if (selectedImages6.length > 0) {
        setImages((prevState) => [...prevState, selectedImages6[0]]);
      } else {
        setImages((current) => {
          return current.filter((file) => file?.numImage !== 6);
        });
      }
    }
  }, [selectedImages6]);

  const addProduct = async (e) => {
    setLoading(true);
    console.log("vou gravar no banco as urls ", urls);
    try {
      const docRef = collection(db, "products");
      const bodyRequest = {
        productName: enterTitle,
        ref: "",
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: props.category,
        brand: enterBrand,
        productType: "",
        format: enterFormat,
        weight: enterWeight,
        nivel: "",
        price: enterPrice,
        imgCapa: urlCapa,
        imgUrl: urls,
        reviews: [],
        avgRating: "",
      };

      console.log("body", bodyRequest);
      await addDoc(docRef, bodyRequest).then((e) => {
        console.log("e", e);
        setLoading(false);
        toast.success("product successfully added!");
        navigate("/dashboard/all-products");
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      toast.error("product not added!");
    }
  };

  const addProductImages = async (e) => {
    e.preventDefault();
    const promises = [];
    try {
      const docRef = collection(db, "products");
      console.log("imagesFuncao", images);
      if (images) {
        images.map((image) => {
          console.log("image", image.name);
          const storageRef = ref(
            storage,
            `productImages/calcados/${enterTitle}/${image?.name}`
          );

          console.log("refff", storageRef);
          const uploadTask = uploadBytesResumable(storageRef, image);
          promises.push(uploadTask);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log("Upload is " + progress + "% done");
              setProgress(progress);
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
              switch (error.code) {
                case "storage/unauthorized":
                  break;
                case "storage/canceled":
                  break;
                case "storage/unknown":
                  break;
                default:
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  if (image.capa) {
                    setUrlCapa(downloadURL);
                  }
                  setUrls((prevState) => [...prevState, downloadURL]);
                }
              );
            }
          );
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("product not added!");
    }
  };
  return (
    <Form onSubmit={addProductImages}>
      <FormGroup className="form__group">
        <span>Nome</span>
        <input
          type="text"
          placeholder="Nome"
          value={enterTitle}
          onChange={(e) => setEnterTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup className="form__group">
        <span>Referencia</span>
        <input
          type="text"
          placeholder="Referencia"
          value={enterRef}
          onChange={(e) => setEnterRef(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup className="form__group">
        <span>Resumo</span>
        <input
          type="text"
          placeholder="Short Description"
          value={enterShortDesc}
          onChange={(e) => setEnterShortDesc(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup className="form__group">
        <span>Descrição</span>
        <input
          type="text"
          placeholder="Description..."
          value={enterDescription}
          onChange={(e) => setEnterDescription(e.target.value)}
          required
        />
      </FormGroup>
      <div className="d-flex align-items-center justify-content-between gap-5">
        <FormGroup className="form__group">
          <span>Preço</span>
          <input
            type="number"
            placeholder="Price"
            value={enterPrice}
            onChange={(e) => setEnterPrice(e.target.value)}
            required
          />
        </FormGroup>
        <>
          {/* <FormGroup className="form__group">
            <span>Formato</span>
            <select
              className="w-100 p-2"
              value={enterFormat}
              onChange={(e) => setEnterFormat(e.target.value)}
              required
            >
              {formatTypes &&
                formatTypes?.map((item, index) => (
                  <option value={item.type} key={index}>
                    {item.title}
                  </option>
                ))}
             
            </select>
          </FormGroup> */}
          <FormGroup className="form__group">
            <span>Marca</span>
            <Input
              type="select"
              className="w-100 p-2"
              value={enterBrand}
              onChange={(e) => setEnterBrand(e.target.value)}
              required
            >
              <option>selecione...</option>
              {brands &&
                brands?.map((item, index) => (
                  <option value={item.type} key={index}>
                    {item.title}
                  </option>
                ))}

              {/* <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option> */}
            </Input>
          </FormGroup>
        </>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-5">
        <div className="col-lg-12 col-md-12 col-12">
          <FormGroup className="form__group">
            <Card>
              <CardHeader>Grade</CardHeader>
              <CardBody>
                <div className="checkbox-group">
                  {cores &&
                    cores.map((cor, index) => (
                      <div className="checkbox-group__single" key={index}>
                        {console.log("cor", cor)}
                        <ColorInput
                          color={cor}
                          selectedColor={selectedColor}
                          setSelectedColor={setSelectedColor}
                        />
                        {/* <label
                          className="checkbox-group__single--label"
                          htmlFor="option1"
                          style={{ backgroundColor: `${cor.color}` }}
                          onClick={() => console.log(`${cor.name}`)}
                        ></label> */}
                      </div>
                    ))}
                </div>

                {selectedColor && (
                  <>
                    <div className="checkbox-group">
                      {console.log("teste", selectedColor)}
                      <TamanhoInput cor={selectedColor} type={"calcados"} />
                    </div>
                  </>
                )}

                {/* <div className="checkbox-group">
                  {tamanhos &&
                    tamanhos.map((number, index) => (
                      <div className="checkbox-group__single" key={index}>
                        <label
                          className="checkbox-group__single--label"
                          htmlFor="option1"
                          onClick={() => console.log(`${number}`)}
                        >
                          {number}
                        </label>
                      </div>
                    ))}
                </div>
                <div className="checkbox-group">
                  {tamanhos &&
                    tamanhos.map((number, index) => (
                      <div className="checkbox-group__single" key={index}>
                        <input
                          type="number"
                          name="options"
                          id="option1"
                          autoComplete="off"
                          onChange={(e) => console.log(e.target.value)}
                        />
                      </div>
                    ))}
                </div> */}
              </CardBody>
            </Card>
          </FormGroup>
        </div>
      </div>
      <div>
        <FormGroup className="form__group">
          <Row>
            <Col lg="3">
              <FileInput
                selectedImages={selectedImages1}
                setSelectedImages={setSelectedImages1}
                numImage={1}
                capa={images?.length === 0 ? true : false}
              />
            </Col>
            {selectedImages1?.length > 0 && (
              <Col lg="3">
                <FileInput
                  selectedImages={selectedImages2}
                  setSelectedImages={setSelectedImages2}
                  numImage={2}
                />
              </Col>
            )}

            {selectedImages2?.length > 0 && (
              <Col lg="3">
                <FileInput
                  selectedImages={selectedImages3}
                  setSelectedImages={setSelectedImages3}
                  numImage={3}
                />
              </Col>
            )}
            {selectedImages3?.length > 0 && (
              <Col lg="3">
                <FileInput
                  selectedImages={selectedImages4}
                  setSelectedImages={setSelectedImages4}
                  numImage={4}
                />
              </Col>
            )}
            {selectedImages3?.length > 0 && (
              <Col lg="3">
                <FileInput
                  selectedImages={selectedImages5}
                  setSelectedImages={setSelectedImages5}
                  numImage={5}
                />
              </Col>
            )}
            {selectedImages3?.length > 0 && (
              <Col lg="3">
                <FileInput
                  selectedImages={selectedImages6}
                  setSelectedImages={setSelectedImages6}
                  numImage={6}
                />
              </Col>
            )}
          </Row>
        </FormGroup>
      </div>
      <progress value={progress} max="100" />
      <button className="buy__btn btn " type="submit">
        Add product
      </button>
    </Form>
  );
};

export default AddCalcados;
