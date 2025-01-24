const { default: axios } = require("axios");

// Create axios client
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // Change baseURL if deployed to production
});

// API methods
const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => resp.data.data);

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => resp.data.data);

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => resp.data.data);

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getCartItems = (userId, jwt) => axiosClient.get(
      `/user-carts?filters[userId][$eq]=${userId}&populate[products][populate][images][fields]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(resp=>{
        const data=resp.data.data
        const cartItemsList=data.map((item,index)=>({
            name: item.products?.[0]?.Name || "No Name",
            quantity: item.quantity || 0, 
            amount: item.amount || 0, 
            image: item.products?.[0]?.images?.[0]?.url || "",
            id: item.id,
            actualPrice: item.products?.[0]?.sellingprice || 0,
        }))
        return cartItemsList
      })


// Export API methods
const GlobalApi = {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
};

export default GlobalApi;
