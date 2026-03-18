import react from "react";
import { CDN_url } from "../../util/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../../util/cartSlice";

const ItemList = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        //Dispatch An Action 
        dispatch(addItem(item));
    };
    return (

        <div>

            {items.map((item) => (
                <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex  justify-between items-center-safe">

                    <div>
                        <div className="py -2">
                            <span>{item.card.info.name}</span>
                            <span>- ₹ {item.card.info.price / 100}</span>
                        </div>

                        <p className="text-xs">{item.card.info.description}</p>

                    </div>

                    <div className="w-3/12 p-4 text-center flex justify-center">

                        <div className="relative w-20">

                            <img
                                src={CDN_url + item.card.info.imageId}
                                className="w-20 h-auto rounded-lg"
                            />

                            <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 bg-black text-white px-2 py-1 shadow-lg rounded-md w-20 cursor-pointer"
                            onClick={()=>handleAddItem(item)}
                            
                            >
                                Add +
                            </button>

                        </div>

                    </div>
                </div>
            ))}

        </div>
    );
}

export default ItemList;