import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addNewBrand } from '../../services/product'

function AddBrand() {
  const [brand, setBrand] = useState({
    title: "",
    details: ""
  });

  const navigate = useNavigate();

  const onSave = async () => {
    if (brand.title.trim().length === 0) {
      toast.warn('Please enter a title');
    } else if (brand.details.trim().length === 0) {
      toast.warn('Please enter details');
    } else {
      const result = await addNewBrand(brand);
      if (result.status === 200) {
        toast.success('Successfully added a brand');
        navigate(-1);
      } else {
        toast.error(result.error);
      }
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className='container' style={{
        width: "50vw",
        height: "70vh",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "5px 5px 20px grey",
        padding: "10px",
        marginTop: "50px",
      }}>
        <h2 className='header' style={{ color: "#9f9f9f" }}>Add Brand</h2>
        
        <div className='mb-3' style={{ paddingLeft: "30px" }}>
          <label htmlFor='title' className="input-label">Title</label>
          <input
            id="title"
            value={brand.title}
            onChange={(e) => setBrand({ ...brand, title: e.target.value })}
            type='text'
            className='form-control input-field'
          />
        </div>

        <div className='mb-5' style={{ paddingLeft: "30px" }}>
          <label htmlFor='details' className="input-label">Details</label>
          <input
            id="details"
            value={brand.details}
            onChange={(e) => setBrand({ ...brand, details: e.target.value })}
            type='text'
            className='form-control input-field'
          />
        </div>

        <div style={{ width: "100%", textAlign: "center" }}>
          <button onClick={onSave} className='btn btn-success' style={{ width: "70px" }}>
            Save
          </button>
          <button onClick={onCancel} className='btn btn-danger ms-5' style={{ width: "70px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;
