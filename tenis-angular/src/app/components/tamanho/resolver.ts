import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Tamanho } from "../../models/tamanho.model";
import { TamanhoService } from "../../services/tamanho.service";

export const tamanhoResolver: ResolveFn<Tamanho> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TamanhoService).findById(Number(route.paramMap.get('id')!));
    }