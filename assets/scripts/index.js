const container_projetos_tag = document.querySelector("#container-projects");
const container_total_projetos_tag = document.querySelector("#total-projetos");
const totalizadores_linguagens_tag = document.querySelector(
	"#totalizadores-linguagens"
);

const USER_GIT_HUB = "arieljunior";
const HOST_API_GIT_HUB = `https://api.github.com/users/${USER_GIT_HUB}`;

const totalizadores_linguagens = {
	outros: 0,
};

let repositorios = [];
const repositorios_filtro_linguagem = [];

async function principal() {
	repositorios = await carregar_repositorios();

	repositorios = repositorios.map((projeto) => {
		const projeto_copia = { ...projeto };

		projeto_copia.language =
			projeto.language === "C#" ? "csharp" : projeto.language;

		if (!projeto_copia.language) {
			totalizadores_linguagens.outros += 1;
		} else if (
			totalizadores_linguagens.hasOwnProperty(projeto_copia.language)
		) {
			totalizadores_linguagens[projeto_copia.language] += 1;
		} else {
			totalizadores_linguagens[projeto_copia.language] = 1;
		}

		return projeto_copia;
	});

	construirLayoutRepositorios();
	construirLayoutTotalizadores();
}

function construirLayoutRepositorios(
	filtroLinguagens = repositorios_filtro_linguagem
) {
	container_projetos_tag.innerHTML = "";

	if (repositorios.length === 0) {
		container_total_projetos_tag.innerHTML = 0;
		return;
	}

	let repositorios_processados = ordenar_lista_por_data(
		repositorios,
		"created_at"
	);

	if (filtroLinguagens.length > 0) {
		repositorios_processados = repositorios_processados.filter((repo) =>
			filtroLinguagens.includes(
				repo.language === null ? "outros" : repo.language
			)
		);
	}

	container_total_projetos_tag.innerHTML = repositorios_processados.length;

	repositorios_processados.forEach((projeto) => {
		const tag_cartao = criar_tag_cartao(projeto);
		container_projetos_tag.appendChild(tag_cartao);
	});
}

function construirLayoutTotalizadores() {
	const totalizadores_ordenado = ordernarPropriedadesPeloMaior(
		totalizadores_linguagens
	);
	
	totalizadores_linguagens_tag.innerHTML = "";
	Object.keys(totalizadores_ordenado).forEach((linguagem) => {
		const total = totalizadores_ordenado[linguagem];
		const tag_li = document.createElement("li");
		tag_li.innerHTML = `
			<img
				class="icon-small"
				src="assets/icons/${linguagem.toLocaleLowerCase()}.png"
				alt="ícone ${linguagem}"
			/>
			<span id="${linguagem}" class="filter" onclick="eventoAplicarFiltroLinguagem('${linguagem}');">${linguagem} (${total})</span>
		`;
		totalizadores_linguagens_tag.appendChild(tag_li);
	});
}

function eventoAplicarFiltroLinguagem(nova_linguagem_filtro) {
	if (!nova_linguagem_filtro) return

	if (repositorios_filtro_linguagem.includes(nova_linguagem_filtro)) {
		const index_filtro = repositorios_filtro_linguagem.findIndex(filtro_nome => filtro_nome === nova_linguagem_filtro);
		repositorios_filtro_linguagem.splice(index_filtro, 1);
	}else{
		repositorios_filtro_linguagem.push(nova_linguagem_filtro);
	}

	alternarLayoutFiltro(nova_linguagem_filtro);
	construirLayoutRepositorios();
}

function alternarLayoutFiltro(filtro_id) {
	const elemento_filtro = document.querySelector(`#${filtro_id}`);
	elemento_filtro.classList.toggle("active-filter");
}

function ordenar_lista_por_data(lista, chave_data) {
	return lista.sort(function (a, b) {
		return new Date(b[chave_data]) - new Date(a[chave_data]);
	});
}

function ordernarPropriedadesPeloMaior(objeto) {
	// Extrair as propriedades e valores em uma matriz de objetos
	const propriedadesOrdenadas = Object.entries(objeto)
		.map(([propriedade, valor]) => ({ propriedade, valor }))
		.sort((a, b) => b.valor - a.valor);

	// Criar um novo objeto a partir das propriedades ordenadas
	const objetoOrdenado = propriedadesOrdenadas.reduce(
		(acc, { propriedade, valor }) => {
			acc[propriedade] = valor;
			return acc;
		},
		{}
	);

	return objetoOrdenado;
}

function criar_tag_cartao({
	name: titulo,
	description: descricao,
	html_url: link_github,
	language: linguagem,
	created_at,
}) {
	const cartao = document.createElement("div");
	cartao.classList.add("card");

	const data_criacao_formatado = new Date(created_at).toLocaleDateString(
		"pt-BR",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		}
	);

	cartao.innerHTML = `
        <div class="card-content">
            <div class="card-title">${titulo}</div>
            <div class="card-description">${descricao || ""}</div>
            <div class="card-date">${data_criacao_formatado}</div>
            <div class="card-category">${linguagem || ""}</div>
            <div class="card-icon">
                <a target="_blank" href="${link_github}">
                    Abrir repositório 
                </a>
            </div>
        </div>
    `;
	return cartao;
}

async function carregar_repositorios() {
	const resposta_http_repositorios_github = await fetch(
		`${HOST_API_GIT_HUB}/repos`
	);
	const repositorios = await resposta_http_repositorios_github.json();
	return repositorios;
}

principal();
