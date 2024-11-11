import { useState } from "react";
import "./index.css";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import { patons, weeks } from "./lib/array";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./lib/product.request";
import { DaysState } from "./lib/type";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>("");

  const handleShowProduct = (produit: string) => {
    setSelectedProduct(produit);
  };

  const handleCloseSlide = () => {
    setSelectedProduct(null);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
  });

  if (isError || isLoading) return <div>chargement...</div>;

  const filteredProduct = data.filter((product: DaysState) =>
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
          onClick={() => setSearchProduct("")}
        >
          <X />
        </Button>
      </div>
      <CreateProduct />
      <div className="w-full flex h-fit gap-5 flex-wrap">
        {filteredProduct.map((product: DaysState) => (
          <Button
            variant="outline"
            onClick={() => handleShowProduct(product.title)}
            key={product.id}
          >
            {product.title}
          </Button>
        ))}
      </div>
      <div
        className={`bg-red-500 h-full  w-full top-0 p-5 ${
          selectedProduct
            ? "left-0 translate-x-0 opacity-100 absolute"
            : "left-full opacity-100 hidden"
        }  transform duration-300 ease-in-out`}
      >
        <div className="w-full flex items-center justify-between px-5">
          <Button onClick={handleCloseSlide}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <UpdateProduct title={selectedProduct as string} />
        </div>
        <div className="w-full max-h-full h-fit p-5 gap-10 flex flex-col">
          <h1 className="w-full flex text-center">{selectedProduct}</h1>
          <h2>Semaine</h2>
          <div className="border-t w-full h-fit">
            {weeks.map((week) => (
              <div className="w-full h-fit flex gap-2 p-2" key={week}>
                <h2>{week}:</h2>
                <div>72</div>
              </div>
            ))}
          </div>
          <div className="border-t w-full h-fit">
            {patons.map((paton) => (
              <div className="w-full h-fit flex gap-2 p-2" key={paton}>
                <div>{paton}:</div>
                <div>72</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
