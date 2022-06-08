var database = require("../database/config");

function buscarUltimasMedidas(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP ${limite_linhas}
                            nomeUsuario, pontuacao
                            FROM Usuario
                                JOIN Partida
                                    ON fkUsuario = idUsuario
                                ORDER BY pontuacao DESC;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeUsuario, pontuacao
                            FROM Usuario
                                JOIN Partida
                                    ON fkUsuario = idUsuario
                                ORDER BY pontuacao DESC LIMIT ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
                        nomeUsuario, pontuacao
                            FROM Usuario
                                JOIN Partida
                                    ON fkUsuario = idUsuario
                                ORDER BY pontuacao DESC`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT nomeUsuario, pontuacao
                            FROM Usuario
                                JOIN Partida
                                    ON fkUsuario = idUsuario
                                ORDER BY pontuacao DESC LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
