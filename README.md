# Prueba técnica — React developer

## Descripción

Este proyecto es parte de una prueba técnica para evaluar habilidades en el desarrollo front-end utilizando React, TypeScript y herramientas como DevExtreme y Recoil. El objetivo principal es construir una aplicación que muestre series y películas, con funcionalidades como filtrado y paginación.

## Organización del Proyecto

Para llevar a cabo este proyecto, se siguieron los siguientes pasos:

Organización de Carpetas
El repositorio principal contiene la carpeta ruano-challenge, que alberga todo el proyecto. La estructura de carpetas dentro de ruano-challenge es la siguiente:

package.json: Archivo de configuración del proyecto.
node_modules: Carpeta que contiene las dependencias del proyecto.

-assets: Carpeta que almacena imágenes y otros recursos.
-public: Archivos públicos, como íconos y HTML principal.
-src: Directorio principal del código fuente.
-data: Contiene archivos de datos, como el JSON proporcionado.
-components: Componentes de React reutilizables.
-hooks: Hooks personalizados para la lógica de la aplicación.
-interfaces: Interfaces TypeScript para mantener la tipificación.
-recoil: Configuración y estados globales de Recoil.

app.tsx, index.tsx: Archivos principales de la aplicación.

## Desarrollo y Lógica

-Lo primero fue leer la documentación de DevExtreme, Recoil y Material-UI para establecer las bases del proyecto.

-Lo segundo la estructura del proyecto y se instalaron las dependencias necesarias.

-Luego desarrollar la lógica de la aplicación, centrándose en la renderización de series y películas, y en la gestión de imágenes.

-Para evitar imágenes que no funcionaban, se implementó una función que filtra solo las imágenes válidas al cargar los datos desde la base de datos. Esto esta en una rama aparte. Luego se continuo el proyecto renderizando un placeholder en las imagenes que daban fallos

-Se utilizaron custom hooks para filtrar, ordenar y paginar los datos, como el hook useMovies y useSeries.

-Se implementó un loader de DevExtreme para mejorar la experiencia del usuario al cargar películas o series.

-Se creó un componente externo de filtro reutilizable en las páginas de películas y series.


## Detalles
He construido las siguientes 3 páginas con React:

- Una página de "Inicio"
- Una página de "Series"
- Una página "Movies"

## Instalación y Ejecución

Para ejecutar la aplicación, siga estos pasos:

1) Clonar el repositorio desde GitHub https://github.com/LucasRiestra/ruano-challenge/

2) cd a la carpeta "ruano-challenge"

3) Ejecutar npm install para instalar las dependencias.

4) Iniciar la aplicación con npm run start.

5) Para ejecutar pruebas unitarias, utilizar npx jest.

## Deploy
  El despliegue se ha realizado en vercel y aqui pueden acceder a el https://ruano-challenge.vercel.app/

## Conclusiones 

El proyecto lo he desarrollado cumpliendo con los requisitos establecidos, utilizando herramientas modernas y aplicando buenas prácticas de desarrollo. La organización del código y la atención a los detalles fueron aspectos clave en la entrega de la solución. Me ha gustado mucho este challenge porque he aprendido de tecnologias que no conocia, como DevExtreme, recoil y un poco mas a fondo MaterialUI.

¡Gracias por la oportunidad de participar en esta prueba técnica!