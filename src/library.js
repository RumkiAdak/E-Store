const getCategories = async () => {
    const response = await fetch('https://fakestoreapi.in/api/products/category');
    const data = await response.json();
    return data.categories;
  }
  
  const getProducts = async (product_id = null) => {
    try {
    let API = 'https://fakestoreapi.in/api/products';
    if (product_id != null) {
      API += "/" + `/${product_id}`;
    }
  
   
      const response = await fetch(API);
      
  
      const data = await response.json();
  
      return product_id == null ? data.products : data.product; // ✅ return directly
    } catch (err) {
      console.error( err.message);
      return null;
    }
  }
  export { getCategories, getProducts }
  