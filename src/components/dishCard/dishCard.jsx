import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../apis';
import { useState, useContext } from 'react';
import AppContext from "../../AppContext.js";

const DishCard = ({ name, image, description, price }) => {
    const { state } = useContext(AppContext);
    const [qty, setQty] = useState(1);

    const { id } = useParams();

    const handleAddToCart = async () => {
        try {
            const data = await addToCart(state.userDetails.phoneNumber, {
                price,
                qty,
                image,
                restrauntId: id,
                name,
            });
            alert(data.message);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="container mx-auto mt-4 p-6">
            <div className="bg-white shadow-md flex flex-wrap gap-4 rounded-lg overflow-hidden">
                <img src={image} className="w-[22rem] h-48 object-cover" alt={name} />
                <div className="p-4">
                    <h5 className="text-lg mb-3 font-semibold">{name}</h5>
                    <p className="text-gray-600 text-wrap w-[20rem] mb-4 ">{description}</p>
                    <p className="text-red-700">
                        <strong>Price:</strong> ${price}
                    </p>
                </div>
                <div className="m-2">
                    <label className="text-gray-700 m-4 font-medium ">Qty:</label>
                    <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="border border-stone-700 rounded-lg m-2 p-1  "
                    >
                        {[1, 2, 3].map((v) => (
                            <option value={v} key={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                    <div className="m-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-[10rem] bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg "
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DishCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default DishCard;
