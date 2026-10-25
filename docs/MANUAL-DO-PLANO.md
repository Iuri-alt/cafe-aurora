# Manual do Plano: arrumando o site do Café Aurora ☕

Imagine que o nosso site é uma **casa feita de LEGO**.
Cada pecinha é um **componente** (o cabeçalho, o rodapé, os planos, o formulário...).
O **HTML** é o formato da peça, o **CSS** é a tinta, e o **TypeScript** é o "motorzinho"
que faz a peça se mexer (abrir menu, enviar formulário, escolher plano).

Hoje a casa está montada, mas várias peças estão **com o motorzinho desligado**,
algumas estão **repetidas** e outras estão **pintadas da cor errada**.
Este manual explica o que eu vou consertar, **por que** e **como**.

> Ainda **não** vamos mexer no backend (o "servidor" que guarda as coisas).
> Só vamos deixar a casa pronta e funcionando por dentro.

---

## Parte 1 — O que eu encontrei (a revisão)

### 1. O site não sabe trocar de página
- **Onde:** [app.routes.ts](../src/app/app.routes.ts), [app.html](../src/app/app.html), [footer.html](../src/app/components/footer/footer.html)
- **O problema:** a lista de páginas (`routes`) está vazia. A página de Privacidade existe, mas ninguém consegue chegar nela.
  O link do rodapé usa `href="/privacidade"`, que **recarrega o site inteiro** (como desligar e ligar a TV para mudar de canal).
- **Como consertar:**
  - Colocar as páginas na lista: `''` → Início, `'privacidade'` → Privacidade.
  - Trocar `<app-inicio />` por `<router-outlet />` no `app.html` (é a "janela" onde a página aparece).
  - Trocar `href` por `routerLink` (muda de canal sem desligar a TV).
  - Ligar a opção que faz os links `#planos`, `#contato` rolarem a tela até o lugar certo,
    mesmo vindo de outra página (`withInMemoryScrolling`).

### 2. O menu do celular não abre
- **Onde:** [header.ts](../src/app/components/header/header.ts), [header.html](../src/app/components/header/header.html), [header.css](../src/app/components/header/header.css)
- **O problema:** o TypeScript já tem `menuAberto`, `alternarMenu()` e a lista `links`,
  mas o HTML **não usa nada disso**. O botão "Menu" não faz nada, e no celular os links aparecem sempre.
  Também tem um `Router` importado que ninguém usa.
- **Como consertar:**
  - Botão: `(click)="alternarMenu()"` e `[attr.aria-expanded]="menuAberto()"` (para leitores de tela saberem se está aberto).
  - Links feitos com `@for (link of links; ...)` em vez de escritos à mão.
  - Ao clicar num link, `fecharMenu()`.
  - CSS: no celular o menu fica escondido e só aparece com a classe `aberto`; no computador aparece sempre.
  - Cabeçalho "grudado" no topo ao rolar (`position: sticky`).

### 3. Os planos estão escritos três vezes (e com números diferentes!)
- **Onde:** [planos.html](../src/app/components/planos/planos.html), [planos.ts](../src/app/components/planos/planos.ts), [plano-card](../src/app/components/plano-card/)
- **O problema:** o `planos.ts` tem a lista certinha dos planos, e existe até um componente `PlanoCard` pronto.
  Mas o `planos.html` **ignora tudo** e escreve os cartões à mão. Resultado: o TS diz "Barista R$ 119,90"
  e o HTML diz "Vitalicio R$ 119,80". Qual é o certo? Ninguém sabe! 😵
- **Regra do Clean Code:** *"Não se repita"* (DRY). Uma informação deve morar em **um lugar só**.
- **Como consertar:**
  - `planos.html` vira um `@for` que desenha um `<app-plano-card>` para cada plano.
  - O CSS do cartão sai de `planos.css` e vai para `plano-card.css` (cada peça com sua tinta).
  - No `plano-card.html`, o selo "Mais escolhido" está com a classe errada (`preco` em vez de `selo`) e o botão sem a classe `botao`. Vou corrigir.

### 4. Escolher um plano não faz nada
- **O problema:** o `PlanoCard` avisa "cliquei!" (`escolher.emit`), o `Planos` tem `aoEscolher()`, mas os dois não estão ligados.
- **Como consertar (ligação com TypeScript):**
  - Criar um pequeno **serviço** `PlanoSelecionado` (uma "caixinha" que vários componentes podem olhar).
  - Quando a pessoa clica "Quero este", o nome do plano vai para a caixinha, a tela rola até o **Contato**,
    e a mensagem já vem escrita: *"Olá! Tenho interesse no plano Clube."*

### 5. O formulário de contato está desligado do TypeScript
- **Onde:** [contato.html](../src/app/components/contato/contato.html), [contato.ts](../src/app/components/contato/contato.ts), [contato.css](../src/app/components/contato/contato.css)
- **O problema:** o TS tem o formulário (`form`), as regras (campo obrigatório, e-mail válido) e o `enviar()`,
  mas o HTML é um formulário "solto": não tem `[formGroup]`, nem `formControlName`, nem `(ngSubmit)`.
  Então **nenhuma regra funciona** e o `enviar()` nunca é chamado.
