const CPF = document.getElementById("cpf");
const TELEFONE = document.getElementById("telefone");
const CEP = document.getElementById("cep");

function obterDados(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch (erro) {
        return [];
    }
}

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

const projetosPadrao = [
    {
        id: 1,
        nome: "Educação para Todos",
        categoria: "educacao",
        descricao:
            "O projeto oferece atividades educacionais e apoio escolar para crianças e jovens da comunidade.",
        imagem: "imagens/ong.jpg",
        objetivos: [
            "Incentivar a educação.",
            "Auxiliar no desenvolvimento escolar.",
            "Promover oportunidades para crianças e jovens.",
            "Combater a desigualdade educacional."
        ],
        indicadores: [
            "120 crianças atendidas.",
            "80 atividades educacionais realizadas.",
            "35 voluntários participantes."
        ]
    },
    {
        id: 2,
        nome: "Alimentação Solidária",
        categoria: "alimentacao",
        descricao:
            "O projeto arrecada e distribui alimentos para famílias em situação de vulnerabilidade social.",
        imagem: "imagens/projetos.jpg",
        objetivos: [
            "Distribuição de cestas básicas.",
            "Arrecadação de alimentos.",
            "Atendimento às famílias cadastradas.",
            "Campanhas de conscientização."
        ],
        indicadores: [
            "250 famílias atendidas.",
            "500 cestas básicas distribuídas.",
            "1.200 kg de alimentos arrecadados."
        ]
    },
    {
        id: 3,
        nome: "Meio Ambiente",
        categoria: "meio-ambiente",
        descricao:
            "O projeto promove ações de preservação ambiental, reciclagem e conscientização da comunidade.",
        imagem: "imagens/cadastro.jpg",
        objetivos: [
            "Campanhas de reciclagem.",
            "Plantio de árvores.",
            "Limpeza de espaços públicos.",
            "Educação ambiental."
        ],
        indicadores: [
            "150 árvores plantadas.",
            "300 kg de materiais reciclados.",
            "20 ações ambientais realizadas."
        ]
    }
];

function inicializarProjetos() {
    if (!localStorage.getItem("projetos")) {
        salvarDados("projetos", projetosPadrao);
    }
}

inicializarProjetos();

function aplicarMascaras() {

    if (CPF) {

        CPF.addEventListener("input", function () {

            let valor = CPF.value.replace(/\D/g, "");

            valor = valor.slice(0, 11);

            valor = valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

            valor = valor.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

            valor = valor.replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );

            CPF.value = valor;

        });

    }

    if (TELEFONE) {

        TELEFONE.addEventListener("input", function () {

            let valor =
                TELEFONE.value.replace(/\D/g, "");

            valor = valor.slice(0, 11);

            valor = valor.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

            valor = valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

            TELEFONE.value = valor;

        });

    }

    if (CEP) {

        CEP.addEventListener("input", function () {

            let valor =
                CEP.value.replace(/\D/g, "");

            valor = valor.slice(0, 8);

            valor = valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

            CEP.value = valor;

        });

    }
}

aplicarMascaras();

const formulario =
    document.getElementById("formulario");

if (formulario) {

    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const cpfValor =
                CPF.value.replace(/\D/g, "");

            const telefoneValor =
                TELEFONE.value.replace(/\D/g, "");

            const cepValor =
                CEP.value.replace(/\D/g, "");

            if (cpfValor.length !== 11) {
                alert("Digite um CPF válido.");
                return;
            }

            if (
                telefoneValor.length !== 10 &&
                telefoneValor.length !== 11
            ) {
                alert("Digite um telefone válido.");
                return;
            }

            if (cepValor.length !== 8) {
                alert("Digite um CEP válido.");
                return;
            }

            const cadastro = {

                id: Date.now(),

                nome:
                    document.getElementById("nome").value,

                email:
                    document.getElementById("email").value,

                cpf:
                    CPF.value,

                telefone:
                    TELEFONE.value,

                nascimento:
                    document.getElementById("nascimento").value,

                endereco:
                    document.getElementById("endereco").value,

                cep:
                    CEP.value,

                cidade:
                    document.getElementById("cidade").value,

                estado:
                    document.getElementById("estado").value,

                interesse:
                    document.getElementById("interesse").value,

                projetoInteresse:
                    document.getElementById(
                        "projetoInteresse"
                    ).value,

                mensagem:
                    document.getElementById("mensagem").value,

                status: "pendente",

                historico: []
            };

            const cadastros =
                obterDados("cadastros");

            cadastros.push(cadastro);

            salvarDados(
                "cadastros",
                cadastros
            );

            if (
                cadastro.interesse ===
                "voluntario"
            ) {

                const voluntarios =
                    obterDados("voluntarios");

                voluntarios.push(cadastro);

                salvarDados(
                    "voluntarios",
                    voluntarios
                );

            }

            const mensagem =
                document.getElementById(
                    "mensagemCadastro"
                );

            mensagem.textContent =
                "Cadastro realizado com sucesso!";

            formulario.reset();

        }
    );

}

