import { useContext, useEffect, useState } from 'react';
import RestaurantCard from "../../components/restaurantCard/restaurantCard";
import AppContext from '../../AppContext';
import { getAllRestaurantsAPI } from "../../apis"

const Home = () => {
    const { state } = useContext(AppContext); // Corrected the useContext syntax

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const loadRestaurants = async () => {
            const data = await getAllRestaurantsAPI();
            setRestaurants(data);
        };
        if (state.isAuthenticated) {
            loadRestaurants();
        } else {
            setRestaurants([]);
        }
    }, [state.isAuthenticated]);
    return (
        <>

            <div className="flex flex-wrap justify-center  ">
                {restaurants.map((v, index) => (
                    <RestaurantCard key={index} restaurant={v} className="flex flex-wrap m-4" />
                ))}
                {restaurants.length === 0 && <div className="relative h-screen w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/xsjpdoigqavpl2wb9bub')" }}>
                    <h3 className="absolute z-10 text-cyan-300 font-serif m-7 italic font-medium text-4xl ">Sign In To See the Restaurants</h3>
                </div>}

            </div>
        </>

    );
};

export default Home;
