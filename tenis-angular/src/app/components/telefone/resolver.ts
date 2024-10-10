import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { TelefoneService } from "../../services/telefone.service";
import { Telefone } from "../../models/telefone.model";
export const telefoneResolver: ResolveFn<Telefone> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TelefoneService).findById(Number(route.paramMap.get('id')!));
    }