# Manual de CSS do Café Aurora 🎨

Se o HTML é o **esqueleto** do site e o TypeScript é o **motorzinho**,
o CSS é a **roupa, a maquiagem e o jeito de se arrumar**.

Este manual mostra **como o design foi feito** e **como mudar as coisas** sem bagunçar nada.

---

## 1. Onde mora cada pedaço de CSS

Pense numa casa: tem regras que valem **para a casa toda** (ex.: "tire o sapato na porta")
e regras que valem **só para um cômodo** (ex.: "no banheiro, feche a tampa").

| Arquivo | Vale para | O que tem lá |
|---|---|---|
| [src/styles.css](../src/styles.css) | **O site todo** | Cores, fontes, botão, seção, grade, acessibilidade |
| [app.css](../src/app/app.css) | A "moldura" do app | Rodapé sempre no fim da tela, link "Pular para o conteúdo" |
| `components/xxx/xxx.css` | **Só aquele componente** | Header, hero, cartões, formulário... |

> 🔒 **Segredo do Angular:** o CSS de um componente **não vaza** para os outros.
> Se você escrever `h3 { color: red }` dentro de `plano-card.css`, só os `h3` do cartão de plano ficam vermelhos.
> Por isso podemos usar nomes simples como `.card` ou `.icone` sem medo.

**Regra de ouro:** se algo aparece em **2 ou mais componentes**, ele vai para o `styles.css`.
Se aparece em **um só**, fica no CSS do componente.

---

## 2. As variáveis: a "caixa de lápis de cor" do site

No topo do [styles.css](../src/styles.css) existe isto:

```css
:root {
  --cafe: #3b2416;          /* marrom escuro: header, rodapé, botões, títulos */
  --creme: #f7f1e8;         /* fundo do site */
  --creme-escuro: #efe5d6;  /* fundo das faixas (Diferenciais e Contato) */
  --caramelo: #a8561a;      /* cor de destaque: selo, foco, hover do botão */
  --caramelo-claro: #e2a46b;/* hover dos links no fundo escuro */
  --texto: #2a211c;         /* cor das letras */
  --texto-suave: #6b5a4e;   /* subtítulos e "/mês" */
  --borda: #e3d6c4;         /* bordinhas dos cartões e campos */
  --erro: #b3261e;          /* vermelho dos erros */

  --fonte-texto: 'Inter', system-ui, sans-serif;
  --fonte-titulo: 'Fraunces', Georgia, serif;

  --raio: 8px;              /* cantinho arredondado pequeno (botão, campo) */
  --raio-grande: 14px;      /* cantinho arredondado grande (cartões) */
  --sombra: ...;            /* sombra leve */
  --sombra-forte: ...;      /* sombra de "flutuando" */

  --largura-max: 1100px;    /* o site nunca fica mais largo que isso */
  --altura-topo: 4.5rem;    /* altura do header, para a rolagem não esconder títulos */
}
```

Uma variável é como **dar um apelido para uma cor**. Em vez de escrever `#3b2416` em 20 lugares,
escrevemos `var(--cafe)`. Quer mudar o marrom do site inteiro? **Muda em um lugar só.** ✨

### 🧪 Experimente
Troque `--caramelo: #a8561a;` por `--caramelo: #2e7d32;` (verde) e salve.
O selo, o hover dos botões, os ✓ dos planos e o foco do teclado mudam **todos juntos**.

### ⚠️ Cuidado com o contraste
Letra clara em fundo claro (ou escura em escura) fica ilegível.
Antes de trocar uma cor, teste em <https://webaim.org/resources/contrastchecker/>.
O número tem que dar **pelo menos 4.5:1** para texto normal.

---

## 3. As fontes

