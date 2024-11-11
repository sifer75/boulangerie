import { useState } from "react";
import "./index.css";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
// import { patons } from "./lib/array";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./lib/product.request";
import { DaysState, ProductDetailProps } from "./lib/type";
import DeleteProduct from "./components/DeleteProduct";

function ProductDetail({ product, onClose, open }: ProductDetailProps) {
  const total =
    (product?.mardi ?? 0) +
    (product?.mercredi ?? 0) +
    (product?.jeudi ?? 0) +
    (product?.vendredi ?? 0) +
    (product?.samedi ?? 0) +
    (product?.dimanche ?? 0);

  const patonTotal = total / product.paton;

  return (
    <div
      className={`bg-orange-300 h-full  w-full top-0 p-5  ${
        open ? "opacity-100 left-0 absolute" : "left-full opacity-0 hidden"
      } transform duration-300 ease-in-out`}
    >
      <div className="w-full flex items-center justify-between px-5">
        <Button onClick={onClose}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <UpdateProduct product={product} productId={product.id as number} />
      </div>
      <div className="w-full max-h-full h-fit p-5 gap-10 flex flex-col">
        <h1 className="w-full flex text-center">{product.title}</h1>
        <h2>Semaine:</h2>
        <div className="border-t w-full h-fit">
          <div
            className="w-full h-fit flex flex-col gap-2 p-2"
            key={product.id}
          >
            <div className="flex gap-2">
              <span>mardi: </span>
              <span>{product.mardi}</span>
            </div>
            <div className="flex gap-2">
              <span>mercredi: </span>
              <span>{product.mercredi}</span>
            </div>
            <div className="flex gap-2">
              <span>jeudi:</span>
              <span>{product.jeudi}</span>
            </div>
            <div className="flex gap-2">
              <span>vendredi:</span>
              <span>{product.vendredi}</span>
            </div>
            <div className="flex gap-2">
              <span>samedi:</span>
              <span>{product.samedi}</span>
            </div>
            <div className="flex gap-2">
              <span>dimanche:</span>
              <span>{product.dimanche}</span>
            </div>
          </div>
        </div>
        <div className="border-t w-full h-fit">
          <div className="flex gap-2">
            <span>total:</span>
            <span>{total}</span>
          </div>
          <div className="flex gap-2">
            <span>paton:</span>
            <span>{product.paton}</span>
          </div>
          <div className="flex gap-2">
            <span>NB de paton à produire:</span>
            <span>{patonTotal}</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <DeleteProduct
            title={product.title}
            productId={product.id as number}
          />
        </div>
      </div>
    </div>
  );
}
function App() {
  const [selectedProduct, setSelectedProduct] = useState<DaysState | null>(
    null
  );
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleShowProduct = (product: DaysState) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleCloseSlide = () => setSelectedProduct(null);
  const clearSearch = () => {
    setSearchProduct("");
    setOpen(false);
  };

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });

  if (isError || isLoading) return <div>chargement...</div>;

  const filteredProduct = products.filter(
    (product: DaysState) =>
      product.title &&
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="w-screen h-screen p-5 flex flex-col relative gap-10 bg-blue-500">
      <div className="flex items-center relative w-2/3">
        <Input
          placeholder="Recherche un produit ..."
          className="w-full h-fit"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <Button
          variant="ghost"
          className="absolute right-0 p-2"
          onClick={clearSearch}
        >
          <X />
        </Button>
      </div>
      <CreateProduct />
      <div className="w-full flex h-fit gap-5 flex-wrap">
        {filteredProduct.map((product: DaysState) => (
          <Button
            variant="outline"
            onClick={() => handleShowProduct(product)}
            key={product.id}
          >
            {product.title}
          </Button>
        ))}
      </div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseSlide}
          open={open}
        />
      )}
    </div>
  );
}

export default App;