function carregarInformacoesInstitucionais() {

    const dados = obterDados(
        "institucional"
    );

    if (!dados.sobre) {
        return;
    }

    const sobre =
        document.getElementById("sobreTexto");

    const missao =
        document.getElementById("missaoTexto");

    const visao =
        document.getElementById("visaoTexto");

    const valores =
        document.getElementById("valoresLista");

    if (sobre) {
        sobre.textContent = dados.sobre;
    }

    if (missao) {
        missao.textContent = dados.missao;
    }

    if (visao) {
        visao.textContent = dados.visao;
    }

    if (valores) {

        valores.innerHTML = "";

        dados.valores.forEach(function (valor) {

            const li =
                document.createElement("li");

            li.textContent = valor;

            valores.appendChild(li);

        });

    }

}

carregarInformacoesInstitucionais();

function renderizarProjetos() {

    const lista =
        document.getElementById(
            "listaProjetos"
        );

    if (!lista) {
        return;
    }

    const projetos =
        obterDados("projetos");

    lista.innerHTML = "";

    projetos.forEach(function (projeto) {

        const section =
            document.createElement("section");

        section.className =
            "projeto-card";

        section.dataset.categoria =
            projeto.categoria;

        const objetivos =
            projeto.objetivos || [];

        const indicadores =
            projeto.indicadores || [];

        section.innerHTML = `

            <h2>
                Projeto: ${projeto.nome}
            </h2>

            <p>
                <strong>Categoria:</strong>
                ${nomeCategoria(projeto.categoria)}
            </p>

            <p>
                ${projeto.descricao}
            </p>

            <h3>Objetivos</h3>

            <ul>
                ${objetivos
                    .map(function (item) {
                        return `<li>${item}</li>`;
                    })
                    .join("")}
            </ul>

            <h3>
                Indicadores de impacto
            </h3>

            <ul>
                ${indicadores
                    .map(function (item) {
                        return `<li>${item}</li>`;
                    })
                    .join("")}
            </ul>

            <figure>

                <img
                    src="${projeto.imagem}"
                    alt="Imagem do projeto ${projeto.nome}"
                    loading="lazy"
                >

                <figcaption>
                    ${projeto.nome}
                </figcaption>

            </figure>

        `;

        lista.appendChild(section);

    });

}

function nomeCategoria(categoria) {

    const categorias = {

        "educacao":
            "Educação",

        "alimentacao":
            "Alimentação",

        "meio-ambiente":
            "Meio Ambiente"

    };

    return (
        categorias[categoria] ||
        categoria
    );
}

renderizarProjetos();

const filtros =
    document.querySelectorAll(".filtro");

if (filtros.length > 0) {

    filtros.forEach(function (botao) {

        botao.addEventListener(
            "click",
            function () {

                filtros.forEach(
                    function (item) {
                        item.classList.remove(
                            "ativo"
                        );
                    }
                );

                botao.classList.add("ativo");

                const filtro =
                    botao.dataset.filtro;

                const projetos =
                    document.querySelectorAll(
                        ".projeto-card"
                    );

                projetos.forEach(
                    function (projeto) {

                        if (
                            filtro === "todos" ||
                            projeto.dataset.categoria ===
                            filtro
                        ) {

                            projeto.classList.remove(
                                "oculto"
                            );

                        } else {

                            projeto.classList.add(
                                "oculto"
                            );

                        }

                    }
                );

            }
        );

    });

}

function obterTotalDoacoes() {

    const doacoes =
        obterDados("doacoes");

    let total = 0;

    doacoes.forEach(
        function (doacao) {
            total += Number(
                doacao.valor
            );
        }
    );

    return total;

}

