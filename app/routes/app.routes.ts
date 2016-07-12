import { provideRouter, RouterConfig } from '@angular/router';
import { TicTacToeRoutes } from './../projects/tictactoe/tictactoe.routes';

import { CCFormComponent }  from './../projects/form/form.component';
import { CalculatorComponent } from './../projects/calculator/calculator.component';
import { TicTacToeComponent } from './../projects/tictactoe/tictactoe.component';
import { WatchesComponent } from './../projects/watches/watches.component';

import { EmptyComponent } from './../app-component/app.component';

export const routes: RouterConfig = [
    ...TicTacToeRoutes,
    { path: '', component: EmptyComponent },
    { path: 'creditcardform', component: CCFormComponent },
    { path: 'calculator', component: CalculatorComponent },
    { path: 'tictactoe', component: TicTacToeComponent},
    { path: 'watches', component: WatchesComponent}
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
