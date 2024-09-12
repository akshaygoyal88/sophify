import Link from "next/link";

interface Product {
  node: {
    id: string;
    title: string;
    descriptionHtml: string;
    images: {
      edges: { node: { src: string } }[];
    };
  };
}

interface ProductListProps {
  products: Product[];
}

const nodeSplit = (id: string) => {
  return id.split("/").pop();
};
export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-grid">
      {products.map(({ node }) => (
        <Link href={`/product-details/${nodeSplit(node.id)}`}>
          <div className="product-item" key={node.id}>
            {/* <div dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} /> */}
            {node.images.edges.length > 0 && (
              <img src={node.images.edges[0].node.src} alt={node.title} />
            )}
            <h2>{node.title}</h2>
          </div>
        </Link>
      ))}

      <Link href={"/create-product"}>
        <button
          type="button"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Variant
        </button>
      </Link>
    </div>
  );
}
