import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3005;

app.post('/aprovacao', (req, res) => {
  const { nome, nota1, nota2, frequencia, trabalho } = req.body;

  if (!nome || !nota1 || !nota2 || !frequencia || !trabalho) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  let media = (Number(nota1) + Number(nota2)) / 2;
  let situacao = "";

  if (Number(frequencia) < 75) {
    situacao = "Reprovado por falta";
  } else {
    if (media >= 6.5 && media <= 6.9) {
        const bonus = Math.min(Number(trabalho), 0.5);
        media = media + bonus;
    }
    if (media > 10) media = 10;

    if (media >= 7) situacao = "Aprovado";
    else if (media >= 5) situacao = "Recuperação";
    else situacao = "Reprovado";
  }

  return res.status(200).json({
    nome,
    nota1: Number(nota1),
    nota2: Number(nota2),
    frequencia: Number(frequencia),
    trabalho: Number(trabalho),
    mediaFinal: Number(media.toFixed(2)),
    situacao
  });
});

app.post('/financiamento', (req, res) => {
  const { valorVeiculo, entrada, parcelas, rendaMensal, restricaoCpf } = req.body;

  if (!valorVeiculo || !entrada || !parcelas || !rendaMensal || !restricaoCpf) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const valor = Number(valorVeiculo);
  const valorEntrada = Number(entrada);
  const qtdParcelas = Number(parcelas);
  const renda = Number(rendaMensal);
  const motivos = [];

  const minimoEntrada = valor * 0.20;
  if (valorEntrada < minimoEntrada) {
    motivos.push(`Entrada insuficiente. Mínimo: R$ ${minimoEntrada.toFixed(2)} (20%)`);
  }
  if (restricaoCpf === true || restricaoCpf === "true") {
    motivos.push("Comprador possui restrição no CPF");
  }
  if (qtdParcelas < 12 || qtdParcelas > 60) {
    motivos.push("Quantidade de parcelas deve estar entre 12 e 60");
  }

  const valorFinanciado = valor - valorEntrada;
  const valorParcela = valorFinanciado / qtdParcelas;

  if (valorParcela > renda * 0.30) {
    motivos.push(`Parcela (R$ ${valorParcela.toFixed(2)}) compromete mais de 30% da renda`);
  }

  if (motivos.length > 0) {
    return res.status(200).json({
      aprovado: false,
      motivos,
      valorFinanciado: Number(valorFinanciado.toFixed(2)),
      valorParcela: Number(valorParcela.toFixed(2))
    });
  }

  return res.status(200).json({
    aprovado: true,
    valorFinanciado: Number(valorFinanciado.toFixed(2)),
    valorParcela: Number(valorParcela.toFixed(2)),
    parcelas: qtdParcelas
  });
});

app.post('/restaurante', (req, res) => {
  const { tipoCliente, valorProdutos, formaPagamento, entrega } = req.body;

  if (!tipoCliente || !valorProdutos || !formaPagamento || !entrega) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const bruto = Number(valorProdutos);
  let descontoCliente = 0;
  let descontoPagamento = 0;
  let acrescimoPagamento = 0;
  let taxaEntrega = 0;

  const tipo = String(tipoCliente).toLowerCase();
  if (tipo === "estudante") descontoCliente = bruto * 0.10;
  else if (tipo === "funcionario") descontoCliente = bruto * 0.20;

  let subtotal = bruto - descontoCliente;
  const pagamento = String(formaPagamento).toLowerCase();

  if (pagamento === "pix") {
    descontoPagamento = subtotal * 0.05;
    subtotal -= descontoPagamento;
  }

  if (pagamento === "credito" || pagamento === "cartao de credito") {
    acrescimoPagamento = subtotal * 0.03;
    subtotal += acrescimoPagamento;
  }

  const isEntrega = entrega === true || entrega === "true" || entrega === "entrega";
  if (isEntrega) {
    taxaEntrega = bruto > 150 ? 0 : 8;
    subtotal += taxaEntrega;
  }

  return res.status(200).json({
    valorBruto: Number(bruto.toFixed(2)),
    descontoCliente: Number(descontoCliente.toFixed(2)),
    descontoPagamento: Number(descontoPagamento.toFixed(2)),
    acrescimoPagamento: Number(acrescimoPagamento.toFixed(2)),
    taxaEntrega: Number(taxaEntrega.toFixed(2)),
    valorFinal: Number(subtotal.toFixed(2))
  });
});