- **Mais 2 bugs:**
  - Se der erro no envio, o `complete` nunca roda → o botão fica "enviando..." **para sempre**. Conserto: usar `finalize()`.
  - O fundo dos campos é marrom-escuro (`var(--cafe)`) com letra escura → **não dá pra ler o que digita**.
- **Como consertar:**
  - Ligar o HTML: `[formGroup]="form"`, `formControlName="nome"`, `(ngSubmit)="enviar()"`.
  - Mostrar mensagens embaixo de cada campo: "Diga seu nome", "E-mail inválido".
  - Botão mostra "Enviando..." e fica travado enquanto envia.
  - Mostrar caixinha verde de sucesso ou vermelha de erro.
  - Campos com fundo branco.

### 6. Pequenos erros de digitação no HTML
- [diferenciais.html](../src/app/components/diferenciais/diferenciais.html): `class="titulo.d"` (ponto no nome da classe não funciona) e `</article  >`.
- A seção de diferenciais não usa a classe `.secao`, então fica **grudada nas bordas** em telas grandes.
- Os 3 cartões viram uma lista no TS + `@for` (mesma ideia dos planos).

### 7. A imagem do topo
- **Onde:** [hero.html](../src/app/components/hero/hero.html)
- **O problema:** importamos o `NgOptimizedImage` (um ajudante que carrega imagens mais rápido),
  mas usamos `src` em vez de `ngSrc`, então o ajudante não trabalha. E o arquivo se chama `Café.png`, com acento —
  acento em nome de arquivo dá dor de cabeça em alguns servidores.
- **Como consertar:** renomear para `cafe.png` e usar `ngSrc="/cafe.png" priority`.

### 8. Arrumação geral (Clean Code)
- **Mover a pasta `services/`** de fora para dentro de `src/app/services/`. Hoje o import é `../../../../services/...` (subir 4 andares!). Fica `../../services/...`.
- **Criar `src/app/models/`** para os "moldes" de dados (`Plano`, `Diferencial`, `LinkMenu`). Hoje o molde `Plano` mora dentro do componente do cartão.
- **Apagar o que não é usado:** `title` no `app.ts`, `Router` no header, comentário padrão do `styles.css`.
- **`.grade` repetida** em dois CSS → vai para o `styles.css` global (uma vez só).
- Deixar `readonly`/`protected` nas coisas que o HTML usa e ninguém deve trocar.
- Arrumar a indentação (o projeto já tem o Prettier instalado; vou rodar ele).

---

## Parte 2 — Design e celular (responsivo)

Pense no site como uma **roupa que precisa servir** numa criança (celular), num adolescente (tablet) e num adulto (computador).

| O que | Como fica |
|---|---|
| Cabeçalho | Grudado no topo; no celular vira botão ☰ que abre/fecha |
| Rolagem | Suave (`scroll-behavior: smooth`), e o título não fica escondido atrás do cabeçalho (`scroll-margin-top`) |
| Hero (topo) | Celular: texto em cima, foto embaixo. Computador: lado a lado (já é assim, vou só polir) |
| Diferenciais | Cartões com ícone, centralizados, 1 coluna no celular e 3 no computador |
| Planos | Todos com a mesma altura; o "Clube" ganha destaque (borda mais grossa e selo) |
| Contato | Campos com letra legível, largura total no celular |
| Rodapé | Empilhado no celular, lado a lado no computador |
| Acessibilidade | Foco visível no teclado, cores com bom contraste, respeitar quem pede "menos animação" (`prefers-reduced-motion`) |
| Fonte | Usar uma fonte com cara de cafeteria (ex.: *Fraunces* nos títulos) — **opcional, você decide** |

---

## Parte 3 — A ordem em que vou trabalhar

1. Arrumar pastas (services, models) e apagar o que não é usado.
2. Rotas + `router-outlet` + rolagem até âncoras.
3. Header com menu funcionando.
4. Planos usando `PlanoCard` + serviço `PlanoSelecionado`.
5. Contato ligado ao formulário, com mensagens.
6. Diferenciais + Hero + Privacidade (texto simples).
7. CSS: design e responsivo.
8. Rodar `npm test` e `npm run build` para provar que nada quebrou. Arrumar os testes `.spec.ts` que precisarem.

---

## Parte 4 — Uma dúvida sobre o "backend"

O formulário de contato já aponta para o **Formspree** (um site de fora que recebe mensagens por você).
Como você pediu para **não começar o backend**, tenho duas opções:

- **A)** Deixar o Formspree como está (já funciona sem precisar criar servidor).
- **B)** Trocar por um envio "de mentirinha" (finge que enviou depois de 1 segundo), e deixar o Formspree para depois.

---

## Mini dicionário 📖

- **Componente:** uma peça de LEGO do site.
- **Signal:** uma caixinha com um valor; quando o valor muda, a tela se atualiza sozinha.
- **`input()` / `output()`:** como uma peça recebe coisas (input) e avisa coisas (output) para a peça de fora.
- **Serviço:** uma caixinha compartilhada que várias peças podem usar.
- **Rota:** o "endereço" de cada página (`/`, `/privacidade`).
- **Responsivo:** o site se ajeita sozinho no tamanho da tela.
- **Clean Code:** escrever código fácil de ler, sem repetição e sem coisa sobrando.
