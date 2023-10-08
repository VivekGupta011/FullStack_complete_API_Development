import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(3);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  //const [colors, setColors] = useState([])

  //Filter State
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sort, setSort] = useState(null)


  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products);
  //console.log(productState);
  useEffect(() => {
    let newBrand = [];
    let newCategory = [];
    let newTags = [];
   // let newColors = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrand.push(element?.brand);
      newCategory.push(element?.category);
      newTags.push(element?.tags);
      //newColors.push(element?.color)
    }

    setBrands(newBrand);
    setCategories(newCategory);
    setTags(newTags);
    //setColors(newColors);
  }, [productState]);
  useEffect(() => {
    dispatch(getAllProducts({sort, tag, brand, category, minPrice, maxPrice}));
  }, [dispatch, sort, tag, brand, category, minPrice, maxPrice]);
  const brandSet = new Set(brands);
  const categorySet = new Set(categories);
  const tagsSet = new Set(tags);
//   console.log(brandSet);
//   console.log(categorySet);
//   console.log(tagsSet);
// console.log(sort)
  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categorySet &&
                    Array.from(categorySet).map((categoryItem, index) => (
                      <li key={index} onClick={() => setCategory(categoryItem)}>
                        {categoryItem}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => {setMinPrice(e.target.value)}}
                      value={minPrice}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      min={1}
                      onChange={(e) => {setMaxPrice(e.target.value)}}
                      value={maxPrice}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <div>
                </div>

              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tagsSet &&
                    Array.from(tagsSet).map((tagItem, index) => (
                      <span
                      style={{cursor: "pointer"}}
                        className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize"
                        key={index}
                        onClick={() => setTag(tagItem)}
                      >
                        {tagItem}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {brandSet &&
                    Array.from(brandSet).map((brandItem, index) => (
                      <span
                      style={{cursor: "pointer"}}
                        className="badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize"
                        key={index}
                        onClick={() => setBrand(brandItem)}
                      >
                        {brandItem}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>

                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 w-100">Sort By: </p>
                  <select
                    defaultValue={"manual"}
                    name=""
                    id=""
                    onChange={(e) => { setSort(e.target.value) }}
                    className="form-control form-select"
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproduct mb-0">21 Products</p>
                  <div className="d-flex align-items-center gap-10 grid">
                    <img
                      src="images/gr4.svg"
                      onClick={() => setGrid(3)}
                      className="d-block img-fluid active"
                      alt="grid"
                    />
                    <img
                      src="images/gr3.svg"
                      onClick={() => setGrid(4)}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      src="images/gr2.svg"
                      onClick={() => setGrid(6)}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      src="images/gr.svg"
                      onClick={() => setGrid(12)}
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list pb-5">
              <div className="d-flex flex-wrap gap-10">
                {productState &&
                  productState.map((product) => (
                    <ProductCard
                      products={product}
                      grid={grid}
                      key={product?._id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
