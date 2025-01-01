/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
    return (
        <Link to={`/restaurants/${restaurant.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow m-4 p-4">
                <img
                    src={restaurant.image}
                    alt={`${restaurant.name}`}
                    className="rounded-t-lg object-cover w-full h-48"
                />
                <div className="p-4">
                    <h5 className="text-lg font-bold mb-2">{restaurant.name}</h5>
                    <p className="text-gray-700 text-sm">
                        <strong>Phone:</strong> {restaurant.phone} <br />
                        <strong>Email:</strong> {restaurant.email} <br />
                        <strong>Address:</strong> {restaurant.address} <br />
                        <strong>Area:</strong> {restaurant.area}
                    </p>
                </div>
            </div>
        </Link>
    );
};

// PropTypes validation
// RestaurantCard.propTypes = {
//     restaurant: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         email: PropTypes.string,
//         phone: PropTypes.string,
//         address: PropTypes.string.isRequired,
//         area: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default RestaurantCard;

