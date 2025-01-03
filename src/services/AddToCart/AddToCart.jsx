import axios from "axios";
const addToCart = async (productId) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage.");
    }

    // Send POST request with the productId, token in Authorization header, and Cookie
    const response = await axios.post(
      "https://api.croslite.com.eg:3001/cart",
      { productId },
      {
        headers: {
          token: token, // Token in Cookie header
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default addToCart;
