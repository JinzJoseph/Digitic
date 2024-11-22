// import React, { useEffect, useState } from "react";
// import BrreadCrumb from "../components/BrreadCrumb";
// import Meta from "../components/Meta";
// import ReactStars from "react-rating-stars-component";
// import watch from "../assets/watch.jpg";
// import grid1 from "../assets/gr.svg";
// import grid2 from "../assets/gr2.svg";
// import grid3 from "../assets/gr3.svg";
// import grid4 from "../assets/gr4.svg";
// import ProductCard from "../components/ProductCard";
// import Color from "../components/Color";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { getAllProducts } from "../features/product/productSlice";
// const OurStore = () => {
//   const dispatch = useDispatch();

//   const [grid, setGrid] = useState(4);

//   useEffect(() => {
//     getProducts();
//   }, []);
//   const productData = useSelector((state) => state?.products?.products);
//   const [brands, setbrands] = useState([]);
//   const [categories, setcategories] = useState([]);
//   const [tags, settags] = useState([]);
//   const [colors, setcolors] = useState([]);
//   //filter states
//   const [tag, setTag] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [brand, setbrand] = useState([]);
//   const [color, setcolor] = useState([]);
//   const [minPrice, setMinPrice] = useState(null);
//   const [maxPrice, setMaxPrice] = useState(null);
//   const [sort, setsort] = useState(null);
//   useEffect(() => {
//     let newBrands = [];
//     let category = [];
//     let newtags = [];
//     let newColor = [];
//     for (let index = 0; index < productData.length; index++) {
//       const element = productData[index];
//       newBrands.push(element.brand);
//       category.push(element.category);
//       newtags.push(element.tags);
//       newColor.push(element.color);
//     }
//     setbrands(newBrands);
//     setcategories(category);
//     settags(newtags);
//     setcolors(newColor);
//   }, [productData]);
//   const getProducts = () => {
//     dispatch(
//       getAllProducts({
//         sort,
//         tag,
//         brand,
//         category,
//         minPrice,
//         maxPrice,
//       })
//     );
//   };
//   console.log(...new Set(brands))
//   return (
//     <>
//       <Meta title={" Our Store"} />
//       <BrreadCrumb title="Our Store" />
//       <div className="store-wrapper py-5 home-wrapper-2">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-3">
//               <div className="filter-card  mb-3">
//                 <h3 className="filter-title">Shop By Categories</h3>
//                 <div>
//                   <ul className="ps-0">
//                     {brands &&
//                       [...new Set(brands)]?.map((item, index) => {
//                         return (
//                           <li key={index} onClick={() => settags(item)}>
//                             {item}
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </div>
//               </div>
//               <div className="filter-card mb-3">
//                 <h3 className="filter-title">Filter By</h3>
//                 <div>
//                   <h5 className="sub-title">Availbilty</h5>
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       value=""
//                       id=""
//                     />
//                     <label htmlFor="" className="form-check-label">
//                       In Stock(1)
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       value=""
//                       id=""
//                     />
//                     <label htmlFor="" className="form-check-label">
//                       Out of Stock(0)
//                     </label>
//                   </div>
//                   <h5 className="sub-title mt-3">Price</h5>
//                   <div className="d-flex justify-content-between gap-15">
//                     <div className="form-floating mb-3">
//                       <input
//                         type="number"
//                         className="form-control"
//                         id="floatingInput"
//                         placeholder="name@example.com"
//                         onChange={(e) => setMinPrice(e.target.value)}
//                       />
//                       <label for="floatingInput">From</label>
//                     </div>
//                     <div class="form-floating mb-3">
//                       <input
//                         type="number"
//                         class="form-control"
//                         id="floatingInput"
//                         placeholder="name@example.com"
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                       />
//                       <label for="floatingInput">To</label>
//                     </div>
//                   </div>
//                   <h5 className="sub-title mt-3">Colors</h5>
//                   <div className="d-flex flex-wrap">{/* <Color  /> */}</div>
//                   <h5 className="sub-title mt-3">Size</h5>
//                   {/* <div>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         value=""
//                         id=""
//                       />
//                       <label htmlFor="" className="form-check-label">
//                         S (2)
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         value=""
//                         id="color-1"
//                       />
//                       <label htmlFor="" className="form-check-label">
//                         S (2)
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         value=""
//                         id="color-2"
//                       />
//                       <label htmlFor="" className="form-check-label">
//                         H (2)
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         value=""
//                         id="colo"
//                       />
//                       <label htmlFor="" className="form-check-label">
//                         L (2)
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         value=""
//                         id="colo"
//                       />
//                       <label htmlFor="" className="form-check-label">
//                         M (2)
//                       </label>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//               <div className="filter-card mb-3">
//                 <h3 className="filter-title">Product Tags</h3>
//                 <div className="product-tags d-flex flex-wrap align-items-center gap-10">
//                   {tags &&
//                     [...new Set(tags)].map((item, index) => {
//                       return (
//                         <span
//                           className="badge bg-secondary rounded-3 py-2 px-3"
//                           key={index}
//                           onClick={() => setTag(item)}
//                         >
//                           {item}
//                         </span>
//                       );
//                     })}
//                 </div>
//               </div>
//               <div className="filter-card mb-3">
//                 <h3 className="filter-title">Product Brands</h3>
//                 <div className="product-tags d-flex flex-wrap align-items-center gap-10">
//                   {brands &&
//                     [...new Set(brands)].map((item, index) => {
//                       return (
//                         <span
//                           className="badge bg-secondary rounded-3 py-2 px-3"
//                           key={index}
//                           onClick={() => setbrand(item)}
//                         >
//                           {item}
//                         </span>
//                       );
//                     })}
//                 </div>
//               </div>
//               <div className="filter-card mb-3">
//                 <h3 className="filter-title">Random Product</h3>
//                 <div>
//                   <div className="random-products d-flex mt-2">
//                     <div className="w-50">
//                       <img src={watch} className="img-fluid" alt="" />
//                     </div>
//                     <div className="w-50">
//                       <h6>
//                         Kids Headphones bulk 10 pack multi colored for students
//                       </h6>

