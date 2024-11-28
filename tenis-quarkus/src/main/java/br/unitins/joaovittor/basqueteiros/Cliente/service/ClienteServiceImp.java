package br.unitins.joaovittor.basqueteiros.Cliente.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.microprofile.jwt.JsonWebToken;

import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteAddEnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteAllEnderecosResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteResponseDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClientePasswordUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.dto.ClienteUsernameUpdateDTO;
import br.unitins.joaovittor.basqueteiros.Cliente.model.Cliente;
import br.unitins.joaovittor.basqueteiros.Cliente.repository.ClienteRepository;
import br.unitins.joaovittor.basqueteiros.Endereco.dto.EnderecoDTO;
import br.unitins.joaovittor.basqueteiros.Endereco.model.Endereco;
import br.unitins.joaovittor.basqueteiros.Hash.service.HashService;
import br.unitins.joaovittor.basqueteiros.Telefone.model.Telefone;
import br.unitins.joaovittor.basqueteiros.Usuario.dto.UsuarioResponseDTO;
import br.unitins.joaovittor.basqueteiros.Usuario.model.Usuario;
import br.unitins.joaovittor.basqueteiros.Usuario.repository.UsuarioRepository;
import br.unitins.joaovittor.basqueteiros.Usuario.service.UsuarioService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.xml.bind.ValidationException;

@ApplicationScoped
public class ClienteServiceImp implements ClienteService {
    
    @Inject
    ClienteRepository repository;

    @Inject
    UsuarioRepository usuarioRepository;

    @Inject
    UsuarioService usuarioService;

    @Inject
    HashService hashService;

    @Inject
    JsonWebToken jwt;

    @Override
    @Transactional
    public ClienteResponseDTO create(@Valid ClienteDTO dto) {

        Usuario usuario = new Usuario();
        usuario.setUsername(dto.username());
        usuario.setPassword(hashService.getHashSenha(dto.senha()));
        usuarioRepository.persist(usuario);    

        Cliente cliente = new Cliente();
        cliente.setCpf(dto.cpf());
        cliente.setNome(dto.nome());

        Telefone telefone = new Telefone();
        telefone.setDdd(dto.ddd());
        telefone.setNumero(dto.numero());
        cliente.setTelefone(telefone);   

    
        cliente.setDataNascimento(dto.dataNascimento());
        
        cliente.setListaEndereco(new ArrayList<Endereco>());
        for(EnderecoDTO endereco : dto.listaEndereco()){
            Endereco end = new Endereco();
            end.setCep(endereco.cep());
            end.setRua(endereco.rua());
            end.setComplemento(endereco.complemento());
            cliente.getListaEndereco().add(end);
        }

        cliente.setUsuario(usuario);
        repository.persist(cliente);
        return ClienteResponseDTO.valueof(cliente);

    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public void update(Long id, ClienteUpdateDTO dto) throws ValidationException {

        Cliente cliente = repository.findById(id);
        if(cliente != null){

            cliente.setCpf(dto.cpf());
            cliente.setNome(dto.nome());

            Telefone telefone = new Telefone();
            telefone.setDdd(dto.ddd());
            telefone.setNumero(dto.numero());
            cliente.setTelefone(telefone);  

            cliente.setDataNascimento(dto.dataNascimento());          

        } else {
            throw new ValidationException("Cliente inexistente");
        }
    }

    @Transactional
    @Override
    public void addEndereco(Long id, ClienteAddEnderecoDTO dto){

        Cliente cliente = repository.findById(id);
        if(cliente != null){

            List<Endereco> enderecos = cliente.getListaEndereco();

            Endereco end = new Endereco();
            end.setCep(dto.novoEndereco().cep());
            end.setRua(dto.novoEndereco().rua());
            end.setComplemento(dto.novoEndereco().complemento());

            enderecos.add(end);

        }

    }

    @Transactional
    @Override
    public List<ClienteResponseDTO> findAll() {
        return repository.findAll()
                                .stream()
                                .map(e -> ClienteResponseDTO.valueof(e)).toList();
    }

    @Transactional
    @Override
    public ClienteAllEnderecosResponseDTO findAllEnderecosById(Long id) {

        Cliente cliente = repository.findById(id);

        return ClienteAllEnderecosResponseDTO.valueof(cliente);
    }

    @Override
    public ClienteResponseDTO findById(Long id) {

        Cliente cliente = repository.findById(id);

        if(cliente != null)
            return ClienteResponseDTO.valueof(repository.findById(id));
        return null;       
    }

    @Override
    public List<ClienteResponseDTO> findByNome(String nome) {
        return repository.findByNome(nome)
                         .stream()
                         .map(e -> ClienteResponseDTO.valueof(e)).toList();
    }

    @Override
    public ClienteResponseDTO findByUsername(String username) {

        Cliente cliente = repository.findByUsername(username);

        if(cliente != null)
            return ClienteResponseDTO.valueof(cliente);
        return null;       
    }

    @Override
    public ClienteResponseDTO findByCpf(String cpf) {

        Cliente cliente = repository.findByCpf(cpf);

        if(cliente != null)
            return ClienteResponseDTO.valueof(cliente);
        return null;       
    }

    // REFAZER LOGIN
    @Override
    public UsuarioResponseDTO login(String username, String senha) {
        //Cliente cliente = repository.findByUsernameAndSenha(username, senha);
        // verificar se existe ou não
        //if(cliente != null)
            //return UsuarioResponseDTO.valueof(cliente.getPessoaFisica());
        return null;
    }

    @Override
    @Transactional
    public void updateUsuarioPassword(ClientePasswordUpdateDTO passwordUpdateDTO) {

        if(jwt.getClaim("userId") == null)
            throw new IllegalArgumentException("Token JWT inválido ou claim ausente.");
        
        String claimValue = jwt.getClaim("userId").toString();

        if(claimValue == null)
            throw new IllegalArgumentException("Token JWT inválido ou claim ausente.");

        Usuario usuario = usuarioRepository.findById(Long.valueOf(claimValue));
        Cliente cliente = repository.findByIdUsuario(usuario.getId());
        if (usuario == null || cliente == null) {
            throw new EntityNotFoundException("usuario nao logado");
        }

        if(usuario.getPassword().equals(hashService.getHashSenha(passwordUpdateDTO.oldPassword()))){
            usuario.setDataAlteracao(LocalDateTime.now());
            usuario.setPassword(hashService.getHashSenha(passwordUpdateDTO.newPassword()));
            usuarioService.update(usuario);
        }
    }

    @Override
    @Transactional
    public void updateUsuarioUsername(ClienteUsernameUpdateDTO usernameUpdateDTO) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(jwt.getClaim("userId").toString()));
        Cliente cliente = repository.findByIdUsuario(usuario.getId());
        if (usuario == null || cliente == null) {
            throw new EntityNotFoundException("usuario nao logado");
        }
        cliente.getUsuario().setUsername(usernameUpdateDTO.newUsername());
        usuarioService.update(cliente.getUsuario());
        repository.persist(cliente);
    }
}
