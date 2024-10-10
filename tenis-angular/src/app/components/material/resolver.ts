import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { MaterialService } from "../../services/material.service";
import { Material } from "../../models/material.model";
export const materialResolver: ResolveFn<Material> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(MaterialService).findById(route.paramMap.get('id')!);
    }