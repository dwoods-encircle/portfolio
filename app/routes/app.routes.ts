import { provideRouter, RouterConfig } from '@angular/router';
import { TicTacToeRoutes } from './../projects/tictactoe/tictactoe.routes';
import { HomeComponent } from './../app-component/home.component';
import { CalculatorComponent } from './../projects/calculator/calculator.component';
import { TicTacToeComponent } from './../projects/tictactoe/tictactoe.component';
import { DrumMachineComponent} from './../projects/drum-machine/drum-machine.component';
import { StocksComponent } from './../projects/stocks/stocks.component';

export const routes: RouterConfig = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: CalculatorComponent,
    path: 'calculator'
  },
  {
    component: StocksComponent,
    path: 'stocks'
  },  
  {
    component: TicTacToeComponent,
    path: 'tictactoe'
  },
  ...TicTacToeRoutes,
  {
    component: DrumMachineComponent,
    path: 'drum'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
