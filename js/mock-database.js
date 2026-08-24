/* ==========================================================================
   BANCO DE DADOS SIMULADO (MOCK DATABASE) — PLATAFORMA COLETA INTELIGENTE
   Contém entidades vivas e interativas para simulação de todos os 8 módulos
   ========================================================================== */

const MockDB = {
  // Configurações do Município
  municipio: {
    nome: "Prefeitura Municipal de Campo Grande - MS",
    contrato: "CT-2026/048 - Concessionária CG Limpeza",
    populacao: "916.000 hab",
    area: "8.096 km²"
  },

  // 1. Módulo Limpeza Urbana
  limpezaUrbana: {
    equipes: [
      { id: "EQP-01", nome: "Equipe Varrição Centro-Norte", encarregado: "José Carlos Silva", integrantes: 8, servico: "Varrição Manual", turno: "Manhã", status: "Em Execução", cor: "Verde" },
      { id: "EQP-02", nome: "Equipe Capina e Roçada Afonso Pena", encarregado: "Marcos Souza", integrantes: 12, servico: "Capina/Roçada", turno: "Manhã", status: "Em Execução", cor: "Verde" },
      { id: "EQP-03", nome: "Equipe Bueiros e Desobstáculos", encarregado: "Antônio Ferreira", integrantes: 6, servico: "Limpeza de Bueiros", turno: "Tarde", status: "Pausada", cor: "Ambar" },
      { id: "EQP-04", nome: "Equipe Lavagem Calçadão Barão", encarregado: "Claudio Mendes", integrantes: 4, servico: "Lavagem de Logradouros", turno: "Noite", status: "Planejada", cor: "Slate" }
    ],
    itinerarios: [
      { id: "ITN-101", nome: "Itinerário Barão do Rio Branco", extensão: "4.8 km", checkpoints: 24, setor: "Setor 01 - Centro", status: "Ativo" },
      { id: "ITN-102", nome: "Itinerário Afonso Pena Norte", extensão: "8.2 km", checkpoints: 36, setor: "Setor 02 - Jardim dos Estados", status: "Ativo" },
      { id: "ITN-103", nome: "Itinerário Orla Morena", extensão: "3.5 km", checkpoints: 18, setor: "Setor 04 - Cabreúva", status: "Ativo" }
    ],
    atividades: [
      { id: "ATV-2026-0891", equipe: "EQP-01", itinerario: "ITN-101", inicio: "07:00", previsaoFim: "15:00", checkpointsBatidos: 18, totalCheckpoints: 24, progresso: 75, status: "Em Execução" },
      { id: "ATV-2026-0892", equipe: "EQP-02", itinerario: "ITN-102", inicio: "07:30", previsaoFim: "16:00", checkpointsBatidos: 22, totalCheckpoints: 36, progresso: 61, status: "Em Execução" },
      { id: "ATV-2026-0893", equipe: "EQP-03", itinerario: "ITN-103", inicio: "13:00", previsaoFim: "19:00", checkpointsBatidos: 5, totalCheckpoints: 18, progresso: 27, status: "Pausada" }
    ]
  },

  // 2. Módulo Coleta Convencional e Seletiva
  coleta: {
    frota: [
      { id: "VEIC-01", placa: "QAB-4E12", tipo: "Compactador 15m³", modelo: "Mercedes-Benz Atego", ano: 2024, hodometro: "42.850 km", status: "Em Rota", telemetria: "Online (GPS)" },
      { id: "VEIC-02", placa: "RST-9A88", tipo: "Compactador 19m³", modelo: "Volkswagen Constellation", ano: 2025, hodometro: "18.300 km", status: "Em Rota", telemetria: "Online (GPS)" },
      { id: "VEIC-03", placa: "HQW-3140", tipo: "Poliguindaste Duplo", modelo: "Ford Cargo", ano: 2022, hodometro: "98.120 km", status: "Manutenção", telemetria: "Oficina" }
    ],
    motoristas: [
      { id: "MOT-01", nome: "Carlos Eduardo Souza", cnh: "04981293810 - Cat. E", validadeCNH: "12/2028", pontuacao: 0, status: "Em Rota" },
      { id: "MOT-02", nome: "Roberto Ramos", cnh: "01928374650 - Cat. D", validadeCNH: "08/2027", pontuacao: 0, status: "Em Rota" },
      { id: "MOT-03", nome: "Gerson Oliveira", cnh: "03829103948 - Cat. E", validadeCNH: "03/2029", pontuacao: 0, status: "Folga" }
    ],
    pesagens: [
      { id: "PSG-8819", dataHora: "24/08/2026 14:32", placa: "QAB-4E12", motorista: "Carlos Eduardo", pesoBruto: "24.180 kg", tara: "11.200 kg", pesoLiquido: "12.980 kg", aterro: "Aterro Dom Antônio Barbosa" },
      { id: "PSG-8820", dataHora: "24/08/2026 15:10", placa: "RST-9A88", motorista: "Roberto Ramos", pesoBruto: "28.450 kg", tara: "12.800 kg", pesoLiquido: "15.650 kg", aterro: "Aterro Dom Antônio Barbosa" }
    ]
  },

  // 3. Módulo Fiscalização
  fiscalizacao: {
    fiscais: [
      { id: "FISC-01", nome: "Eng. Amanda Prado", matricula: "F-4412", setorAtuacao: "Região Urbana do Centro", osConcluidas: 142 },
      { id: "FISC-02", nome: "Luciano Bezerra", matricula: "F-3910", setorAtuacao: "Região do Anhanduizinho", osConcluidas: 98 }
    ],
    ocorrencias: [
      { id: "OCR-992", local: "Av. Calógeras, 1820 - Centro", tipo: "Descarte Irregular de Entulho", severidade: "Alta", foto: true, data: "24/08/2026 10:15", status: "OS Corretiva Gerada" },
      { id: "OCR-993", local: "Rua Ceará, 450 - Miguel Couto", tipo: "Atraso no Horário de Coleta", severidade: "Média", foto: false, data: "24/08/2026 11:40", status: "Em Investigação" }
    ]
  },

  // 4. Módulo Atendimento ao Cidadão (SAC)
  sac: {
    solicitacoes: [
      { protocolo: "20260824-0012", cidadao: "Mariana Alcantara", servico: "Coleta de Móveis/Cata-Treco", bairro: "Jardim dos Estados", sla: "24h restantes", status: "Agendado" },
      { protocolo: "20260824-0015", cidadao: "Fernando Ribeiro", servico: "Reclamação de Lixo Acumulado", bairro: "Tiradentes", sla: "4h restantes", status: "Em Atendimento" }
    ]
  },

  // 5. Módulo Ecoponto
  ecoponto: {
    unidades: [
      { id: "ECO-01", nome: "Ecoponto Panamá", endereco: "Av. Pantanal, s/n - Panamá", lotacao: "85%", status: "Crítico", cacambasDisponiveis: 2 },
      { id: "ECO-02", nome: "Ecoponto Noroeste", endereco: "Rua Indianápolis, 1200", lotacao: "42%", status: "Normal", cacambasDisponiveis: 6 }
    ]
  },

  // 6. Módulo Ambiental (Cooperativas)
  ambiental: {
    cooperativas: [
      { id: "COOP-01", nome: "Cooperativa Coopcat", catadores: 45, producaoMensal: "84.5 toneladas", fardosEstoque: 120, status: "Operacional" },
      { id: "COOP-02", nome: "Associação Novo Olhar", catadores: 28, producaoMensal: "52.0 toneladas", fardosEstoque: 65, status: "Operacional" }
    ]
  },

  // 7. Módulo Compliance e Auditoria
  compliance: {
    dossies: [
      { periodo: "Julho / 2026", valorFaturado: "R$ 4.820.150,00", valorAuditado: "R$ 4.820.150,00", desvio: "0.0%", evidenciasFotos: 14820, status: "Aprovado TCE" },
      { periodo: "Agosto / 2026 (Parcial)", valorFaturado: "R$ 3.120.400,00", valorAuditado: "R$ 3.118.200,00", desvio: "-0.07%", evidenciasFotos: 9410, status: "Em Conciliação" }
    ]
  }
};