As fontes vêm do Google Fonts, carregadas no [index.html](../src/index.html):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:...&family=Inter:...&display=swap">
```

- **Fraunces** → títulos (`h1`, `h2`, `h3` e a marca "☕ Café Aurora"). Tem cara de cardápio de cafeteria.
- **Inter** → o resto do texto. É bem fácil de ler.

### Como trocar uma fonte
1. Entre em <https://fonts.google.com>, escolha uma (ex.: *Playfair Display*).
2. Copie o `<link>` que o site mostra e troque o do `index.html`.
3. No `styles.css`, mude a variável:
   ```css
   --fonte-titulo: 'Playfair Display', Georgia, serif;
   ```
O `Georgia, serif` depois da vírgula é o **plano B**: se a internet falhar, o navegador usa ela.

---

## 4. As peças que se repetem (no `styles.css`)

### `.secao` — a "caixa" de cada parte da página
```css
.secao {
  max-width: var(--largura-max); /* nunca passa de 1100px */
  margin: 0 auto;                /* "auto" nos lados = centraliza */
  padding: 3rem 1.25rem;         /* 3rem em cima/embaixo, 1.25rem nos lados */
}
```
Os `1.25rem` nos lados são o **respiro**: no celular, o texto nunca encosta na borda da tela.

### `.titulo-secao` e `.subtitulo`
Os títulos "Escolha seu plano", "Fale com a gente"... ficam centralizados.
O subtítulo tem `max-width: 40ch`, ou seja, **no máximo ~40 letras por linha**. Linha curta é mais fácil de ler.

### `.botao`
Qualquer `<a>` ou `<button>` com `class="botao"` vira o botão marrom.
Para criar um botão **diferente** (ex.: só com borda), crie uma classe extra:
```css
.botao-contorno {
  background: transparent;
  color: var(--cafe);
  border: 2px solid var(--cafe);
}
```
E use as duas juntas: `<a class="botao botao-contorno">`.

### `.faixa` — fundo de cor diferente
Diferenciais e Contato têm fundo `--creme-escuro`. Isso cria um "zebrado" na página:
creme → creme escuro → creme → creme escuro. Assim o olho percebe onde começa cada parte.

---

## 5. Os truques de layout (a parte mágica 🪄)

### 5.1 `rem` — a régua do site
`1rem` = o tamanho da letra padrão (geralmente 16px). Usamos `rem` em vez de `px` porque,
se a pessoa aumentar a letra no navegador, **o site todo cresce junto**, sem quebrar.

### 5.2 `clamp()` — letra que cresce com a tela
```css
.hero h1 { font-size: clamp(2.1rem, 6vw, 3.5rem); }
```
Leia assim: *"o tamanho é 6% da largura da tela, mas **nunca menor** que 2.1rem e **nunca maior** que 3.5rem"*.
No celular fica pequeno, no computador fica grande, **sem precisar de media query**.

### 5.3 A grade mágica dos cartões
```css
.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 1.5rem;
}
```
Essa linha esquisita diz:
> "Coloque **quantas colunas couberem**, cada uma com **pelo menos 260px**,
> e divida o espaço que sobrar igualmente."

- Celular (400px): cabe 1 → **1 coluna**.
- Tablet (700px): cabem 2 → **2 colunas**.
- Computador (1100px): cabem 3 → **3 colunas**.

O `min(260px, 100%)` é um seguro: em telas **menores** que 260px, o cartão usa 100% e não estoura.

👉 Quer cartões mais largos? Troque `260px` por `320px`. Mais estreitos? `200px`.

### 5.4 Flexbox — enfileirar coisas
Usado no header, no rodapé e dentro dos cartões.
```css
display: flex;
flex-direction: column; /* um embaixo do outro */
gap: 1rem;              /* espaço entre eles */
```
Truque dos planos com **mesma altura**: o cartão é `flex column` com `height: 100%`,
e a lista `ul` tem `flex: 1` (ela "estica" e empurra o botão lá pro fundo).
Por isso os 3 botões "Quero este" ficam **alinhados**, mesmo com listas de tamanhos diferentes.

### 5.5 Media queries — "celular primeiro" 📱
Escrevemos o CSS **primeiro para o celular**, e depois dizemos o que muda em telas maiores:
```css
.hero { display: grid; }               /* celular: texto em cima, foto embaixo */