app.post('/salario', (req, res) => {
  const { salarioBase, horasExtras, valorHoraExtra, dependentes, assiduidade, planoSaude } = req.body;

  if (!salarioBase || !horasExtras|| !valorHoraExtra || !dependentes || !assiduidade || !planoSaude ) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const base = Number(salarioBase);
  const valorHorasExtras = Number(horasExtras) * Number(valorHoraExtra);
  const adicionalAssiduidade = Number(assiduidade) >= 95 ? base * 0.05 : 0;
  const beneficioDependentes = Number(dependentes) * 150;

  const salarioBruto = base + valorHorasExtras + adicionalAssiduidade + beneficioDependentes;

  const temPlano = planoSaude === true || planoSaude === "true";
  const descontoPlano = temPlano ? base * 0.05 : 0;

  let aliquotaInss = 0.075;
  if (salarioBruto > 4000) aliquotaInss = 0.14;
  else if (salarioBruto > 2500) aliquotaInss = 0.12;
  else if (salarioBruto > 1500) aliquotaInss = 0.09;

  const descontoInss = salarioBruto * aliquotaInss;
  const totalDescontos = descontoPlano + descontoInss;
  const salarioLiquido = salarioBruto - totalDescontos;

  return res.status(200).json({
    salarioBruto: Number(salarioBruto.toFixed(2)),
    horasExtras: Number(valorHorasExtras.toFixed(2)),
    adicionalAssiduidade: Number(adicionalAssiduidade.toFixed(2)),
    beneficioDependentes: Number(beneficioDependentes.toFixed(2)),
    descontos: {
        planoSaude: Number(descontoPlano.toFixed(2)),
        inss: Number(descontoInss.toFixed(2)),
        total: Number(totalDescontos.toFixed(2))
    },
    salarioLiquido: Number(salarioLiquido.toFixed(2))
  });
});

app.post('/energia', (req, res) => {
  const { consumo, tipoResidencia, moradores, tarifaSocial, atrasado, diasAtraso } = req.body;

  if (!consumo || !tipoResidencia || !moradores || !tarifaSocial || !atrasado) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const kwh = Number(consumo);
  let valor = 0;

  if (kwh <= 100) valor = kwh * 0.55;
  else if (kwh <= 250) valor = kwh * 0.70;
  else valor = kwh * 0.90;

  const social = tarifaSocial === true || tarifaSocial === "true";
  if (social && kwh <= 150) {
    valor = valor * 0.80;
  }

  const tipo = String(tipoResidencia).toLowerCase();
  if (tipo === "comercial") {
    valor = valor * 1.25;
  }

  const estaAtrasado = atrasado === true || atrasado === "true";
  let multa = 0;
  let juros = 0;
  if (estaAtrasado) {
    multa = valor * 0.02;
    juros = Number(diasAtraso || 0) * 0.50;
    valor = valor + multa + juros;
  }

  return res.status(200).json({
    consumo: kwh,
    moradores: Number(moradores),
    multa: Number(multa.toFixed(2)),
    juros: Number(juros.toFixed(2)),
    valorFinal: Number(valor.toFixed(2))
  });
});

app.post('/pontuacao', (req, res) => {
  const { tarefasConcluidas, tarefasAtrasadas, avaliacaoClientes, faltas, tempoEmpresa } = req.body;

  if (!tarefasConcluidas || !tarefasAtrasadas || !avaliacaoClientes || !faltas || !tempoEmpresa ) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  let pontuacao = 0;
  pontuacao += Number(tarefasConcluidas) * 2;
  pontuacao -= Number(tarefasAtrasadas) * 3;
  if (Number(avaliacaoClientes) >= 4.5) pontuacao += 10;
  pontuacao -= Number(faltas) * 5;
  if (Number(tempoEmpresa) > 3) pontuacao += 20;

  let classificacao = "";
  if (pontuacao >= 100) classificacao = "Destaque";
  else if (pontuacao >= 70) classificacao = "Bom desempenho";
  else if (pontuacao >= 40) classificacao = "Desempenho regular";
  else classificacao = "Necessita acompanhamento";

  return res.status(200).json({
    pontuacao,
    classificacao
  });
});

app.post('/nota-fiscal', (req, res) => {
  const { valorProdutos, estadoOrigem, estadoDestino, tipoCliente, tipoProduto, formaPagamento, parcelas } = req.body;

  if (!valorProdutos || !estadoOrigem || !estadoDestino || !tipoCliente || !tipoProduto || !formaPagamento) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const subtotal = Number(valorProdutos);
  const icmsPorEstado = { SP: 0.18, RJ: 0.20, MG: 0.18, RS: 0.17, PR: 0.18, BA: 0.19, SC: 0.17 };
  const aliquota = icmsPorEstado[String(estadoOrigem).toUpperCase()] || 0.17;
  const icms = subtotal * aliquota;

  let desconto = 0;
  if (subtotal > 1000) desconto += subtotal * 0.08;

  const cliente = String(tipoCliente).toLowerCase();
  if (cliente === "juridica" || cliente === "pj") {
    desconto += subtotal * 0.03;
  }

  let acrescimo = 0;
  const qtdParcelas = Number(parcelas || 1);
  const pagamento = String(formaPagamento).toLowerCase();
  if ((pagamento === "parcelado" || pagamento === "credito") && qtdParcelas > 6) {
    acrescimo += subtotal * 0.07;
  }

  let frete = 0;
  if (String(estadoOrigem).toUpperCase() !== String(estadoDestino).toUpperCase()) {
    frete = 50;
  }
  if (subtotal > 800) frete = 0;

  const produto = String(tipoProduto).toLowerCase();
  let transporteFragil = 0;
  if (produto === "fragil") {
    transporteFragil = 25;
  }

  const valorTotal = subtotal + icms - desconto + acrescimo + frete + transporteFragil;

  return res.status(200).json({
    subtotal: Number(subtotal.toFixed(2)),
    icms: Number(icms.toFixed(2)),
    desconto: Number(desconto.toFixed(2)),
    acrescimo: Number(acrescimo.toFixed(2)),
    frete: Number(frete.toFixed(2)),
    transporteFragil: Number(transporteFragil.toFixed(2)),
    valorTotal: Number(valorTotal.toFixed(2))
  });
});

