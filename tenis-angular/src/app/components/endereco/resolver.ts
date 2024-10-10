import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { EnderecoService } from "../../services/endereco.service";
import { Endereco } from "../../models/endereco.model";
export const enderecoResolver: ResolveFn<Endereco> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EnderecoService).findById(Number(route.paramMap.get('id')!));
    }