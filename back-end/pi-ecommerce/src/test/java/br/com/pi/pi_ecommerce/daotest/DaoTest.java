package br.com.pi.pi_ecommerce.daotest;

import br.com.pi.pi_ecommerce.controller.UserController;
import br.com.pi.pi_ecommerce.models.User;
import br.com.pi.pi_ecommerce.models.dto.UserDTO;
import br.com.pi.pi_ecommerce.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class DaoTest {

    @Mock
    private UserService userService; // Simula a UserService

    @InjectMocks
    private UserController userController; // Injeta o mock na controller

    @Test
    void testListarTodos() {

        // Simula um retorno da userService.listarTodos()
        List<UserDTO> users = new ArrayList<>();
        users.add(new UserDTO("Miguel", "miguel@gmail.com", true, "admim"));
        users.add(new UserDTO("Lauri", "lauri@gmail.com", true, "admim"));

        when(userService.listarTodos("")).thenReturn(users);

        //chama o metodo do controller
        List<UserDTO> resultado = userController.listarTodos("");

        //Verifica se retornou corretamente
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        assertEquals("Miguel", resultado.getFirst().getNome());

    }

    @Test
    void testSalvarSucesso() {
        User user = new User("Miguel", 12312312312L, "miguel@gmail.com", "123123123", "admin");

        when(userService.salvar(any(User.class))).thenReturn(user);

        ResponseEntity<?> response = userController.salvar(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertInstanceOf(User.class, response.getBody());
    }

    @Test
    void testSalvarCPFJaCadastrado() {
        User user = new User("Miguel", 12312312312L, "miguel@gmail.com", "123123123", "admin");

        when(userService.salvar(any(User.class)))
                .thenThrow(new IllegalArgumentException("CPF já cadastrado!"));

        ResponseEntity<?> response = userController.salvar(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("CPF já cadastrado!", response.getBody());
    }

    @Test
    void testSalvarEmailJaCadastrado() {
        User user = new User("Miguel", 12312312312L, "miguel@gmail.com", "123123123", "admin");

        when(userService.salvar(any(User.class)))
                .thenThrow(new IllegalArgumentException("E-mail já cadastrado!"));

        ResponseEntity<?> response = userController.salvar(user);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("E-mail já cadastrado!", response.getBody());
    }

}