function atualizarDoacao() {

    const progresso =
        document.getElementById(
            "progressoDoacao"
        );

    const valor =
        document.getElementById(
            "valorArrecadado"
        );

    const percentual =
        document.getElementById(
            "percentualDoacao"
        );

    if (
        !progresso ||
        !valor ||
        !percentual
    ) {

        return;

    }

    const base = 6500;

    const meta = 10000;

    const total =
        base + obterTotalDoacoes();

    const porcentagem =
        Math.min(
            (total / meta) * 100,
            100
        );

    progresso.value =
        Math.min(total, meta);

    valor.innerHTML =
        "Arrecadado: <strong>R$ " +
        total.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2
            }
        ) +
        "</strong>";

    percentual.textContent =
        porcentagem.toFixed(0) +
        "% da meta alcançada.";

}

atualizarDoacao();

const doacaoForm =
    document.getElementById(
        "doacaoForm"
    );

if (doacaoForm) {

    doacaoForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const valor =
                document.getElementById(
                    "valorDoacao"
                ).value;

            const formaPagamento =
                document.getElementById(
                    "formaPagamento"
                ).value;

            const doacoes =
                obterDados("doacoes");

            doacoes.push({

                id: Date.now(),

                valor: valor,

                formaPagamento:
                    formaPagamento,

                data:
                    new Date()
                    .toLocaleDateString(
                        "pt-BR"
                    )

            });

            salvarDados(
                "doacoes",
                doacoes
            );

            alert(
                "Doação registrada com sucesso! Esta é uma simulação acadêmica."
            );

            doacaoForm.reset();

            atualizarDoacao();

        }
    );

}

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value;

            const inscritos =
                obterDados("newsletter");

            inscritos.push({

                id: Date.now(),

                email: email,

                data:
                    new Date()
                    .toLocaleDateString(
                        "pt-BR"
                    )

            });

            salvarDados(
                "newsletter",
                inscritos
            );

            alert(
                "E-mail cadastrado na newsletter com sucesso!"
            );

            newsletterForm.reset();

        }
    );

}

const compartilharWhatsApp =
    document.getElementById(
        "compartilharWhatsApp"
    );

if (compartilharWhatsApp) {

    compartilharWhatsApp.addEventListener(
        "click",
        function () {

            const mensagem =
                encodeURIComponent(
                    "Conheça os projetos da ONG Esperança!"
                );

            window.open(
                "https://wa.me/?text=" +
                mensagem,
                "_blank"
            );

        }
    );

}

const compartilharFacebook =
    document.getElementById(
        "compartilharFacebook"
    );

if (compartilharFacebook) {

    compartilharFacebook.addEventListener(
        "click",
        function () {

            const url =
                encodeURIComponent(
                    window.location.href
                );

            window.open(
                "https://www.facebook.com/sharer/sharer.php?u=" +
                url,
                "_blank"
            );

        }
    );

}

const documentoBotoes =
    document.querySelectorAll(
        ".documento-btn"
    );

const documentos = {

    "Relatório de atividades":
        "ONG Esperança\n\nRelatório de atividades\n\nDocumento demonstrativo para fins acadêmicos.",

    "Relatório financeiro":
        "ONG Esperança\n\nRelatório financeiro\n\nDocumento demonstrativo para fins acadêmicos.",

    "Plano de ações":
        "ONG Esperança\n\nPlano de ações\n\nDocumento demonstrativo para fins acadêmicos."

};

if (documentoBotoes.length > 0) {

    documentoBotoes.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const nome =
                        botao.dataset.documento;

                    const arquivo =
                        new Blob(
                            [documentos[nome]],
                            {
                                type:
                                    "text/plain;charset=utf-8"
                            }
                        );

                    const link =
                        document.createElement(
                            "a"
                        );

                    const url =
                        URL.createObjectURL(
                            arquivo
                        );

                    link.href = url;

                    link.download =
                        nome
                            .toLowerCase()
                            .replaceAll(
                                " ",
                                "-"
                            ) +
                        ".txt";

                    link.click();

                    URL.revokeObjectURL(
                        url
                    );

                }
            );

        }
    );

}

const historicoForm =
    document.getElementById(
        "historicoForm"
    );

