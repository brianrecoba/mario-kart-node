const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};
const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "reta";
      break;
    case random < 0.66:
      result = "curva";
      break;
    default:
      result = "confronto";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(characterOne, characterTwo) {
  for (let round = 1; round <= 5; round++) {
    console.log(`Rodada ${round}`);

    //sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "reta") {
      totalTestSkill1 = diceResult1 + characterOne.velocidade;
      totalTestSkill2 = diceResult2 + characterTwo.velocidade;

      await logRollResult(
        characterOne.nome,
        "velocidade",
        diceResult1,
        characterOne.velocidade
      );

      await logRollResult(
        characterTwo.nome,
        "velocidade",
        diceResult2,
        characterTwo.velocidade
      );
    }
    if (block === "curva") {
      totalTestSkill1 = diceResult1 + characterOne.manobrabilidade;
      totalTestSkill2 = diceResult2 + characterTwo.manobrabilidade;

      await logRollResult(
        characterOne.nome,
        "manobrabilidade",
        diceResult1,
        characterOne.manobrabilidade
      );
      await logRollResult(
        characterTwo.nome,
        "manobrabilidade",
        diceResult2,
        characterTwo.manobrabilidade
      );
    }
    if (block === "confronto") {
      let powerResult1 = diceResult1 + characterOne.poder;
      let powerResult2 = diceResult2 + characterTwo.poder;

      console.log(`${characterOne.nome} confrontou o ${characterTwo.nome}!`);

      await logRollResult(
        characterOne.nome,
        "poder",
        diceResult1,
        characterOne.poder
      );

      await logRollResult(
        characterTwo.nome,
        "poder",
        diceResult2,
        characterTwo.poder
      );

      if (powerResult1 > powerResult2 && characterTwo.pontos > 0) {
        console.log(`${characterOne.nome} venceu o confronto! ${characterTwo.nome} perdeu um ponto!`);
        characterTwo.pontos--;
      }

      if (powerResult2 > powerResult1 && characterOne.pontos > 0) {
        console.log(`${characterTwo.nome} venceu o confronto! ${characterOne.nome} perdeu um ponto!`);
        characterOne.pontos--;
      }

      console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido!" : "");

    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${characterOne.nome} marcou um ponto!`);
      characterOne.pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${characterTwo.nome} marcou um ponto!`);
      characterTwo.pontos++;
    }
    console.log("------------------------------------");
  }
}
async function declareWinner(characterOne, characterTwo) {
    console.log("Resultado final: ")
    console.log(`${characterOne.nome}: ${characterOne.pontos} ponto(s)!`)
    console.log(`${characterTwo.nome}: ${characterTwo.pontos} ponto(s)!`)

    if(characterOne.pontos > characterTwo.pontos){
        console.log(`\n${characterOne.nome} venceu a corrida! Parabéns!`)
    }else if(characterTwo.pontos > characterOne.pontos){
        console.log(`\n${characterTwo.nome} venceu a corrida! Parabéns!`)
    }else{
        console.log("A corrida terminou em empate");
    }
}
(async function main() {
  console.log(
    `🏁🕹Corrida entre ${player1.nome} e ${player2.nome} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2)
})();
