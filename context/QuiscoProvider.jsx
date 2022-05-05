import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const QuioscoContext = createContext();



const QuiscoProvider = ({children})=> {
    const [categorias, setCategorias]= useState([]);
    const [categoriaActual, setCategoriaActual]= useState({})
    const [producto, setProducto]= useState({})
    const [modal, setModal]= useState(false)    
    const [pedido, setPedido] = useState([])
    const router = useRouter()
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState('')


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

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto)=> (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        setModal(!modal)
    }
    const handleAgregarPedido = ({categoriaID, ...producto})=>{

        if(pedido.some(productoState => productoState.id === producto.id)){
               //Actualizar cantidad
               const pedidoActualizado = pedido.map(productoState=> productoState.id === producto.id?
                producto : productoState)
                setPedido(pedidoActualizado)
                toast.success('Pedido Actualizado')
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
       setModal(false)
    }

    const handleEditarCantidades = (id)=>{
       const prroductoActualizar = pedido.filter( producto => producto.id === id)
       setProducto(prroductoActualizar[0])
        setModal(!modal)
    }
    const handleEliminarProducto = id => {
        const prroductoEliminar = pedido.filter( producto => producto.id !== id)
        setPedido(prroductoEliminar)

    }
    const colocarOrden = async (e)=>{
        e.preventDefault()
        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })
            setNombre('')
            setTotal('')
            setPedido([])
            setCategoriaActual(categorias[0])
            toast.success('Pedido Enviado')
            setTimeout(()=>{
                router.push('/')
            },2000)
        } catch (error) {
            console.log(error)
        }

     }
  return (
    <QuioscoContext.Provider 
    value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
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