@media (min-width: 900px) {            /* "a partir de 900px de largura..." */
  .hero { grid-template-columns: 1.1fr 0.9fr; } /* ...lado a lado */
}
```

Os "pontos de virada" que usamos:

| Largura | Quem é | O que muda |
|---|---|---|
| `600px` | celular grande | formulário com mais espaço, botão Enviar não ocupa a linha toda |
| `768px` | tablet | menu aparece em linha, rodapé lado a lado, seções com mais respiro |
| `900px` | notebook | hero com texto e foto lado a lado |

---

## 6. Componente por componente

### Header ([header.css](../src/app/components/header/header.css))
- **Grudado no topo:** `position: sticky; top: 0; z-index: 10;`
  O `z-index` é "qual folha fica por cima" numa pilha de papel. 10 > o resto, então o header fica por cima.
- **Botão hambúrguer (☰ → ✕):** são 3 risquinhos feitos com **um** `span` e seus `::before` e `::after`.
  Quando ganha a classe `.aberto`, o do meio some e os outros dois giram 45° formando um X.
- **Menu do celular:** `display: none` (escondido) até ter a classe `.aberto`, que o TypeScript coloca.
- No computador (`768px+`) o botão some e o menu fica sempre visível.

### Hero ([hero.css](../src/app/components/hero/hero.css))
- `.chamada` é a frase pequena em CAIXA ALTA acima do título (`text-transform: uppercase` + `letter-spacing`).
- A foto tem `object-fit: cover` (preenche o espaço sem deformar) e `max-height: 70vh` (nunca maior que 70% da altura da tela).

👉 **Trocar a foto:** coloque o arquivo em `public/` (sem acento e sem espaço no nome!) e mude o `ngSrc`, `width` e `height` no `hero.html` para o tamanho real da imagem.

### Diferenciais ([diferenciais.css](../src/app/components/diferenciais/diferenciais.css))
- O ícone fica numa **bolinha**: `width` e `height` iguais + `border-radius: 50%`.
- **Efeito de "flutuar"** no hover:
  ```css
  .cartao:hover {
    transform: translateY(-4px);     /* sobe 4px */
    box-shadow: var(--sombra-forte); /* sombra maior = parece mais alto */
  }
  ```
  O `transition` faz isso acontecer **devagarinho** (0.25s) em vez de pular.

### Cartão de plano ([plano-card.css](../src/app/components/plano-card/plano-card.css))
- **Selo "Mais escolhido" centralizado em cima da borda:**
  ```css
  position: absolute;
  top: -0.8rem;              /* sobe metade pra fora do cartão */
  left: 50%;                 /* começa no meio... */
  transform: translateX(-50%); /* ...e volta metade da própria largura = centro perfeito */
  ```
  Funciona porque o `.card` tem `position: relative` (o selo se posiciona **em relação ao cartão**).
- O ✓ de cada item vem do CSS (`li::before { content: '✓' }`), não do HTML.
- O plano destaque ganha borda de 2px caramelo e sombra forte.

### Contato ([contato.css](../src/app/components/contato/contato.css))
- O formulário fica num "cartão branco" com no máximo `560px` de largura.
- **Campo com erro fica vermelho sozinho:** o TypeScript coloca `aria-invalid="true"` no campo,
  e o CSS pinta:
  ```css
  [aria-invalid='true'] { border-color: var(--erro); }
  ```
  Bônus: o mesmo atributo avisa leitores de tela que o campo tem erro. Um código, dois benefícios.
- `.sucesso` é verde, `.erro` é vermelho clarinho.

### Rodapé ([footer.css](../src/app/components/footer/footer.css))
- Celular: frase e link um embaixo do outro. `768px+`: lado a lado.
- Fica **sempre no fim da tela**, mesmo em páginas curtas (Privacidade). Quem faz isso é o [app.css](../src/app/app.css):
  `min-height: 100vh` na moldura + `flex: 1` no `main` (o conteúdo "estica" e empurra o rodapé pra baixo).

---

## 7. Acessibilidade (o site serve para todo mundo ♿)

| O que | Onde | Por quê |
|---|---|---|
| `:focus-visible` com contorno caramelo | `styles.css` | Quem usa **teclado** (Tab) vê onde está |
| Link "Pular para o conteúdo" | `app.css` | Fica escondido fora da tela e aparece ao apertar Tab. Pula o menu |
| `scroll-padding-top` | `styles.css` | Ao clicar em "Planos", o título não fica escondido atrás do header grudado |
| `prefers-reduced-motion` | `styles.css` | Algumas pessoas passam mal com animação. Se pediram "menos movimento" no sistema, desligamos tudo |
| Contraste das cores | variáveis | Letra legível para quem enxerga pouco |

⚠️ **Nunca** escreva `outline: none` sem colocar outro jeito de mostrar o foco.

---

## 8. Receitas rápidas 🍳

| Quero... | Faça isso |
|---|---|
| Mudar a cor principal | `--cafe` no `styles.css` |
| Mudar a cor de destaque | `--caramelo` |
| Cantos mais redondos | aumente `--raio` e `--raio-grande` (ex.: 12px e 20px) |
| Cantos retos | `--raio: 0; --raio-grande: 0;` |
| Site mais largo | `--largura-max: 1280px;` |
| Mais espaço entre seções | `padding` do `.secao` (ex.: `4rem 1.25rem`) |
| Sem sombras | `--sombra: none; --sombra-forte: none;` |
| Título do topo maior | aumente o último número do `clamp()` em `hero.css` |
| Header que não gruda | apague `position: sticky` em `header.css` |
| Cartões sem "pulinho" | apague o bloco `.cartao:hover` em `diferenciais.css` |
| Criar tema escuro | veja a seção abaixo 👇 |

### Bônus: tema escuro em 10 linhas
Como tudo usa variáveis, basta trocar os valores quando o sistema estiver no modo escuro.
Cole no fim do `styles.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --creme: #1c1410;
    --creme-escuro: #251a14;
    --texto: #f3e9dc;
    --texto-suave: #c4b3a3;
    --borda: #3d2c21;
  }
}
```
⚠️ Os cartões usam `background: #fff` direto. Para o tema escuro ficar completo,
crie uma variável `--fundo-cartao` e troque esses `#fff` por `var(--fundo-cartao)`.
É um ótimo exercício! 💪

