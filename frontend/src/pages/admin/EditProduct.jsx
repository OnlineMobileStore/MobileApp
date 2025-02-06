import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ProductForm.module.css";
import {
  getBrandsList,
  getProductById,
  updateProduct,
} from "../../services/product";

function EditProduct() {
  const [brands, setBrands] = useState([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [brandName, setBrandName] = useState("");
  const [color, setColor] = useState("");
  const [ram, setRam] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [camera, setCamera] = useState("");
  const [storage, setStorage] = useState("");
  const [os, setOs] = useState("");
  const [battery, setBattery] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [primaryImage, setPrimaryImage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    if (!id) {
      toast.error("Invalid product ID");
      navigate(-1);
      return;
    }

    // Fetch brands
    const loadBrands = async () => {
      try {
        const brandsResult = await getBrandsList();
        if (brandsResult.status === 200) {
          setBrands(brandsResult.data);
        }
      } catch (error) {
        toast.error("Failed to load brands");
        console.error("Error fetching brands:", error);
      }
    };

    loadBrands();

    // Fetch product details
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        const product = response.data;
        setTitle(product.title);
        setDetails(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setBrandName(product.brand_name);
        setColor(product.color);
        setRam(product.ram);
        setCamera(product.camera);
        setScreenSize(product.screenSize);
        setStorage(product.storage);
        setOs(product.os);
        setBattery(product.battery);
        setQuantity(product.quantity);
        setPrimaryImage(product.primaryImage);
      } catch (error) {
        toast.error("Failed to load product details");
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Only select the first file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setPrimaryImage(imageUrl); // Update the primary image state with the URL of the first file
    }
  };

  const onSave = async () => {
    if (!title) return toast.warn("Please enter title");
    if (!details) return toast.warn("Please enter details");
    if (!price) return toast.warn("Please enter price");
    if (!brandName) return toast.warn("Please select brand");

    const productData = {
      title,
      description: details,
      price: Number(price),
      discount: Number(discount),
      color: color,
      ram: Number(ram),
      camera: Number(camera),
      storage: Number(storage),
      os,
      battery: Number(battery),
      screenSize: Number(screenSize),
      quantity: Number(quantity),
      primaryImage: primaryImage,
      brand_name: brandName,
    };

    try {
      const result = await updateProduct(id, productData);
      console.log(result);
      if (result.data.status === "success") {
        toast.success("Successfully updated the product");
        navigate(-1);
      } else {
        toast.error(result.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.header} text-center`}>Edit Product</h2>

      <div className="row mb-3">
        <div className="col">
          <label className={styles.label}>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            value={title}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Brand</label>
          <select
            onChange={(e) => setBrandName(e.target.value)}
            className="form-control"
            value={brandName}
          >
            <option value="">Select</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.title}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className={styles.label}>Price (₹)</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="form-control"
            value={price}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className={styles.label}>Discount (%)</label>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            type="number"
            className="form-control"
            value={discount}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Quantity</label>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Color</label>
          <input
            onChange={(e) => setColor(e.target.value)}
            className="form-control"
            value={color}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className={styles.label}>Ram (GB)</label>
          <input
            onChange={(e) => setRam(e.target.value)}
            className="form-control"
            value={ram}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Screen Size (inch)</label>
          <input
            onChange={(e) => setScreenSize(e.target.value)}
            className="form-control"
            value={screenSize}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Camera (MP)</label>
          <input
            onChange={(e) => setCamera(e.target.value)}
            className="form-control"
            value={camera}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className={styles.label}>Storage (GB)</label>
          <input
            onChange={(e) => setStorage(e.target.value)}
            className="form-control"
            value={storage}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Operating System</label>
          <input
            onChange={(e) => setOs(e.target.value)}
            className="form-control"
            value={os}
          />
        </div>
        <div className="col">
          <label className={styles.label}>Battery (mAh)</label>
          <input
            onChange={(e) => setBattery(e.target.value)}
            className="form-control"
            value={battery}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className={styles.label}>Details</label>
          <textarea
            onChange={(e) => setDetails(e.target.value)}
            className="form-control"
            rows="4"
            value={details}
          />
        </div>
      </div>

      <div className="form-group mb-3">
        <label className={styles.label}>Images</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
        <small className="text-muted">Update only primary image.</small>
        {primaryImage && (
          <div className="mt-2">
            <img
              src={primaryImage}
              alt="Preview"
              className="img-fluid"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={onSave} className="btn btn-success me-3">
          Save
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