app.post('/agua', (req, res) => {
  const { consumo, moradores, tipoImovel, vazamento, diasAtraso } = req.body;

  if (!consumo || !moradores || !tipoImovel || !vazamento || !diasAtraso) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const m3 = Number(consumo);
  let valor = 0;

  if (m3 <= 10) valor = 35;
  else if (m3 <= 20) valor = m3 * 4.50;
  else if (m3 <= 40) valor = m3 * 6.00;
  else valor = m3 * 8.50;

  const tipo = String(tipoImovel).toLowerCase();
  if (tipo === "comercial") {
    valor = valor * 1.30;
  }

  const temVazamento = vazamento === true || vazamento === "true";
  if (temVazamento) {
    valor = valor * 0.85;
  }

  if (Number(diasAtraso) > 0) {
    valor = valor * 1.02;
  }

  const mediaEsperada = Number(moradores) * 4;
  let statusConsumo = "";
  if (m3 <= mediaEsperada) statusConsumo = "Dentro da média";
  else if (m3 <= mediaEsperada * 1.5) statusConsumo = "Acima da média";
  else statusConsumo = "Muito acima da média";

  return res.status(200).json({
    consumo: m3,
    valorFinal: Number(valor.toFixed(2)),
    statusConsumo,
    mediaEsperada
  });
});

app.post('/hotel', (req, res) => {
  const { diarias, tipoQuarto, hospedes, idadeHospede, altaTemporada, fidelizado } = req.body;

  if (diarias == null || !tipoQuarto || hospedes == null || idadeHospede == null || altaTemporada == null || fidelizado == null) {
    return res.status(400).json({ message: "Dados incompletos!" });
  }

  const tipo = String(tipoQuarto).toLowerCase();
  let valorDiaria = 0;
  let capacidade = 0;

  if (tipo === "simples") {
    valorDiaria = 180;
    capacidade = 2;
  } else if (tipo === "duplo") {
    valorDiaria = 280;
    capacidade = 4;
  } else if (tipo === "suite" || tipo === "suíte") {
    valorDiaria = 450;
    capacidade = 4;
  } else {
    return res.status(400).json({ message: "Tipo de quarto inválido! Use: simples, duplo ou suite" });
  }

  if (Number(hospedes) > capacidade) {
    return res.status(200).json({
      aprovada: false,
      motivo: `Quantidade de hóspedes (${hospedes}) excede a capacidade do quarto (${capacidade})`
    });
  }

  let valor = valorDiaria * Number(diarias);

  const temporada = altaTemporada === true || altaTemporada === "true";
  if (temporada) valor = valor * 1.30;

  const clienteFiel = fidelizado === true || fidelizado === "true";
  if (clienteFiel) valor = valor * 0.90;

  if (Number(diarias) > 5) valor = valor * 0.92;

  return res.status(200).json({
    aprovada: true,
    diarias: Number(diarias),
    tipoQuarto: tipo,
    hospedes: Number(hospedes),
    idadeHospede: Number(idadeHospede),
    valorFinal: Number(valor.toFixed(2))
  });
});

app.post('/cadastro', (req, res) => {
  const { nome, idade, email, senha, confirmacaoSenha, tipoUsuario, termos } = req.body;
  const erros = [];
  const tiposValidos = ["comum", "admin", "moderador", "cliente"];

  if (!nome || String(nome).trim().split(/\s+/).length < 2) {
    erros.push("O nome deve possuir pelo menos duas palavras");
  }
  if (idade == null || Number(idade) < 18) {
    erros.push("A idade deve ser igual ou superior a 18 anos");
  }
  if (!email || !String(email).includes("@") || !String(email).includes(".")) {
    erros.push("O e-mail deve possuir @ e .");
  }
  if (!senha || String(senha).length < 8) {
    erros.push("A senha deve possuir pelo menos 8 caracteres");
  }
  if (senha !== confirmacaoSenha) {
    erros.push("A senha e a confirmação devem ser iguais");
  }
  if (!tipoUsuario || !tiposValidos.includes(String(tipoUsuario).toLowerCase())) {
    erros.push(`Tipo de usuário inválido. Use: ${tiposValidos.join(", ")}`);
  }
  if (termos !== true && termos !== "true") {
    erros.push("Os termos devem ser aceitos");
  }

  if (erros.length > 0) {
    return res.status(400).json({
      valido: false,
      erros
    });
  }

  return res.status(201).json({
    valido: true,
    message: "Cadastro realizado com sucesso!"
  });
});

app.listen(PORT, () => {
    console.log(`servidor rodando porta: ${PORT}`);
});
    