import { CadastroService } from 'src/app/core/services/cadastro.service';
import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { FormGroup } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo = 'Olá ';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;
  token: string = '';
  nome: string = '';
  cadastro!: PessoaUsuaria;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private userService: UserService,
    private formularioService: FormularioService,
    private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
   this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento:  this.cadastro.nascimento,
      cpf:  this.cadastro.cpf,
      telefone:  this.cadastro.telefone,
      email:  this.cadastro.email,
      senha:  this.cadastro.senha,
      cidade:  this.cadastro.cidade,
      estado: this.cadastro.estado,
      genero:  this.cadastro.genero,
    })
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado
    }

    this.cadastroService.editarCadastro(dadosAtualizados, ).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso')
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

    deslogar() {
      this.userService.logout();
      this.router.navigate(['/login']);
    }

  }
