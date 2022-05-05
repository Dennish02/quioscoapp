import { useState, useEffect, createContext } from "react";
import axios from "axios";


const QuioscoContext = createContext();



const QuiscoProvider = ({children})=> {
    const [categorias, setCategorias]= useState([]);
    const [categoriaActual, setCategoriaActual]= useState({})
    const [producto, setProducto]= useState({})
    const [modal, setModal]= useState({})    


    const obtenerCategorias = async ()=>{
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(()=>{
        obtenerCategorias()
    }, [])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    }, [categorias])


    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        
    }
  return (
    <QuioscoContext.Provider 
    value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProducto
    }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}
export {
    QuiscoProvider
}
export default QuioscoContext