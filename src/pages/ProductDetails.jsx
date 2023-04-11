import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
// import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-detail.scss";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const { data: products, loading } = useGetData("products");
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const [brand, setBrand] = useState(null);
  // const product = products.find((item) => item.id === id);

  const docRef = doc(db, "products", id);

  // componentDidUpdate(id) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.id !== prevProps.id) {
  //     this.fetchData(this.props.id);
  //   }
  // }

  useEffect(() => {
    return () => {
      refreshPage();
    };
  }, []);

  useEffect(() => {
    // console.log("mudei");
    setImages([]);
    setActiveImg(null);
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("snap", docSnap.data());
        const brand_id = docSnap.data().brand;
        console.log("brand", brand_id);
        const brandDocRef = doc(db, "brands", brand_id);
        const getBrand = async () => {
          const docBrandSnap = await getDoc(brandDocRef);
          if (docBrandSnap.exists()) {
            setBrand(docBrandSnap.data());
          } else {
            console.log("no brand");
          }
        };

        getBrand();
        setProduct(docSnap.data());
      } else {
        console.log("no product");
      }
    };

    getProduct();
  }, [id]);

  // useEffect(() => {
  //   const brandDocRef = doc(db, "brands", product.brand);
  //   const getBrand = async () => {
  //     const docSnap = await getDoc(brandDocRef);
  //     if (docSnap.exists()) {
  //       setBrand(docSnap.data());
  //     } else {
  //       console.log("no brand");
  //     }
  //   };

  //   getBrand();
  // }, [product]);

  useEffect(() => {
    console.log("brand", brand);
  }, [brand]);

  function refreshPage() {
    window.location.reload(true);
  }

  const {
    imgCapa,
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
  } = product;

  // product &&  brand = useGetData(`brands/${product.brand}`);
  console.log("brand", product);
  // console.log(product);
  // console.log(product?.brand);

  // console.log("produto", product);

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    // console.log(reviewObj);
    toast.success("Review submited");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [product]);

  useEffect(() => {
    if (imgCapa) {
      setActiveImg(imgCapa);
      setImages((prevState) => [...prevState, imgCapa]);
    }
    if (imgUrl) {
      imgUrl.map((item, index) => {
        if (!activeImg && !imgCapa && index === 0) {
          setActiveImg(item);
        }
        if (item !== imgCapa) {
          setImages((prevState) => [...prevState, item]);
        }
      });
    }
  }, [imgUrl]);

  // useEffect(() => {
  //   console.log("images", images);
  // }, [images]);

  // useEffect(() => {
  //   console.log("activeImg", activeImg);
  // }, [activeImg]);

  return (
    <Helmet title={productName}>
      {/* <CommonSection title={productName} /> */}

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6" className="d-flex align-items-center img-detail">
              <Col lg="3" className="">
                <div className="carrosselImgs">
                  {images &&
                    images.map((item, index) => (
                      // console.log("itemJS", item);

                      <img
                        key={index}
                        src={item}
                        alt={productName}
                        className={
                          item === activeImg ? "imgAtiva" : "imgInativa"
                        }
                        onClick={() => setActiveImg(item)}
                      />
                    ))}
                </div>
              </Col>
              <Col lg="9">
                <img src={activeImg} alt={productName} className="imgActived" />
              </Col>
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <p>{brand?.title}</p>
                <div className="product__rating d-flex align-items-center gap-4 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>{/* (<span>{avgRating}</span> ratings) */}</p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">R$ {price}</span>
                  <span>Category: {category?.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-4">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-4">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-4">
                  <div className="review__wrapper">
                    {/* <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Rodrigo</h6>
                          <span>{item?.rating} (rating)</span>
                          <p>{item?.text}</p>
                        </li>
                      ))}
                    </ul> */}
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center rating__group">
                          <motion.span
                            whileTap={{ scale: 1.3 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            <i
                              className={`${
                                rating > 0 ? "ri-star-fill" : "ri-star-line"
                              }`}
                            ></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.3 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            <i
                              className={`${
                                rating > 1 ? "ri-star-fill" : "ri-star-line"
                              }`}
                            ></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.3 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            <i
                              className={`${
                                rating > 2 ? "ri-star-fill" : "ri-star-line"
                              }`}
                            ></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.3 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            <i
                              className={`${
                                rating > 3 ? "ri-star-fill" : "ri-star-line"
                              }`}
                            ></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.3 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            <i
                              className={`${
                                rating > 4 ? "ri-star-fill" : "ri-star-line"
                              }`}
                            ></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Review Message"
                            ref={reviewMsg}
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
