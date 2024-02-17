import { useState } from "react";
import styled from "styled-components";
import { Button, Container, Form, Table } from "react-bootstrap";
import "/src/App.css";
import { nanoid } from "nanoid";
import IconButton from "./components/IconButton";
import Fuse from "fuse.js";

const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "Bim" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 12px;
  padding: 24px;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedShop, setselectedShop] = useState(shops[0].id);
  const [selectedCategory, setselectedCategory] = useState(categories[0].id);
  const [filterShop, setFilterShop] = useState("all");
  const [filterCategory, setfilterCategory] = useState("all");
  const [filterIsbought, setfilterIsbought] = useState(null);
  const [filterProductName, setfilterProductName] = useState("");
  const filteredProducts = products.filter((product) => {
    let result = true;

    //isbought
    let myProductBought = product.isBought;
    if (filterIsbought === true) {
      result = result && myProductBought === true;
    }
    if (filterIsbought === false) {
      result = result && myProductBought !== true;
    }

    // name
    if (filterProductName !== "") {
      const fuse = new Fuse(products, { keys: ["name"] });
      const isIncluded = fuse
        .search(filterProductName)
        .find((p) => p.item.id === product.id);
      result = result && isIncluded;
    }

    // shop
    if (filterShop !== "all") {
      const isIncluded = product.shop == filterShop;
      result = result && isIncluded;
    }

    // category
    if (filterCategory !== "all") {
      const isIncluded = product.category == filterCategory;
      result = result && isIncluded;
    }

    return result;
  });

  return (
    <>
      <Container>
        {/* Ürün Ekleme */}
        <section className="mt-3">
          <h2>Ürün Ekle</h2>
          <Form className="bg-warning">
            <InputWrapper>
              <Form.Control
                placeholder="Ürün Adı Giriniz"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                value={productName}
              />
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setselectedShop(e.target.value);
                }}
                value={selectedShop}
              >
                <option>Bir Seçim Yapınız</option>
                {shops.map((shop) => (
                  <option value={shop.id} key={shop.id}>
                    {shop.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setselectedCategory(e.target.value);
                }}
                value={selectedCategory}
              >
                <option>Open this select menu</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Button
                variant="success"
                onClick={() => {
                  const product = {
                    name: productName,
                    category: selectedCategory,
                    shop: selectedShop,
                    isBought: false,
                    id: nanoid(),
                  };
                  setProducts([...products, product]);
                }}
              >
                Ekle
              </Button>
            </InputWrapper>
          </Form>
        </section>
        {/* Filtreleme */}
        <section className="mt-3">
          <h2>Ürün Filtrele</h2>
          <Form>
            <InputWrapper className="bg-success  text-white ">
              <div key={`default-radio`} className="d-flex p-0">
                <Form.Check // prettier-ignore
                  className="mx-auto me-3"
                  type={"radio"}
                  id={`default-radio`}
                  label={`Satın Alındı`}
                  name="isbought"
                  defaultChecked={filterIsbought === true}
                  onClick={() => {
                    setfilterIsbought(true);
                  }}
                />
                <Form.Check // prettier-ignore
                  className="mx-auto me-3"
                  type={"radio"}
                  id={`default-radio`}
                  label={`Satın Alınmadı`}
                  name="isbought"
                  defaultChecked={filterIsbought === false}
                  onClick={() => {
                    setfilterIsbought(false);
                  }}
                />
                <Form.Check // prettier-ignore
                  className="mx-auto me-3"
                  type={"radio"}
                  id={`default-radio`}
                  label={`Tümü`}
                  name="isbought"
                  defaultChecked={filterIsbought === null}
                  onClick={() => {
                    setfilterIsbought(null);
                  }}
                />
              </div>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setFilterShop(e.target.value);
                }}
                value={filterShop}
              >
                <option value={"all"}>Tümü</option>
                {shops.map((shop) => (
                  <option value={shop.id} key={shop.id}>
                    {shop.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setfilterCategory(e.target.value);
                }}
                value={filterCategory}
              >
                <option value={"all"}>Tümü</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
                ;
              </Form.Select>
              <Form.Control
                placeholder="Aranılacak Ürün"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => {
                  setfilterProductName(e.target.value);
                }}
                value={filterProductName}
              />
            </InputWrapper>
          </Form>
        </section>
        {/* Tablo Oluşturma */}
        <section className="mt-3">
          <h2>Ürün Listesi</h2>
          <Table striped hover bordered variant="success">
            <thead>
              <tr>
                <td>Ürün İsmi</td>
                <td>Market</td>
                <td>Kategori</td>
                <td>Sil</td>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  style={{
                    textDecoration: product.isBought ? "line-through" : "unset",
                  }}
                  onClick={() => {
                    let copyProducts = [...products];
                    copyProducts = copyProducts.map((copyProduct) => {
                      if (copyProduct.id === product.id) {
                        copyProduct.isBought = !copyProduct.isBought;
                      }
                      return copyProduct;
                    });
                    if (
                      copyProducts.every((product) => product.isBought === true)
                    ) {
                      alert("Alışveriş Tamamlandı");
                    }
                    setProducts(copyProducts);
                  }}
                  key={product.id}
                >
                  <td>{product.name}</td>
                  <td>{shops.find((shop) => shop.id == product.shop)?.name}</td>
                  <td>
                    {
                      categories.find(
                        (category) => category.id == product.category
                      )?.name
                    }
                  </td>
                  <td
                    onClick={(e) => {
                      e.stopPropagation();
                      const filteredProducts = products.filter(
                        (currentProduct) => currentProduct.id !== product.id
                      );
                      setProducts(filteredProducts);
                    }}
                    className="text-center"
                  >
                    <IconButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </Container>
    </>
  );
}

export default App;
