# Análise Crítica — Módulo Limpeza Urbana

Leitura do `Módulo Limpeza Urbana.docx` com foco no que precisa ser resolvido antes de
fechar o escopo. Protótipo correspondente:
https://www.figma.com/design/HSJbapMBeV23ea855QsLp3

---

## 1. Correção estrutural: a quem pertence a prestação de contas

### 1.1 A RN006 está no requisito errado e no ator errado

O texto atual, dentro do RF-LIMP-01 (Gestão de Equipes), diz:

> "Toda finalização de serviço deve ser emitido um relatório para prestação de contas,
> com informações do serviço feito e fotos anexadas para comprovação."

São dois erros num só requisito. Primeiro, ele está em **Gestão de Equipes** mas descreve
o encerramento de uma **atividade**. Segundo — e mais grave — ele coloca a prestação de
contas como um evento **por atividade, emitido pelo Encarregado em campo**.

Prestação de contas não é isso. É um **instrumento de gestão**, consolidado, emitido
**pelo Gestor** ao final de um período, com recorte administrativo: o mês, um setor
urbano, um supervisor, uma equipe, um tipo de serviço. É a peça que a Secretaria leva ao
Tribunal de Contas, ao Legislativo ou à sociedade — não um comprovante que o gari emite
no celular ao terminar a varrição da rua.

Emitir 214 relatórios individuais por mês não presta conta de nada: ninguém consolida 214
PDFs. O que presta conta é **um** documento dizendo que em julho foram executadas 214
atividades, 842 km, com 94,2% de aderência aos checkpoints e 22 não conformidades.

**Correção proposta — dividir em dois requisitos distintos:**

| | Encerramento da atividade | Prestação de contas |
|---|---|---|
| **Onde** | RF-LIMP-03, nova RN010 | Novo **RF-LIMP-09** |
| **Ator** | Encarregado (campo) | Gestor Operacional / Supervisor |
| **Quando** | ao finalizar a atividade | ao fechar o período |
| **Saída** | comprovante em tela, registro imutável | documento consolidado, PDF/Excel/CSV |
| **Recorte** | uma atividade | mês, setor, supervisor, equipe, tipo de serviço |
| **Função** | dar baixa e travar a evidência | comprovar execução perante terceiros |

O que o Encarregado faz ao finalizar é **fechar e lacrar o registro** — não emitir peça
de prestação de contas. O relatório do gestor é construído *a partir* desses registros
lacrados.

**RF-LIMP-09 — Prestação de Contas** deve especificar:
- Recorte por período, setor urbano, supervisor, equipe e tipo de serviço (combináveis)
- Totais consolidados: atividades executadas, extensão, horas-equipe, aderência a
  checkpoints, ocorrências, não conformidades
- Quebra por setor com linha de total
- Declaração de rastreabilidade: volume de fotos georreferenciadas e checkpoints, com
  indicação de onde o anexo digital fica disponível e por quanto tempo
- **Atividades não realizadas entram no relatório** — omitir o que não foi feito
  descaracteriza a prestação de contas
- Exportação em PDF (com campos de assinatura), Excel e CSV
- Histórico de emissões anteriores, com autor e data

Telas: `relatorio-prestacao-contas-desktop-light` (gestor) e
`encerramento-atividade-mobile-light` (encarregado, comprovante).

---

## 2. Lacunas que travam a implementação

### 2.1 Não existe RF de programação/escala de atividades

O RF-LIMP-03 tem o estado inicial "Planejada — atividade programada, não iniciada", e o
RF-LIMP-06 diz que a Central mostra "as atividades designadas àquele Encarregado".

**Mas nenhum requisito diz quem programa, quando e como.** Falta o RF que cria a
atividade no estado Planejada — a escala que amarra equipe + itinerário + data + turno.
Sem ele, o RF-LIMP-06 não tem origem de dados e o RF-LIMP-03 não tem como sair de
"Planejada".

**Recomendação:** criar **RF-LIMP-08 — Programação de Atividades**, com escala semanal
ou mensal, replicação de padrão (ex.: "VAR-014 toda terça e quinta, turno manhã") e
tratamento de feriados. É o requisito mais importante que está faltando.
Tela: `programacao-atividades-desktop-light`.

### 2.2 Máquina de estados incompleta

A tabela do RF-LIMP-03 tem dois furos:

- **`Em Execução` não permite `→ Cancelada`.** Só permite Pausada e Concluída. Se a
  equipe iniciar a atividade errada, ou um evento grave inviabilizar o serviço, não há
  saída — e o RN009 então bloqueia a equipe de iniciar qualquer outra atividade,
  indefinidamente.
