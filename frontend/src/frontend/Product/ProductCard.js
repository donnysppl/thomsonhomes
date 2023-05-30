import Common from "../../Common"

export default function ProductCard({item}) {

    const { nodeurl } = Common();

    return (
        <>
            <div className="product-card position-relative overflow-hidden">
                <svg className="product-top-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#D0021B" d="M47.3,-24.4C50.4,-5.7,34.7,10.2,14.8,25.9C-5,41.6,-28.9,57.1,-42.8,49.3C-56.6,41.5,-60.4,10.3,-51.6,-16.2C-42.8,-42.7,-21.4,-64.5,0.3,-64.6C22.1,-64.7,44.1,-43.1,47.3,-24.4Z" transform="translate(100 100)" />
                </svg>
                <div className="product-card-img-part">
                    <img src={item.mainproductimg} alt={item.slug} className="img-fluid" />
                </div>
                <div className="product-card-text-part mt-4">
                    <h4>{item.name}</h4>
                </div>
                <svg className="product-bottom-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#D0021B" d="M47.3,-24.4C50.4,-5.7,34.7,10.2,14.8,25.9C-5,41.6,-28.9,57.1,-42.8,49.3C-56.6,41.5,-60.4,10.3,-51.6,-16.2C-42.8,-42.7,-21.4,-64.5,0.3,-64.6C22.1,-64.7,44.1,-43.1,47.3,-24.4Z" transform="translate(100 100)" />
                </svg>
            </div>
        </>
    )
}
