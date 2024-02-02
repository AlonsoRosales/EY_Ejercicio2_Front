import {Injectable} from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    /***  Metodo para verificar si el usuario esta autenticado*/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.authService.checkToken().pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    return this.router.createUrlTree(['/EY/home/proveedores']);
                } else {
                    return true;
                }
            })
        );
    }
}
