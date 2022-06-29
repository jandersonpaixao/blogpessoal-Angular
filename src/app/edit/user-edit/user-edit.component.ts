import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoUser: string

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      alert('Para alterar o perfil é preciso estar logado!');
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.buscarUsuario(id);
  }

  buscarUsuario(id: number) {
    this.auth.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
      this.usuario.senha = ''
      
    });
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.confirmarSenha = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não coincidem!')
    } else {
      this.auth.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        alert('Usuário atualizado com sucesso! Faça o login novamente!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])

      })
    }
  }
  findByIdUsuario(id: number) {
    this.auth.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}


