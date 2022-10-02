import { useContext } from "react";
import Alerta from "../../Alerta";
import AnimaisContext from "./AnimaisContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta,
        listaClientes, listaTipos } = useContext(AnimaisContext);

    (() => {
        //'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <Dialogo id="modalEdicao" titulo="Animal" idform="formulario"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} tamanho={5}
                msgvalido=""
                msginvalido="" />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo nome OK"
                msginvalido="Campo nome é obrigatório" />
            <CampoEntrada id="txtIdade" label="Idade" tipo="text"
                name="idade" value={objeto.idade}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo Idade OK"
                msginvalido="Campo Idade é obrigatório" />

            <CampoSelect value={objeto.cliente}
                id="txtCliente" name="cliente" label="Cliente"
                onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe o cliente"
                requerido={true}
            >
                {listaClientes.map((cli) => (
                    <option key={cli.codigo} value={cli.codigo}>
                        {cli.nome}
                    </option>
                ))}
            </CampoSelect>
            <CampoSelect value={objeto.tipo}
                id="txtTipo" name="tipo" label="Tipo"
                onchange={handleChange}
                msgvalido="OK certo" msginvalido="Informe o tipo do pet"
                requerido={true}
            >
                {listaTipos.map((tip) => (
                    <option key={tip.codigo} value={tip.codigo}>
                        {tip.nome}
                    </option>
                ))}
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;