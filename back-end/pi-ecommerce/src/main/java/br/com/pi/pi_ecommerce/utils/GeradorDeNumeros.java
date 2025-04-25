package br.com.pi.pi_ecommerce.utils;

import br.com.pi.pi_ecommerce.models.sequence.DatabaseSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class GeradorDeNumeros {

    private static MongoOperations mongoOperations;

    @Autowired
    private GeradorDeNumeros(MongoOperations mongoOperations) {
        GeradorDeNumeros.mongoOperations = mongoOperations;
    }

    public  static String gerarNumeroPedido() {
        // Passo 1: Obter a data formatada de hoje
        String dataHoje = obterDataHoje();

        // Passo 2: Obter o ID da sequência para o dia de hoje
        String idSequencia = gerarIdSequencia(dataHoje);

        // Passo 3: Atualizar ou criar o documento de sequência no MongoDB
        long numeroSequencia = obterNumeroSequencial(idSequencia);

        // Passo 4: Retornar o número do pedido no formato esperado
        return formatarNumeroPedido(dataHoje, numeroSequencia);
    }

    // obter a data de hoje formatada como YYYYMMDD
    private static String obterDataHoje() {
        return LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);  // Ex: 20250424
    }

    // gerar o identificador único da sequência, baseado na data de hoje
    private static String gerarIdSequencia(String dataHoje) {
        return "pedido-" + dataHoje;  // Ex: "pedido-20250424"
    }

    //consultar o MongoDB e obter o número sequencial para o pedido
    private static long obterNumeroSequencial(String idSequencia) {
        Query query = new Query(Criteria.where("_id").is(idSequencia));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        DatabaseSequence sequence = mongoOperations.findAndModify(query, update, options, DatabaseSequence.class);

        // Se o documento foi encontrado, usamos a sequência retornada; caso contrário, iniciamos com 1
        return sequence != null ? sequence.getSeq() : 1;
    }

    // formatar o número do pedido, combinando a data e o número sequencial
    private static String formatarNumeroPedido(String dataHoje, long numeroSequencia) {
        return String.format("%s-%04d", dataHoje, numeroSequencia);  // Ex: 20250424-0001
    }
}
