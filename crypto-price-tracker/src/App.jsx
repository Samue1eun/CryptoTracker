import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [assets, setAssets] = useState([]);
    const [topTenAssets, setTopTenAssets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coincap.io/v2/assets');
                const data = response.data.data;
                const topTenAssets = data.slice(0, 10).map((asset) => ({
                    id: asset.id,
                    rank: asset.rank,
                    name: asset.name,
                    price: parseFloat(asset.priceUsd).toFixed(4),
                    changePercent24Hr: parseFloat(asset.changePercent24Hr).toFixed(2),
                }))
                // const assets = data.map((asset) => ({
                //     rank: asset.rank,
                //     name: asset.name,
                //     price: parseFloat(asset.priceUsd).toFixed(4),
                //     changePercent24Hr: parseFloat(asset.changePercent24Hr).toFixed(2),
                // }))
                setTopTenAssets(topTenAssets);
            } catch (error) {
                console.log('Error fetchin data:', error);
            }
    };
    fetchData();
    }, []);
    
    return (
        <>
        {topTenAssets.map((asset) => (
            <li key={asset.id}>
                Rank - {asset.rank}: {asset.name} - Price: ${asset.price} - Change 24hr: {asset.changePercent24Hr}%
            </li>
        ))}
        </>
    )
}
export default App;