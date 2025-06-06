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

    private final MongoOperations mongoOperations;

    @Autowired
    public GeradorDeNumeros(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public String gerarNumeroPedido() {
        String dataHoje = obterDataHoje();
        String idSequencia = gerarIdSequencia(dataHoje);
        long numeroSequencia = obterNumeroSequencial(idSequencia);
        return formatarNumeroPedido(dataHoje, numeroSequencia);
    }

    private String obterDataHoje() {
        return LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);
    }

    private String gerarIdSequencia(String dataHoje) {
        return "pedido-" + dataHoje;
    }

    private long obterNumeroSequencial(String idSequencia) {
        Query query = new Query(Criteria.where("_id").is(idSequencia));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        DatabaseSequence sequence = mongoOperations.findAndModify(query, update, options, DatabaseSequence.class);
        return sequence != null ? sequence.getSeq() : 1;
    }

    private String formatarNumeroPedido(String dataHoje, long numeroSequencia) {
        return String.format("%s-%04d", dataHoje, numeroSequencia);
    }
}
