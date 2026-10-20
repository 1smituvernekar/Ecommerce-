
import React, { useState } from "react";
import "./Add.css";
import axios from "axios";

const Add = () => {
  const backendUrl = "http://localhost:4000";

  // 1. Store images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // 2. Store product details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestSeller, setBestSeller] = useState("");

  // Store multiple sizes
  const [sizes, setSizes] = useState([]);

  // 3. Select or unselect a size
  const handleSizeChange = (e) => {
    const size = e.target.value;

    if (e.target.checked) {
      setSizes([...sizes, size]);
    } else {
      setSizes(sizes.filter((item) => item !== size));
    }
  };

  // 4. Submit the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!image1 && !image2 && !image3 && !image4) {
        alert("Please upload at least one image");
        return;
      }

      if (sizes.length === 0) {
        alert("Please select at least one size");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);

      // Send all selected sizes together
      formData.append("sizes", JSON.stringify(sizes));

      // Send images
      if (image1) formData.append("images", image1);
      if (image2) formData.append("images", image2);
      if (image3) formData.append("images", image3);
      if (image4) formData.append("images", image4);

      const { data } = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.success) {
        alert("Product added successfully!");

        // Clear the form
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setSubCategory("");
        setBestSeller("");
        setSizes([]);
      } else {
        alert(data.message || "Unable to add product");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="add-div">
      <div className="add">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Images */}
          <label>Upload Images</label>

          <div className="images">
            <div>
              {image1 && (
                <img
                  src={URL.createObjectURL(image1)}
                  alt="Product 1"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage1(e.target.files[0] || null)
                }
              />
            </div>

            <div>
              {image2 && (
                <img
                  src={URL.createObjectURL(image2)}
                  alt="Product 2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage2(e.target.files[0] || null)
                }
              />
            </div>

            <div>
              {image3 && (
                <img
                  src={URL.createObjectURL(image3)}
                  alt="Product 3"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage3(e.target.files[0] || null)
                }
              />
            </div>

            <div>
              {image4 && (
                <img
                  src={URL.createObjectURL(image4)}
                  alt="Product 4"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage4(e.target.files[0] || null)
                }
              />
            </div>
          </div>

          {/* Product details */}
          <div className="fields">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* Sizes */}
            <div className="size-section">
              <label>Choose Sizes</label>

              <div className="size-options">
                {["S", "M", "L", "XL" ,"XXL"].map((size) => (
                  <label key={size} className="size-option">
                    <input
                      type="checkbox"
                      value={size}
                      checked={sizes.includes(size)}
                      onChange={handleSizeChange}
                    />
                    {size}
                  </label>
                ))}
              </div>

              <p>
                Selected sizes: {sizes.join(", ") || "None"}
              </p>
            </div>

            {/* Category */}
            <div>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="MEN">MEN</option>
                <option value="WOMEN">WOMEN</option>
                <option value="KIDS">KIDS</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label>SubCategory</label>
              <select
                value={subCategory}
                onChange={(e) =>
                  setSubCategory(e.target.value)
                }
                required
              >
                <option value="">Select SubCategory</option>
                <option value="topwear">TOPWEAR</option>
                <option value="bottomwear">BOTTOMWEAR</option>
                <option value="winterwear">WINTERWEAR</option>
              </select>
            </div>

            {/* Best seller */}
            <div>
              <label>Best Seller</label>
              <select
                value={bestSeller}
                onChange={(e) =>
                  setBestSeller(e.target.value)
                }
                required
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <button className="btn" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