//                       <ReactStars
//                         count={5}
//                         edit={false}
//                         value="3"
//                         size={24}
//                         activeColor="#ffd700"
//                       />
//                       <b>$300</b>
//                     </div>
//                   </div>
//                   <div className="random-products d-flex mt-2">
//                     <div className="w-50">
//                       <img src={watch} className="img-fluid" alt="" />
//                     </div>
//                     <div className="w-50">
//                       <h6>
//                         Kids Headphones bulk 10 pack multi colored for students
//                       </h6>

//                       <ReactStars
//                         count={5}
//                         edit={false}
//                         value="3"
//                         size={24}
//                         activeColor="#ffd700"
//                       />
//                       <b>$300</b>
//                     </div>
//                   </div>
//                   <div className="random-products d-flex mt-2">
//                     <div className="w-50">
//                       <img src={watch} className="img-fluid" alt="" />
//                     </div>
//                     <div className="w-50">
//                       <h6>
//                         Kids Headphones bulk 10 pack multi colored for students
//                       </h6>

//                       <ReactStars
//                         count={5}
//                         edit={false}
//                         value="3"
//                         size={24}
//                         activeColor="#ffd700"
//                       />
//                       <b>$300</b>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-9">
//               <div className="filter-sort-grid mb-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div className="d-flex gap-10 align-items-center">
//                     <p className="mb-0"> Sort By:</p>
//                     <select
//                       name="
// "
//                       onChange={(e) => setsort(e.target.value)}
//                       className="slect-option py-2 "
//                       style={{ backgroundColor: "#77777" }}
//                       id=""
//                     >
//                       <option value="title">Alphabetically,A-Z</option>
//                       <option value="-title">Alphabetically,Z-A</option>
//                       <option value="price">price,Low - High</option>
//                       <option value="-price">price,Hign - Low</option>
//                       <option value="createdAt">Date,old to new</option>
//                       <option value="-createdAt">Date,New to Old</option>
//                     </select>
//                   </div>
//                   <div className="d-flex align-items-center grid gap-10">
//                     <p className="mb-0 totalproducts">21 Products</p>
//                     <div className="d-flex gap-10 align-items-center">
//                       <img
//                         src={grid4}
//                         className="d-block img-fluid"
//                         alt=""
//                         onClick={() => setGrid(12)}
//                       />
//                       <img
//                         src={grid3}
//                         className="d-block img-fluid"
//                         alt=""
//                         onClick={() => setGrid(6)}
//                       />
//                       <img
//                         src={grid2}
//                         className="d-block img-fluid"
//                         alt=""
//                         onClick={() => setGrid(4)}
//                       />