if (historicoForm) {

    historicoForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "emailHistorico"
                ).value.trim();

            const voluntarios =
                obterDados(
                    "voluntarios"
                );

            const voluntario =
                voluntarios.find(
                    function (item) {
                        return (
                            item.email ===
                            email
                        );
                    }
                );

            const resultado =
                document.getElementById(
                    "resultadoHistorico"
                );

            if (!voluntario) {

                resultado.innerHTML = `
                    <h2>Histórico</h2>

                    <p>
                        Nenhum cadastro de voluntário
                        foi encontrado para este e-mail.
                    </p>
                `;

                return;

            }

            const historico =
                voluntario.historico || [];

            resultado.innerHTML = `

                <h2>
                    Histórico de participação
                </h2>

                <p>
                    <strong>Nome:</strong>
                    ${voluntario.nome}
                </p>

                <p>
                    <strong>Projeto:</strong>
                    ${voluntario.projetoInteresse}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${voluntario.status}
                </p>

                <h3>
                    Participações
                </h3>

                ${
                    historico.length > 0

                    ? `
                        <ul>
                            ${historico
                                .map(
                                    function (
                                        item
                                    ) {
                                        return `
                                            <li>
                                                ${item}
                                            </li>
                                        `;
                                    }
                                )
                                .join("")}
                        </ul>
                    `

                    : `
                        <p>
                            Ainda não existem participações registradas.
                        </p>
                    `
                }

            `;

        }
    );

}

const certificadoForm =
    document.getElementById(
        "certificadoForm"
    );

if (certificadoForm) {

    certificadoForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nome =
                document.getElementById(
                    "nomeCertificado"
                ).value.trim();

            const certificado =
                document.getElementById(
                    "certificado"
                );

            certificado.style.display =
                "block";

            certificado.innerHTML = `

                <h3>
                    Certificado de Participação
                </h3>

                <p>
                    Certificamos que
                    <strong>${nome}</strong>
                    participou das atividades
                    da ONG Esperança.
                </p>

                <p>
                    Data:
                    ${
                        new Date()
                        .toLocaleDateString(
                            "pt-BR"
                        )
                    }
                </p>

                <p>
                    Documento demonstrativo
                    para fins acadêmicos.
                </p>

            `;

        }
    );

}

function inicializarAdmin() {

    const adminProjetos =
        document.getElementById(
            "adminProjetos"
        );

    const adminVoluntarios =
        document.getElementById(
            "adminVoluntarios"
        );

    const adminDoacoes =
        document.getElementById(
            "adminDoacoes"
        );

    const adminNewsletter =
        document.getElementById(
            "adminNewsletter"
        );

    if (
        !adminProjetos &&
        !adminVoluntarios &&
        !adminDoacoes &&
        !adminNewsletter
    ) {

        return;

    }

    atualizarMetricas();

    renderAdminProjetos();

    renderAdminVoluntarios();

    renderAdminDoacoes();

    renderAdminNewsletter();

    carregarFormularioInstitucional();

}

function atualizarMetricas() {

    const cadastros =
        obterDados("cadastros");

    const voluntarios =
        obterDados("voluntarios");

    const newsletter =
        obterDados("newsletter");

    const totalCadastros =
        document.getElementById(
            "totalCadastros"
        );

    const totalVoluntarios =
        document.getElementById(
            "totalVoluntarios"
        );

    const totalDoacoes =
        document.getElementById(
            "totalDoacoes"
        );

    const totalNewsletter =
        document.getElementById(
            "totalNewsletter"
        );

    if (totalCadastros) {
        totalCadastros.textContent =
            cadastros.length;
    }

    if (totalVoluntarios) {
        totalVoluntarios.textContent =
            voluntarios.length;
    }

    if (totalDoacoes) {

        totalDoacoes.textContent =
            "R$ " +
            obterTotalDoacoes()
                .toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits: 2
                    }
                );

    }

    if (totalNewsletter) {
        totalNewsletter.textContent =
            newsletter.length;
    }

}

