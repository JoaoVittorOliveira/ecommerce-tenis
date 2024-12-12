package br.unitins.joaovittor.basqueteiros.Cliente.service;

import java.util.List;

import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteAddEnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteAllEnderecosResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClientePasswordUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUsernameUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Usuario.dto.UsuarioResponseDTO;
import jakarta.validation.Valid;
import jakarta.xml.bind.ValidationException;

public interface ClienteService {
    
    public ClienteResponseDTO create(@Valid ClienteDTO dto);
    public void update(Long id, ClienteUpdateDTO dto) throws ValidationException;
    public void updateUsuarioPassword(ClientePasswordUpdateDTO passwordUpdateDTO);
    public void updateUsuarioUsername(ClienteUsernameUpdateDTO usernameUpdateDTO);
    public boolean delete(Long id);
    public List<ClienteResponseDTO> findAll();
    public ClienteResponseDTO findById(Long id);
    public List<ClienteResponseDTO> findByNome(String nome);
    public ClienteResponseDTO findByUsername(String username);
    public ClienteResponseDTO findByCpf(String cpf);
    public UsuarioResponseDTO login(String username, String hashSenha);
    void addEndereco(Long id, ClienteAddEnderecoDTO dto);
    public ClienteAllEnderecosResponseDTO findAllEnderecosById(Long id);
    public ClienteResponseDTO getMyAccount();
    public void updateMyAccount(ClienteUpdateDTO dto);
}
