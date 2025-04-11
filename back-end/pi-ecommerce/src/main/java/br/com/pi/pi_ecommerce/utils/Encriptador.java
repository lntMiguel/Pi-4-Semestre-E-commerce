package br.com.pi.pi_ecommerce.utils;
import org.mindrot.jbcrypt.BCrypt;

public class Encriptador {

    public static String encriptar(String senha){
        return BCrypt.hashpw(senha, BCrypt.gensalt());
    }

    public static boolean validarSenha(String senhaDoBanco, String senhaFornecida){
        return BCrypt.checkpw(senhaDoBanco, senhaFornecida);
    }
}
