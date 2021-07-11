import React, { useState, useEffect } from "react";
import { ProductsList } from "../ProductsData/ProductsList";
import { PromoCodes } from "../ProductsData/PromoCodes";

const ListOfProducts = () => {
  console.log(ProductsList);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [enableListOfProducts, setEnableListOfProducts] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setEnableListOfProducts(false);
  }, []);
  const addProduct = (e) => {
    setEnableListOfProducts(true);
    const selectedItems = ProductsList.Products.find((data, index) => {
      if (data.productId === e.target.id) {
        setCount(count + 1);
        return data;
      }
    });

    Object.assign(selectedItems, { count: count });
    selectedProducts.push(selectedItems);
    setSelectedProducts([...new Set(selectedProducts)]);
  };

  const clearProduct = () => {
    setSelectedProducts([]);
    setEnableListOfProducts(false);
  };

  return (
    <div>
      <p>List of products</p>
      <input type="button" onClick={clearProduct} value="Clear the Products" />
      <table>
        <thead>
          <tr>
            <th>PRODUCT ID</th>
            <th>PRODUCT NAME</th>
            <th>PRICE (per month)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ProductsList.Products.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.productId}</td>
                <td>{data.ProductName}</td>
                <td>{data.Price}</td>
                <td>
                  <input
                    type="button"
                    id={data.productId}
                    onClick={addProduct}
                    value="Add"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h4> Also, we currently have these promotion codes: </h4>
      <table>
        <thead>
          <tr>
            <th>PromoCodes</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {PromoCodes.ListOfPromoCodes.map((data) => {
            return (
              <tr>
                <td>{data.Promo} </td>
                <td>{data.Description} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {enableListOfProducts ? (
        <React.Fragment>
          <h2>Added Products</h2>
          <table>
            <thead>
              <tr>
                <td>Products</td>
                <td>PromoCodes</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {selectedProducts &&
                selectedProducts.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {data.count} {data.ProductName}
                      </td>
                      <td>
                        {data.count * data.Price > 5000
                          ? "PLSD123"
                          : data.count * data.Price > 10000
                          ? "PLSD456"
                          : ""}
                      </td>
                      <td>
                        {data.Price > 5000
                          ? (data.count * data.Price) % 10
                          : data.count * data.Price}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListOfProducts;