- **Não há estado para atividade não iniciada no prazo.** Uma atividade Planejada para
  ontem que ninguém iniciou continua "Planejada" para sempre, poluindo a Central de
  Tarefas e distorcendo o indicador de cobertura.

**Recomendação:** permitir `Em Execução → Cancelada` (com justificativa obrigatória) e
adicionar o estado terminal **`Não Realizada`**, aplicado automaticamente na virada do
dia operacional para atividades Planejadas que nunca iniciaram.

Máquina de estados corrigida:

| Estado | Transições permitidas |
|---|---|
| Planejada | → Em Execução, → Cancelada, → **Não Realizada** (automático na virada do dia) |
| Em Execução | → Pausada, → Concluída, → **Cancelada** (com justificativa) |
| Pausada | → Em Execução, → Cancelada |
| Concluída | (final) |
| Cancelada | (final) |
| **Não Realizada** | (final) |

Tela: `atividades-desktop-light`.

### 2.3 RN009 precisa de escape para o Supervisor

"Uma equipe não pode iniciar nova atividade enquanto possuir atividade anterior Em
Execução." Correto, mas se o celular do Encarregado quebrar ou ficar sem bateria no meio
do trajeto, a atividade fica presa e a equipe inteira fica bloqueada.

**Recomendação:** dar ao Supervisor a permissão de encerrar ou cancelar
administrativamente uma atividade travada, com justificativa obrigatória e registro na
auditoria do Núcleo. Prototipado no painel lateral de `atividades-desktop-light`.

### 2.4 Numeração de regra errada no RNF-LIMP-03

O RNF-LIMP-03 cita "o registro de checkpoints (RF-LIMP-03 **RN003**)". A regra de
registro de checkpoint é a RN003 mesmo, mas o texto do RNF fala de enfileiramento
offline, que não está em nenhuma RN do RF-LIMP-03 — a resiliência offline só aparece no
RF-LIMP-06 RN004.

**Recomendação:** adicionar ao RF-LIMP-03 uma RN explícita de enfileiramento local, já
que o registro de checkpoint é justamente a ação que mais acontece sem sinal.

### 2.5 Retenção de 1 ano conflita com o ciclo de fiscalização

O RNF-LIMP-02 fixa retenção de fotografias em 1 ano. Mas o RN008 do RF-LIMP-03 usa essas
fotos como **evidência em reclamações do módulo Atendimento**, e a RN004 do RF-LIMP-05
gera Ordem de Serviço a partir de não conformidade.

Se um processo administrativo ou judicial sobre limpeza pública durar mais de um ano —
o que é comum — a evidência já terá sido expurgada. Pior: o relatório de prestação de
contas do RF-LIMP-09 **declara** que as fotos existem.

**Recomendação:** retenção de 1 ano para a **massa** de fotos, e retenção estendida
(5 anos, alinhado ao prazo prescricional) para fotos vinculadas a ocorrência crítica, não
conformidade, ou reclamação do Atendimento. O expurgo precisa checar esse vínculo antes
de apagar.

---

## 3. Melhorias de produto

### 3.1 O RN004 sinaliza mas não age

"O sistema sinaliza (sem bloquear) quando um checkpoint é registrado fora da sequência
esperada ou quando um checkpoint é pulado."

Sinalizar para quem? Se for só um aviso na tela do Encarregado, ele fecha e segue.
A informação precisa chegar em quem fiscaliza.

**Recomendação:** o desvio de sequência deve entrar no encerramento da atividade,
alimentar a fila de fiscalização e ser contabilizado na prestação de contas — um
itinerário com muitos checkpoints pulados é exatamente o candidato prioritário para
inspeção do Fiscal. No protótipo aparece na trilha de
`execucao-atividade-mobile-light`, checkpoint 13 em âmbar.

### 3.2 Falta validação de raio geográfico no checkpoint

A RN003 captura GPS no toque, mas nada compara essa coordenada com a coordenada
planejada do checkpoint no itinerário. Um Encarregado pode bater todos os 24 pontos
sentado no mesmo lugar.

Isso é especialmente sério porque o relatório de prestação de contas apresenta o
percentual de checkpoints como indicador de execução. Sem validação de raio, esse número
não comprova nada.

**Recomendação:** calcular a distância entre a coordenada capturada e a planejada, e
sinalizar (mesmo padrão do RN004 — sem bloquear, dado que GPS urbano erra) quando o
desvio ultrapassar um raio parametrizável por município. Prototipado no checkpoint 14
("180 m do ponto planejado").

