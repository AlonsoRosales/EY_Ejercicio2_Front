import {Injectable} from "@angular/core";
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    CanMatch, Route,
    Router,
    RouterStateSnapshot, UrlSegment
} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {map, Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    /***  Metodo para verificar si el usuario esta autenticado*/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.checkToken().pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    return true; // El usuario está autenticado, permite el acceso
                } else {
                    // El usuario no está autenticado, redirige a la página de login
                    this.router.navigate(['/EY/auth/login']);
                    return false;
                }
            }),
        );
    }
}
