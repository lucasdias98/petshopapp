import { useState, useEffect } from "react";
import AnimaisContext from "./AnimaisContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Animais() {

    const [listaClientes, setListaClientes] = useState([]); //antibug
    const [listaTipos, setlistaTipos] = useState([]);
    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", tipo: "", idade: "", cliente: "" //antibug
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/animais/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const recuperaAnimais = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/animais`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const recuperaClientes = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes`)
            .then(response => response.json())
            .then(data => setListaClientes(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const recuperaTipos = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/tipos`)
            .then(response => response.json())
            .then(data => setlistaTipos(data))
            .catch(err => console.log('Erro: ' + err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/animais`,
                {
                    method: metodo,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
        }
        recuperaAnimais();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/animais/${objeto.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({
                            "status": json.status,
                            "message": json.message
                        }))
                recuperaAnimais();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    useEffect(() => {
        recuperaClientes();
        recuperaAnimais();
        recuperaTipos();
    }, []);

    return (
        <AnimaisContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaAnimais, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, 
                handleChange, listaClientes, listaTipos
            }
        }>
            <Tabela />
            <Form />

        </AnimaisContext.Provider>
    )

}

export default Animais;