function renderAdminProjetos() {

    const container =
        document.getElementById(
            "adminProjetos"
        );

    if (!container) {
        return;
    }

    const projetos =
        obterDados("projetos");

    container.innerHTML = "";

    projetos.forEach(
        function (projeto) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-item";

            div.innerHTML = `

                <h3>
                    ${projeto.nome}
                </h3>

                <p>
                    Categoria:
                    ${nomeCategoria(
                        projeto.categoria
                    )}
                </p>

                <p>
                    ${projeto.descricao}
                </p>

                <div class="admin-acoes">

                    <button
                        type="button"
                        class="excluir-projeto"
                        data-id="${projeto.id}"
                    >
                        Excluir projeto
                    </button>

                </div>

            `;

            container.appendChild(div);

        }
    );

    document
        .querySelectorAll(
            ".excluir-projeto"
        )
        .forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                botao.dataset.id
                            );

                        let projetos =
                            obterDados(
                                "projetos"
                            );

                        projetos =
                            projetos.filter(
                                function (
                                    projeto
                                ) {
                                    return (
                                        projeto.id !==
                                        id
                                    );
                                }
                            );

                        salvarDados(
                            "projetos",
                            projetos
                        );

                        renderAdminProjetos();

                    }
                );

            }
        );

}

function renderAdminVoluntarios() {

    const container =
        document.getElementById(
            "adminVoluntarios"
        );

    if (!container) {
        return;
    }

    const voluntarios =
        obterDados("voluntarios");

    container.innerHTML = "";

    if (voluntarios.length === 0) {

        container.innerHTML =
            "<p>Nenhum voluntário cadastrado.</p>";

        return;

    }

    voluntarios.forEach(
        function (voluntario) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-item";

            div.innerHTML = `

                <h3>
                    ${voluntario.nome}
                </h3>

                <p>
                    E-mail:
                    ${voluntario.email}
                </p>

                <p>
                    Projeto:
                    ${voluntario.projetoInteresse}
                </p>

                <p>
                    Status:
                    <span class="status status-${voluntario.status}">
                        ${voluntario.status}
                    </span>
                </p>

                <div class="admin-acoes">

                    <button
                        type="button"
                        class="aprovar-voluntario"
                        data-id="${voluntario.id}"
                    >
                        Aprovar
                    </button>

                    <button
                        type="button"
                        class="rejeitar-voluntario"
                        data-id="${voluntario.id}"
                    >
                        Rejeitar
                    </button>

                    <button
                        type="button"
                        class="registrar-participacao"
                        data-id="${voluntario.id}"
                    >
                        Registrar participação
                    </button>

                </div>

            `;

            container.appendChild(div);

        }
    );

    document
        .querySelectorAll(
            ".aprovar-voluntario"
        )
        .forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function () {

                        alterarStatusVoluntario(
                            Number(
                                botao.dataset.id
                            ),
                            "aprovado"
                        );

                    }
                );

            }
        );

    document
        .querySelectorAll(
            ".rejeitar-voluntario"
        )
        .forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function () {

                        alterarStatusVoluntario(
                            Number(
                                botao.dataset.id
                            ),
                            "rejeitado"
                        );

                    }
                );

            }
        );

    document
        .querySelectorAll(
            ".registrar-participacao"
        )
        .forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function () {

                        registrarParticipacao(
                            Number(
                                botao.dataset.id
                            )
                        );

                    }
                );

            }
        );

}

function alterarStatusVoluntario(
    id,
    status
) {

    const voluntarios =
        obterDados("voluntarios");

    const cadastros =
        obterDados("cadastros");

    voluntarios.forEach(
        function (voluntario) {

            if (
                voluntario.id === id
            ) {
                voluntario.status =
                    status;
            }

        }
    );

    cadastros.forEach(
        function (cadastro) {

            if (
                cadastro.id === id
            ) {
                cadastro.status =
                    status;
            }

        }
    );

    salvarDados(
        "voluntarios",
        voluntarios
    );

    salvarDados(
        "cadastros",
        cadastros
    );

    renderAdminVoluntarios();

}

function registrarParticipacao(id) {

    const voluntarios =
        obterDados("voluntarios");

    const cadastros =
        obterDados("cadastros");

    voluntarios.forEach(
        function (voluntario) {

            if (
                voluntario.id === id
            ) {

                if (
                    !voluntario.historico
                ) {
                    voluntario.historico = [];
                }

                voluntario.historico.push(
                    "Participação registrada em " +
                    new Date()
                        .toLocaleDateString(
                            "pt-BR"
                        )
                );

            }

        }
    );

    cadastros.forEach(
        function (cadastro) {

            if (
                cadastro.id === id
            ) {

                if (
                    !cadastro.historico
                ) {
                    cadastro.historico = [];
                }

                cadastro.historico.push(
                    "Participação registrada em " +
                    new Date()
                        .toLocaleDateString(
                            "pt-BR"
                        )
                );

            }

        }
    );

    salvarDados(
        "voluntarios",
        voluntarios
    );

    salvarDados(
        "cadastros",
        cadastros
    );

    alert(
        "Participação registrada com sucesso."
    );

}