---

## 9. Regras para manter o design bonito

1. **Cor nova? Vira variável.** Nada de `#123456` solto no meio do código.
2. **Celular primeiro.** Escreva para a tela pequena e use `@media (min-width: ...)` para as grandes.
3. **Use `rem`** para tamanhos e espaços, não `px` (exceto bordas finas de 1–2px).
4. **Repetiu em 2 componentes? Vai pro `styles.css`.**
5. **Teste em 3 tamanhos:** no navegador, aperte `F12` → ícone de celular 📱 → teste 375px, 768px e 1280px.
6. **Teste com o teclado:** aperte `Tab` pela página toda. Dá pra ver onde está o foco? Dá pra usar tudo?
7. **Rode o Prettier** antes de salvar de vez: `npx prettier --write "src/**/*.css"`.

---

## Mini dicionário 📖

- **Seletor:** o "endereço" do que você quer pintar (`.botao`, `h1`, `.card ul li`).
- **Classe (`.algo`):** uma etiqueta que você cola no HTML para o CSS achar.
- **Variável (`--algo`):** um apelido para um valor que se repete.
- **`rem`:** a régua baseada no tamanho da letra.
- **`vw` / `vh`:** porcentagem da largura / altura da tela.
- **Grid:** organiza em **linhas e colunas** (tabuleiro).
- **Flex:** organiza em **uma fila** (horizontal ou vertical).
- **Media query:** "se a tela for maior que X, faça Y".
- **Pseudo-elemento (`::before`, `::after`):** um enfeite que o CSS cria sem precisar mexer no HTML.
- **Hover:** quando o mouse passa por cima.
- **Focus:** quando o elemento está selecionado pelo teclado.