### 3.3 O perfil Encarregado precisa ser resolvido agora

O próprio documento marca isso como pendência. Vale reforçar: sem esse perfil no RF002
do Núcleo, nada do RF-LIMP-03 e RF-LIMP-06 é implementável — não há a quem atribuir a
permissão de iniciar atividade.

### 3.4 Compressão de imagem precisa de número

O RNF-LIMP-04 pede compressão "preservando legibilidade suficiente para auditoria" — não
é testável. Com Campo Grande em 150 fotos/dia, a diferença entre 300 KB e 2 MB por foto
é de 45 MB/dia contra 300 MB/dia.

**Recomendação:** fixar alvo (ex.: lado maior 1600 px, JPEG qualidade 80, teto de 400 KB)
como critério de aceitação do RNF.

---

## 4. Prioridade sugerida

| # | Item | Por quê |
|---|---|---|
| 1 | RF-LIMP-09 — Prestação de Contas (gestor) + RN006 realocada | Ator e recorte errados no documento atual |
| 2 | RF-LIMP-08 — Programação de Atividades | Sem ele, RF-03 e RF-06 não funcionam |
| 3 | Perfil Encarregado no Núcleo | Bloqueia atribuição de permissão |
| 4 | Máquina de estados + escape do supervisor | Trava operacional real |
| 5 | Validação de raio no checkpoint | Sustenta o número que vai no relatório |
| 6 | Retenção estendida para fotos vinculadas | Risco jurídico e de integridade do relatório |

---

## 5. Telas prototipadas

**Desktop (1440×900)** — página `01 · Desktop — Gestão`

| Tela | Requisito |
|---|---|
| `equipes-desktop-light` | RF-LIMP-01 — tabela, filtros, painel com composição e histórico |
| `itinerarios-desktop-light` | RF-LIMP-02 — versionamento, mapa com checkpoints sequenciais |
| `programacao-atividades-desktop-light` | **RF-LIMP-08 proposto** — escala semanal por equipe |
| `atividades-desktop-light` | RF-LIMP-03 — estados corrigidos + escape administrativo |
| `indicadores-desktop-light` | RF-LIMP-07 — KPIs, cobertura por setor, ocorrências |
| `relatorio-prestacao-contas-desktop-light` | **RF-LIMP-09 proposto** — emissão pelo gestor |

**Mobile (390×844)** — página `02 · Mobile — Campo`

| Tela | Requisito |
|---|---|
| `central-tarefas-mobile-light` | RF-LIMP-06 — tarefas do dia, fila offline |
| `execucao-atividade-mobile-light` | RF-LIMP-03 — "bater ponto", desvio de sequência e de raio |
| `fiscalizacao-mobile-light` | RF-LIMP-05 — inspeção, não conformidade, OS automática |
| `encerramento-atividade-mobile-light` | RF-LIMP-03 RN010 proposta — comprovante lacrado |

Identidade visual herdada de `design-tokens-coleta-inteligente.md` (Geist, paleta
slate/blue, sidebar `#071724`). Navegação ganhou dois destinos: **Programação** e
**Relatórios**.

---

## 6. Fluxos para apresentação

Página `03 · Fluxos de Apresentação` — board único com as telas em miniatura conectadas,
codificadas por ator (Gestor/Supervisor em azul, Encarregado em verde, Fiscal em roxo).

**Fluxo 1 — Planejamento e execução do serviço**
Equipes → Itinerários → Programação → *(gera atividades Planejada)* → Central de Tarefas
→ Execução → Encerramento → *(alimenta o painel)* → Atividades.
Mostra a passagem de mão do gestor para o campo e a volta do dado para o gestor.

**Fluxo 2 — Fiscalização e correção**
Atividades → Fiscalização → Resultado da inspeção → *(não conforme)* → Ordem de Serviço
automática no Núcleo → *(reexecução)* → Programação.
É o único fluxo cíclico: a reprovação do Fiscal volta para a escala como nova atividade.

**Fluxo 3 — Consolidação e prestação de contas**
Atividades → Consolidação automática → Indicadores → *(no fechamento)* → Prestação de
Contas → Documento oficial (PDF assinável, Excel, CSV).
Deixa explícito que a peça de prestação de contas nasce dos registros lacrados em campo,
e que atividades Não Realizadas entram na consolidação.

O rodapé do board destaca os três requisitos propostos (RF-LIMP-08, RF-LIMP-09 e a RN010
que substitui a RN006), separando o que já existe no documento do que está sendo
proposto.
