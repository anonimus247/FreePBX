import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  calls: any[] = []; // Variable para almacenar la lista de llamadas
  filteredCalls: any[] = []; // Variable para almacenar las llamadas filtradas
  displayedCalls: any[] = []; // Llamadas mostradas actualmente
  selectedStatus: string = ''; // Variable para almacenar el estatus seleccionado en el combobox
  selectedStartDate: string = ''; // Variable para almacenar la fecha de inicio seleccionada
  selectedEndDate: string = ''; // Variable para almacenar la fecha de fin seleccionada
  selectedCity: string = ''; // Variable para almacenar la ciudad seleccionada en el combobox
  selectedSource: string = ''; // Variable para almacenar el origen seleccionado
  selectedDestination: string = ''; // Variable para almacenar el destino seleccionado
  currentPage: number = 1; // Página actual
  pageSize: number = 10; // Tamaño de la página

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCalls();
  }

  loadCalls() {
    this.authService.getCalls().subscribe(
      (calls) => {
        this.calls = calls;
        this.filterCalls(); // Aplicar los filtros al cargar las llamadas
      },
      (error) => {
        console.error('Error al obtener la lista de llamadas', error);
      }
    );
  }
  
  filterCalls() {
    this.filteredCalls = this.calls.filter(call =>
      // Filtrar por estatus
      (this.selectedStatus === '' || call.disposition === this.selectedStatus) &&
      // Filtrar por fecha de inicio
      (!this.selectedStartDate || new Date(call.calldate) >= new Date(this.selectedStartDate)) &&
      // Filtrar por fecha de fin
      (!this.selectedEndDate || new Date(call.calldate) <= new Date(this.selectedEndDate)) &&
      // Filtrar por ciudad
      (!this.selectedCity || this.filterByCity(call.src)) &&
      // Filtrar por origen
      (!this.selectedSource || call.src.toLowerCase().includes(this.selectedSource.toLowerCase())) &&
      // Filtrar por destino
      (!this.selectedDestination || call.dst.toLowerCase().includes(this.selectedDestination.toLowerCase()))
    );
    
    this.currentPage = 1; // Restablecer la página actual
    this.updateDisplayedCalls();
  }

  filterByCity(origin: string): boolean {
    const originNumber = parseInt(origin); // Convertir el origen a un número entero

    if (this.selectedCity === 'Monterrey' && (originNumber >= 100 && originNumber < 200 || origin.startsWith('443'))) {
      return true;
    } else if (this.selectedCity === 'Los Mochis' && (originNumber >= 200 && originNumber < 300 || origin.startsWith('668'))) {
      return true;
    } else if (this.selectedCity === 'Zamora' && (originNumber >= 300 && originNumber < 400 || origin.startsWith('351'))) {
      return true;
    }
    return false;
  }

  updateDisplayedCalls() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredCalls.length);
    this.displayedCalls = this.filteredCalls.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.pageCount()) {
      this.currentPage++;
      this.updateDisplayedCalls();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCalls();
    }
  }

  pageCount(): number {
    return Math.ceil(this.filteredCalls.length / this.pageSize);
  }
}
