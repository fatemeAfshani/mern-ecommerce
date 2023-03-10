import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailProduct, updateProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ProductEditScreen(props) {
  const { id } = useParams();
  const [Editproduct, setEditProduct] = useState({
    name: "",
    searchName: "",
    images: [""],
    category: "",
    price: "",
    weight: "",
    InStock: "",
    code: "",
    features: [""],
  });

  const [description, setDescription] = useState("");

  const [updateState, setUpdateState] = useState({
    loading: false,
    error: "",
    success: false,
  });
  const [upload, setUplaod] = useState({ loading: false, error: "" });

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    if (updateState.success) {
      props.history.push("/productsList");
    }
    if (!product || product._id !== id) {
      // dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailProduct(id));
    } else {
      setEditProduct({
        name: product.name,
        searchName: product.searchName,
        // images: product.images,
        category: product.category,
        price: product.price,
        InStock: product.InStock,
        features: product.features,
        code: product.code,
        weight: product.weight,
      });
      setDescription(product.description);
    }
  }, [dispatch, product, id, props.history, updateState.success]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "InStock") {
      if (value === "true") {
        setEditProduct({ ...Editproduct, [name]: true });
      } else {
        setEditProduct({ ...Editproduct, [name]: false });
      }
    } else {
      setEditProduct({ ...Editproduct, [name]: value });
    }
  };

  const updateDescription = (editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const { userInfo } = useSelector((state) => state.signin);

  const uploadFilesHandler = async (e) => {
    const files = e.target.files;
    const bodyFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("images", files[i]);
    }

    setUplaod({ ...upload, loading: true });
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setUplaod({ ...upload, loading: false });
      setEditProduct({ ...Editproduct, images: data });
    } catch (error) {
      setUplaod({ loading: false, error: error.message });
    }
  };

  const handleFeatureNameChange = (idx, evt) => {
    const newFeatuers = Editproduct.features.map((feature, sidx) => {
      if (idx !== sidx) return feature;
      return evt.target.value;
    });

    setEditProduct({ ...Editproduct, features: newFeatuers });
  };

  const handleAddFeature = () => {
    const newFeatureDefaultName = "??????????" + (Editproduct.features.length + 1);
    setEditProduct({
      ...Editproduct,
      features: Editproduct.features.concat(newFeatureDefaultName),
    });
  };

  const handleFeatureRemove = (index) => {
    const newFeatures = Editproduct.features.filter(
      (feature, inx) => inx !== index
    );

    setEditProduct({
      ...Editproduct,
      features: newFeatures,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setUpdateState({ ...updateState, loading: true });
    const result = await updateProduct(
      id,
      { ...Editproduct, description },
      userInfo
    );

    if (result.product) {
      setUpdateState({ ...updateState, loading: false, success: true });
    } else {
      setUpdateState({ ...updateState, loading: false, error: result.error });
    }
  };

  return (
    <>
      <form className="form " onSubmit={formHandler}>
        <div>
          <h2>???????????? ??????????</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {updateState.loading && <LoadingBox></LoadingBox>}
        {updateState.error && (
          <MessageBox variant="danger">{updateState.error}</MessageBox>
        )}
        {upload.loading && <LoadingBox></LoadingBox>}
        {upload.error && (
          <MessageBox variant="danger">{upload.error}</MessageBox>
        )}
        <div>
          <label htmlFor="name">??????</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="?????? ???? ???????? ????????"
            required
            value={Editproduct.name}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="searchName">?????? ??????????</label>
          <input
            type="text"
            id="searchName"
            name="searchName"
            placeholder="?????? ????  ???? - ?????? ?????????? ???????? ????????  "
            required
            value={Editproduct.searchName}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="imageFiles">??????</label>
          <input
            type="file"
            id="imageFiles"
            label="?????? ???????? ?????????? ???????????? ????????"
            multiple="multiple"
            onChange={uploadFilesHandler}
          />
        </div>
        <div>
          <label htmlFor="category">???????? ???????? </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="???????? ????????  ???? ???????? ????????"
            required
            value={Editproduct.category}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="price">????????</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="???????? ???????? ????????"
            required
            value={Editproduct.price}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="weight">?????? ??????????</label>
          <input
            type="text"
            id="weight"
            name="weight"
            placeholder="?????? ?????????? ???? ???? ?????? ???????? ????????"
            required
            value={Editproduct.weight}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="code">???? ??????????</label>
          <input
            type="text"
            id="code"
            name="code"
            placeholder="???? ?????????? ???? ???????? ????????"
            required
            value={Editproduct.code}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        {Editproduct.InStock ? (
          <div className="right">?????????? ?????????? ?????????? ??????</div>
        ) : (
          <div className="right">?????????? ???????? ?????????? ????????</div>
        )}
        <div className="radio-input">
          <label htmlFor="InStock">??????????</label>
          <input
            type="radio"
            id="InStock"
            name="InStock"
            required
            value="true"
            onChange={(e) => changeHandler(e)}
          />
        </div>

        <div className="radio-input">
          <label htmlFor="InStock">??????????????</label>
          <input
            type="radio"
            id="InStock"
            name="InStock"
            required
            value="false"
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div>
          <label htmlFor="description">??????????????</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            config={{
              language: {
                ui: "en",
                content: "ar",
              },
            }}
            // onChange={(_, editor) => supdateDescription(editor)}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {}}
            onBlur={(event, editor) => updateDescription(editor)}
            onFocus={(event, editor) => {}}
          />
        </div>
        <div className="right">?????????? ?????? ??????????</div>
        {Editproduct.features.map((feature, index) => (
          <div key={index} className="row">
            <button
              type="button"
              className="stock-btn "
              onClick={() => handleFeatureRemove(index)}
            >
              -
            </button>
            <input
              type="text"
              placeholder={`${index + 1} ${feature}`}
              value={feature}
              onChange={(e) => handleFeatureNameChange(index, e)}
            />
          </div>
        ))}
        <button
          className="table-btn btn"
          type="button"
          onClick={handleAddFeature}
        >
          ???????????? ??????????
        </button>

        <button type="submit" className="btn cart-btn half-btn">
          ?????????? ??????????????{" "}
        </button>
      </form>
    </>
  );
}
