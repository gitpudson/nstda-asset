import { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const url_api_backend = "https://script.google.com/macros/s/AKfycbyg6MlP1rcgNjTaWgob_GZyQS4WiJfE56-nSmhkuk2AgAwUwK8tUeFE1LKIFAfgH5ryzA/exec";


    const [dataBuilding,setDataBuilding] = useState([]);
    const [menu_building, setMenuBuilding] = useState("");
    const [isLoading,setIsLoading] = useState(true)


    const fetAllBuilding = async () => {
        const post = {
            function: 'getAllBuilding',
            payload: {

            }
        }

        setIsLoading(true)
        const response = await axios.post(`${url_api_backend}`, post,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
                mode: "no-cors"
            }
        )

        if (response.data.success) {
            setDataBuilding(response.data.data);
            setIsLoading(false)
            console.log(response.data.data);
        }

    }

    const fetAssetByAssetCode = async (qrcode) => {
        console.log(qrcode);
        
        const post = {
            function: 'getAssetByAssetCode',
            payload: {
                "asset_code": qrcode
            }
        }

        const response = await axios.post(`${url_api_backend}`, post,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
                mode: "no-cors"
            }
        )

        if (response.data.success) {
            // console.log(response.data.data.person_name);
           return response.data.data;
        }

    }


    useEffect(() => {
        fetAllBuilding();  
       
    },[])



    const contextValue = {
        url_api_backend,
        isLoading,
        dataBuilding,
        menu_building,
        setMenuBuilding,
        fetAssetByAssetCode
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider