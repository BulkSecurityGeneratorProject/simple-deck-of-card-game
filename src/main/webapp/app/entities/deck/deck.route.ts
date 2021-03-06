import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Deck } from 'app/shared/model/deck.model';
import { DeckService } from './deck.service';
import { DeckComponent } from './deck.component';
import { DeckDetailComponent } from './deck-detail.component';
import { DeckUpdateComponent } from './deck-update.component';
import { DeckDeletePopupComponent } from './deck-delete-dialog.component';
import { IDeck } from 'app/shared/model/deck.model';

@Injectable({ providedIn: 'root' })
export class DeckResolve implements Resolve<IDeck> {
    constructor(private service: DeckService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deck> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Deck>) => response.ok),
                map((deck: HttpResponse<Deck>) => deck.body)
            );
        }
        return of(new Deck());
    }
}

export const deckRoute: Routes = [
    {
        path: 'deck',
        component: DeckComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Decks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deck/:id/view',
        component: DeckDetailComponent,
        resolve: {
            deck: DeckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Decks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deck/new',
        component: DeckUpdateComponent,
        resolve: {
            deck: DeckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Decks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'deck/:id/edit',
        component: DeckUpdateComponent,
        resolve: {
            deck: DeckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Decks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deckPopupRoute: Routes = [
    {
        path: 'deck/:id/delete',
        component: DeckDeletePopupComponent,
        resolve: {
            deck: DeckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Decks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
