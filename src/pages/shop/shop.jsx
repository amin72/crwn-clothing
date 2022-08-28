import { useState } from "react"
import CollectionPreview from "../../components/collection-preview/collection-preview"
import SHOP_DATA from './data'

const ShopPage = () => {
    const [collections, setCollections] = useState(SHOP_DATA)

    return (
        <div className="shop-page">
            {collections.map(collection => (
                <CollectionPreview
                    key={collection.id}
                    title={collection.title}
                    items={collection.items}
                />
            ))}
        </div>
    )
}

export default ShopPage