import { useState } from "react";
import "./index.css";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateProduct from "./components/CreateProduct";

const products: string[] = [
  "Croissant",
  "Pain au chocolat",
  "Pain au raisin",
  "Roulé praliné",
  "Croissant café",
  "Roulé canelle",
  "Chausson aux pommes",
  "Brioche nature",
  "Brioche choco",
  "Brioche tresse",
  "Babka",
  "Kouign aman",
  "Brioche feuilletée",
] as const;

const weeks: string[] = [
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

const patons: string[] = [
  "Total à produire",
  "Paton",
  "NB patons à produire",
] as const;
function App() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>("");

  const filteredProduct = products.filter((product) =>
    product.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const handleShowProduct = (produit: string) => {
    setSelectedProduct(produit);
  };

  const handleCloseSlide = () => {
    setSelectedProduct(null);
  };

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
        {filteredProduct.map((product) => (
          <Button variant="outline" onClick={() => handleShowProduct(product)}>
            {product}
          </Button>
        ))}
      </div>
      <div
        className={`bg-red-500 h-full absolute w-full top-0 p-5 ${
          selectedProduct
            ? "left-0 translate-x-0 opacity-100"
            : "left-full opacity-100"
        }  transform duration-300 ease-in-out`}
      >
        <Button onClick={handleCloseSlide}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="w-full max-h-full h-full p-5 gap-10 flex flex-col">
          <h1 className="w-full flex text-center">{selectedProduct}</h1>
          <h2>Semaine</h2>
          <div className="border-t w-full h-fit">
            {weeks.map((week) => (
              <div className="w-full h-fit flex gap-2 p-2">
                <h2>{week}:</h2>
                <div>72</div>
              </div>
            ))}
          </div>
          <div className="border-t w-full h-fit">
            {patons.map((paton) => (
              <div className="w-full h-fit flex gap-2 p-2">
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