function renderAdminDoacoes() {

    const container =
        document.getElementById(
            "adminDoacoes"
        );

    if (!container) {
        return;
    }

    const doacoes =
        obterDados("doacoes");

    container.innerHTML = "";

    if (doacoes.length === 0) {

        container.innerHTML =
            "<p>Nenhuma doação simulada registrada.</p>";

        return;

    }

    doacoes.forEach(
        function (doacao) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-item";

            div.innerHTML = `

                <p>
                    <strong>Valor:</strong>
                    R$ ${Number(
                        doacao.valor
                    ).toLocaleString(
                        "pt-BR",
                        {
                            minimumFractionDigits: 2
                        }
                    )}
                </p>

                <p>
                    <strong>Pagamento:</strong>
                    ${doacao.formaPagamento}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${doacao.data}
                </p>

            `;

            container.appendChild(div);

        }
    );

}

function renderAdminNewsletter() {

    const container =
        document.getElementById(
            "adminNewsletter"
        );

    if (!container) {
        return;
    }

    const inscritos =
        obterDados("newsletter");

    container.innerHTML = "";

    if (inscritos.length === 0) {

        container.innerHTML =
            "<p>Nenhum inscrito.</p>";

        return;

    }

    inscritos.forEach(
        function (inscrito) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "admin-item";

            div.innerHTML = `

                <p>
                    <strong>E-mail:</strong>
                    ${inscrito.email}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${inscrito.data}
                </p>

            `;

            container.appendChild(div);

        }
    );

}

function carregarFormularioInstitucional() {

    const dados =
        obterDados("institucional");

    const sobre =
        document.getElementById(
            "campoSobre"
        );

    const missao =
        document.getElementById(
            "campoMissao"
        );

    const visao =
        document.getElementById(
            "campoVisao"
        );

    const valores =
        document.getElementById(
            "campoValores"
        );

    if (
        !sobre ||
        !missao ||
        !visao ||
        !valores
    ) {
        return;
    }

    sobre.value =
        dados.sobre ||
        "A ONG Esperança atua para transformar vidas por meio de projetos sociais.";

    missao.value =
        dados.missao ||
        "Promover ações sociais que contribuam para uma sociedade mais justa.";

    visao.value =
        dados.visao ||
        "Construir uma sociedade onde todas as pessoas tenham oportunidades.";

    valores.value =
        dados.valores
            ? dados.valores.join(", ")
            : "Solidariedade, Respeito, Inclusão, Transparência, Compromisso social";

}

const institucionalForm =
    document.getElementById(
        "institucionalForm"
    );

if (institucionalForm) {

    institucionalForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const dados = {

                sobre:
                    document.getElementById(
                        "campoSobre"
                    ).value,

                missao:
                    document.getElementById(
                        "campoMissao"
                    ).value,

                visao:
                    document.getElementById(
                        "campoVisao"
                    ).value,

                valores:
                    document.getElementById(
                        "campoValores"
                    ).value
                        .split(",")
                        .map(
                            function (item) {
                                return item.trim();
                            }
                        )

            };

            salvarDados(
                "institucional",
                dados
            );

            alert(
                "Informações institucionais salvas."
            );

        }
    );

}

const projetoForm =
    document.getElementById(
        "projetoForm"
    );

if (projetoForm) {

    projetoForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const projetos =
                obterDados("projetos");

            const novoProjeto = {

                id: Date.now(),

                nome:
                    document.getElementById(
                        "projetoNome"
                    ).value,

                categoria:
                    document.getElementById(
                        "projetoCategoria"
                    ).value,

                descricao:
                    document.getElementById(
                        "projetoDescricao"
                    ).value,

                imagem:
                    document.getElementById(
                        "projetoImagem"
                    ).value,

                objetivos: [
                    "Promover ações sociais.",
                    "Ajudar a comunidade."
                ],

                indicadores: [
                    "Projeto em desenvolvimento.",
                    "Participação da comunidade."
                ]

            };

            projetos.push(
                novoProjeto
            );

            salvarDados(
                "projetos",
                projetos
            );

            alert(
                "Projeto cadastrado com sucesso."
            );

            projetoForm.reset();

            renderAdminProjetos();

        }
    );

}

inicializarAdmin();