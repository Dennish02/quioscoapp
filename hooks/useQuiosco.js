import { useContext } from "react";
import QuioscoContext from "../context/QuiscoProvider";


const useQuiosco = ()=>{
    return useContext(QuioscoContext);
}

export default useQuiosco;
