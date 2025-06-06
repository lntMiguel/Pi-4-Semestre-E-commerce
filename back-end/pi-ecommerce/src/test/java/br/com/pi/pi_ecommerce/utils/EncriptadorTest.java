package br.com.pi.pi_ecommerce.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
class EncriptadorTest {
// Classe de teste para validar a funcionalidade de encriptação e validação de senhas

    @Test
    void deveEncriptarSenhaECorretamenteValidar() {
        String senhaOriginal = "minhaSenha123";
        // Senha original que será encriptada

        String senhaCriptografada = Encriptador.encriptar(senhaOriginal);
        // Encripta a senha original usando o método da classe Encriptador

        assertNotNull(senhaCriptografada);
        // Verifica que o resultado da encriptação não é nulo

        assertNotEquals(senhaOriginal, senhaCriptografada);
        // A senha criptografada deve ser diferente da original (não deve estar em texto claro)

        assertTrue(Encriptador.validarSenha(senhaOriginal, senhaCriptografada));
        // Verifica que a senha original confere corretamente com a senha criptografada
    }

    @Test
    void deveFalharAoValidarSenhaIncorreta() {
        String senhaOriginal = "senhaCerta";
        // Senha correta usada para gerar hash

        String senhaErrada = "senhaErrada";
        // Senha incorreta para teste de validação

        String senhaCriptografada = Encriptador.encriptar(senhaOriginal);
        // Gera o hash da senha correta

        assertFalse(Encriptador.validarSenha(senhaErrada, senhaCriptografada));
        // Validação deve falhar, pois a senha errada não corresponde ao hash
    }

    @Test
    void deveGerarHashesDiferentesParaMesmaSenha() {
        String senha = "123456";
        // Mesma senha para testar geração de hashes diferentes

        String hash1 = Encriptador.encriptar(senha);
        // Primeiro hash da senha

        String hash2 = Encriptador.encriptar(senha);
        // Segundo hash da mesma senha

        assertNotEquals(hash1, hash2);
        // Verifica que os hashes são diferentes, pois o BCrypt usa sal aleatório

        assertTrue(Encriptador.validarSenha(senha, hash1));
        // Valida que a senha confere com o primeiro hash

        assertTrue(Encriptador.validarSenha(senha, hash2));
        // Valida que a senha confere com o segundo hash também
    }
}