//                       <img
//                         src={grid1}
//                         className="d-block img-fluid"
//                         alt=""
//                         onClick={() => setGrid(2)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="products-list pb-5">
//                 <div className="d-flex flex-wrap gap-10">
//                   <ProductCard grid={grid} data={productData} />
//                   {/* <ProductCard grid={grid} /> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OurStore;
import React, { useEffect, useState } from "react";
import BrreadCrumb from "../components/BrreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import watch from "../assets/watch.jpg";
import grid1 from "../assets/gr.svg";
import grid2 from "../assets/gr2.svg";
import grid3 from "../assets/gr3.svg";
import grid4 from "../assets/gr4.svg";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllProducts } from "../features/product/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);

  // States for filters
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState("");

  const productData = useSelector((state) => state?.products?.products || []);

  // Fetch products and apply filters
  useEffect(() => {
    dispatch(
      getAllProducts({
        sort,
        tag,
        brand,
        category,
        minPrice,
        maxPrice,
      })
    );
  }, [sort, tag, brand, category, minPrice, maxPrice, dispatch]);
  console.log(categories);
  // Extract unique filter options from products
  useEffect(() => {
    const uniqueBrands = [...new Set(productData.map((item) => item.brand))];
    const uniqueCategories = [
      ...new Set(productData.map((item) => item.category)),
    ];
    const uniqueTags = [...new Set(productData.map((item) => item.tags))];
    const uniqueColors = [...new Set(productData.map((item) => item.color))];

    setBrands(uniqueBrands);
    setCategories(uniqueCategories);
    setTags(uniqueTags);
    setColors(uniqueColors);
  }, [productData]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BrreadCrumb title="Our Store" />
      <div className="store-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <ul className="ps-0">
                  {categories.map((item, index) => (
                    <li key={index} onClick={() => setCategory(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">In Stock (1)</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Out of Stock (0)</label>
                  </div>

                  <h5 className="sub-title mt-3">Price</h5>
                  <div className="d-flex justify-content-between gap-15">
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label>From</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label>To</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div className="product-tags d-flex flex-wrap gap-10">
                  {tags.map((item, index) => (
                    <span
                      className="badge bg-secondary rounded-3 py-2 px-3"
                      key={index}
                      onClick={() => setTag(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Brands</h3>
                <div className="product-tags d-flex flex-wrap gap-10">
                  {brands.map((item, index) => (
                    <span
                      className="badge bg-secondary rounded-3 py-2 px-3"
                      key={index}
                      onClick={() => setBrand(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Products Section */}
            <div className="col-9">
              <div className="filter-sort-grid mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-10 align-items-center">
                    <p className="mb-0"> Sort By:</p>
                    <select
                      name="
 "
                      onChange={(e) => setSort(e.target.value)}
                      className="slect-option py-2 "
                      style={{ backgroundColor: "#77777" }}
                      id=""
                    >
                      <option value="title">Alphabetically,A-Z</option>
                      <option value="-title">Alphabetically,Z-A</option>
                      <option value="price">price,Low - High</option>
                      <option value="-price">price,Hign - Low</option>
                      <option value="createdAt">Date,old to new</option>
                      <option value="-createdAt">Date,New to Old</option>
                    </select>{" "}
                  </div>
                  <div className="d-flex align-items-center grid gap-10">
                    <p className="mb-0 totalproducts">21 Products</p>
                    <div className="d-flex gap-10 align-items-center">
                      <img
                        src={grid4}
                        className="d-block img-fluid"
                        alt=""
                        onClick={() => setGrid(12)}
                      />
                      <img
                        src={grid3}
                        className="d-block img-fluid"
                        alt=""
                        onClick={() => setGrid(6)}
                      />
                      <img
                        src={grid2}
                        className="d-block img-fluid"
                        alt=""
                        onClick={() => setGrid(4)}
                      />

                      <img
                        src={grid1}
                        className="d-block img-fluid"
                        alt=""
                        onClick={() => setGrid(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex flex-wrap gap-10">
                  <ProductCard grid={grid} data={productData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
