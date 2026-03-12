import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { ProductoModule } from './modules/productos/Productos.module';
import { InventarioModule } from './modules/inventario/Inventario.module';
import { OrdenesModule } from './modules/ordenes/Ordenes.module';
import { DepartamentoModule } from './modules/departamento/Departamento.module';
import { ProveedoresModule } from './modules/proveedores/Proveedore.module';
import { CatalogModule } from './modules/catalog/Catalog.module';
import { MovimientosModule } from './modules/movimientos/Movimientos.module';

const importsModules = [
  ProductoModule,
  InventarioModule,
  OrdenesModule,
  DepartamentoModule,
  ProveedoresModule,
  CatalogModule,
  MovimientosModule
]

@Module({
  imports: [
    ConfigModule,
    ...importsModules,
  ],

  providers: [
    ConfigModule,
  ],

  exports: [
    ConfigModule,
  ]
})

export class AppModule {}