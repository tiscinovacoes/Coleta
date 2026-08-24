# Identidade Visual — Coleta Inteligente

Extraída do arquivo Figma existente (`QgppE1cc2SHldOR6sn0LRg` — Módulo Coleta).
Serve de base obrigatória para o Módulo Atendimento ao Cidadão.

## Marca

- Nome do produto: **Coleta Inteligente**
- Ícone da marca: `recycle` (Lucide), 24px, branco
- Assinatura no topo da sidebar: ícone + wordmark 16px Bold

## Tipografia

| Uso | Fonte | Peso | Tamanho |
|---|---|---|---|
| Título de tela | Geist | Bold | 24 |
| Número de KPI | Geist Mono | Bold | 28 |
| Título de seção / botão | Geist | Semi Bold | 13 |
| Item de navegação | Geist | Medium | 13 |
| Corpo / célula de tabela | Geist | Regular | 13 |
| Label de KPI (uppercase) | Geist | Semi Bold | 11 |
| Legenda / metadado | Geist | Medium | 11 |
| Badge numérico | Geist | Bold | 10 |

Geist Mono é reservado para números (contadores, pesos, protocolos, SLA).

## Cores — Tema Claro

### Superfícies
| Token | Hex | Uso |
|---|---|---|
| surface/page | `#f8fafc` | fundo da área de conteúdo, inputs |
| surface/card | `#ffffff` | cards, tabela, toolbar, painel lateral |
| border/default | `#e2e8f0` | borda de card, divisórias, chips |

### Texto
| Token | Hex | Uso |
|---|---|---|
| text/primary | `#0f172a` | títulos, valores |
| text/secondary | `#475569` | labels |
| text/muted | `#64748b` | legendas |
| text/placeholder | `#94a3b8` | placeholder de busca |
| text/chip | `#334155` | texto de chip |

### Ação
| Token | Hex | Uso |
|---|---|---|
| primary/500 | `#3b82f6` | botão primário, badge, link |
| primary/on | `#ffffff` | texto sobre primário |

### Estado (card contador / badge)
| Estado | Fundo | Borda | Texto do número |
|---|---|---|---|
| Positivo / no prazo | `#d1fae5` | `#10b981` | `#065f46` |
| Atenção / pendência | `#fef3c7` | `#f59e0b` | `#92400e` |
| Neutro / inativo | `#e2e8f0` | `#94a3b8` | `#334155` |
| Crítico / vencido | `#fee2e2` | `#ef4444` | `#991b1b` |

## Cores — Tema Escuro (sidebar e telas dark)

| Token | Hex |
|---|---|
| sidebar/bg | `#071724` |
| sidebar/border | `#1e2d3d` |
| sidebar/item-text | `#8b9fa8` |
| sidebar/item-active-bg | `#0b2533` |
| sidebar/item-active-border | `#2c3d4d` |
| sidebar/item-active-text | `#ffffff` |

## Geometria

| Token | Valor |
|---|---|
| radius/sm | 4 (chip) |
| radius/md | 6 (botão, input, item de nav) |
| radius/lg | 8 (card, toolbar, tabela) |
| radius/pill | 10 (badge) |
| Espaçamento base | 4 / 8 / 12 / 16 / 24 |
| Ícone de nav | 18 |
| Ícone em botão | 14 (moldura) com glifo 12 |
| Avatar | 32 (raio 16) |

## Layout (desktop 1440)

- Sidebar: 220 de largura, fundo `#071724`, borda direita `#1e2d3d`
- Navbar: 48 de altura, breadcrumb à esquerda, sino + avatar à direita
- Área de conteúdo: 1220, padding 24
- Split de trabalho: lista 840 + painel de detalhe 380
- Bloco de cabeçalho: título + ações → linha de 4 cards contadores → toolbar sticky → tabela

## Breakpoints

| Nome | Largura |
|---|---|
| desktop | 1440 |
| tablet | 834 |
| mobile | 390 |

## Convenção de nomes de frame

`<tela>-<variante>-<tema>` — ex.: `motoristas-desktop-light`, `mapa-v2-state-loading-dark`

Estados obrigatórios por tela: `state-loading`, `state-empty`, `state-empty-filter`,
`state-error`, `state-readonly`, `overlay-blocked-*` quando houver bloqueio de regra de negócio.

## Padrões de componente já estabelecidos

- **Card contador**: label uppercase 11 / número Geist Mono 28 / legenda 11, padding 16, radius 8
- **Botão secundário**: fundo branco, borda `#e2e8f0`, radius 6, padding 12×8, ícone 14 + texto 13 Semi Bold
- **Botão primário**: fundo `#3b82f6`, radius 6, padding 14×8, texto branco 13 Semi Bold
- **Toolbar sticky**: card branco radius 8 padding 16 — busca 320px + botão Filtros com badge + chips ativos + "Limpar tudo" sublinhado + switchers de densidade/visão à direita
- **Tabela**: cabeçalho 43 de altura, linhas com faixa colorida à esquerda indicando severidade, badge de aptidão na primeira coluna, paginação no rodapé
- **Painel de detalhe (380)**: avatar circular + nome + badge de situação → alerta em caixa colorida → seções com label uppercase 11 → linha do tempo de movimentações → linha de botões no fim
