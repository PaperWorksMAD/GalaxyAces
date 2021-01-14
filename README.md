# GALAXY ACES

## Grupo-J 

**- DESCRIPCIÓN DE LA TEMATICA -**

* En una galaxia separada por clanes, el prestigio personal y de los tuyos es clave para ser respetado y temido en un espacio hostil, repleto de conflictos, es por esto que los mejores pilotos de cada región compiten contra otros para aumentar su estatus y el de su clan. Aces es el termino ingles de As de la aviación, un aviador militar condecorado tras haber logrado el derribo de cinco o más aviones enemigos, hemos querido adaptar este término para dar nombre a nuestro juego, donde eres un piloto de una nave espacial, en la galaxia que compite con otro por la gloria de su región.

* [Información extra sobre As de Aviación](https://www.ecured.cu/Pilotos_ases#Historia)

**- JUEGO -**

* Nuestro objetivo como jugador será destruir el mayor número de enemigos posibles, para obtener una mayor puntuación que nuestro rival, dentro del tiempo de la partida. Para ello contaremos con una nave capaz de desplazarse en las cuatro cardinalidades y disparar proyectiles letales. Los jugadores también podrán ayudarse de mejoras que aparece en el escenario para beneficiarse de sus efectos o fastidiar a su adversario.


***- INTEGRANTES DEL EQUIPO DE DESARROLLO -***

|Nombre y Apellidos       |Correo de la universidad         |Cuenta de GitHub       |
|-------------------------|---------------------------------|-----------------------|
| Jesús Ayala Matarin     |j.ayala.2016@alumnos.urjc.es     |JesusAyalaMatarin      |
| Borja Santiago Guerra   |b.santiago.2018@alumnos.urjc.es  |MrPotato027            |
| Juan Antonio Piña Ramos |ja.pinar.2017@alumnos.urjc.es    |SouthBarbol            |
| Lucas Hernández Luelmo  |l.hernandezl.2018@alumnos.urjc.es|Lucas-WiNNeR           |
| Felipe Bermejo Montejo  |f.bermejo.2018@alumnos.urjc.es   |FelipeBermejo          |

**- REDES SOCIALES -**

* https://twitter.com/PaperWorks20?s=08
* https://instagram.com/paperworksmad?igshid=o8yihq3trod3

**- TRELLO -**

* https://trello.com/b/xLL5BzgT/jer-j

# FASE 1
* Github Pages: https://paperworksmad.github.io/GalaxyAces/

# GDD

![](https://cdn.discordapp.com/attachments/766341678516404347/768129842734432276/logo2.PNG)

### Juegos en Red Grupo J

## 1. Conceptos generales

### Título:
* Galaxy Aces.

### Estudio y desarrolladores
* El estudio encargado de este proyecto es PaperWorks Studio. Su equipo está formado por:
    * Jesús Ayala Matarin
    * Borja Santiago Guerra
    * Juan Antonio Piña Ramos
    * Lucas Hernández Luelmo
    * Felipe Bermejo Montejo

### Plataforma
* Este proyecto se desarrollará para PC (en navegadores web) y en dispositivos móviles.

### Alcance
* Por ahora no está prevista su expansión a otros títulos o DLC´s, dependerá del cliente.

### Licencia
* Está basado en una idea original, influenciada por el estilo y aspecto del conocido juego Space Invaders.

### Sinopsis de jugabilidad y diseño
* Juego multijugador 1v1 de combate entre naves en tiempo real. Los jugadores escogen una nave y deben de competir por destruir al mayor número de enemigos en un mismo escenario y utilizando herramientas como power ups que te benefician a ti o perjudican al otro jugador.

### Categoría
* La clasificación del juego sería PEGI 3. Se trata de un juego de acción, estrategia y multijugador 1v1.

### Mecánica
*  El jugador controlará una única nave. Dicha nave puede hacer estas acciones:
    * Moverse en cualquier dirección.
    * Disparar.
    * Recibir daño.
* El apuntado de la nave es automático desde donde se encuentre el jugador hacia la parte superior.
* En el modo multijugador se enfrentan dos jugadores para:
    * Destruir más enemigos que tu rival 
    * Obtener más puntos en el tiempo de la partida que el rival

### Tecnología
* Programación:
    * Sublime Text 3.
* Concept:
    * A mano.
    * Photoshop.
    * Procreate.
    * OpenGameArt.
* Bocetos finales:
    * Photoshop.
    * Procreate.
* Organización del equipo:
    * Trello.
* Almacenaje y compartición de proyecto:
    * Github.

### Público
* La franja de edad a la que orientamos nuestro juego es a todos los públicos, centrado en los rango de edad de entre 10 y 25. Y sobretodo a jugadores casuales de juegos multijugador.

* Estilo visual
    * Pixel art.
 
## 2. Referencias
    
![](https://cdn.discordapp.com/attachments/766341678516404347/768527792920461333/41FMxfRCatL.png)

                      Space Invaders
                      
![](https://cdn.discordapp.com/attachments/766341678516404347/768527695705145385/galaga.png)

                                             Galaga
                                             
## 3. Visión general del juego

* La idea general del juego tiene como base plantear una competición entre dos jugadores a través de un modo multijugador que actúa como modo principal y único.
* El juego destacará por su frenetismo, su carácter desenfadado bajo una estética simple colorida e inmersiva, y por la competitividad entre jugadores nacida del deseo de supervivencia.

## 4. Mecánicas del juego

* Tipo de cámara: 
    * 2D.
    * Cenital.
    
* Controles: 
    * Controles de movimiento por el eje XY y disparar:
        * PC:
            * Jugador 1: para moverse con WASD y para disparar ESPACIO
            * Jugador 2: para moverse con las flechas y para disparar ENTER
        * Móviles y tablets:
            * Por determinar
            
* Pntuación:
    * 2 marcadores de puntuación bonificados al disparar y matar enemigos.
    * Varía dependiendo del enemigo.
    * El juego se ganará consiguiendo el mayor número de puntos en un tiempo determinado.
    
* Guardado y carga: 
     * No hay, son partidas rápidas.
     
* Jugabilidad: 
    * Jugabilidad dinámica y competitiva con tiempo de reacción limitado debido a la aproximación progresiva de los enemigos.
    * En la partida ambos jugadores compartirán la misma cámara y podrán moverse dentro de ella, atacar a los enemigos.
    * Cada personaje dispondrá de un indicador de su vida (J1 en la parte superior izquierda, J2 superior derecha), y un indicador único del tiempo restante para       finalizar la partida centrado en la parte superior.
    * Cada cierto tiempo se generarán orbes que contendrán mejoras para ti o obstáculos para tu enemigo.

* Niveles: 
      * 1 pantalla (por ahora).
      
* Habilidades: 
    * Disparo doble. 
    * Movimiento rápido. 
    * Movimiento lento (rival)
    * Congelación (rival)
    * etc
    
* Recursos :
    * cada nave posee disparos ilimitados con cierto cooldown y podrá recoger una serie de power-ups emergentes que sí son limitados.
    
## 5. Estados del juego:
* Pantalla de inicio (logo de empresa y título del juego)
* Menú principal (se elige entre jugar en local o online).
* Partida - Local.
* Fin de partida - Local.
* Pantalla de selección de nave - Online.
* Pantalla de búsqueda - Online.
* Partida - Online.
* Fin de partida - Online.
* Pantalla de ajustes.
* Pantalla de créditos y contacto.
* Se irán añadiendo más.

# FASE 2

* En la fase 2 hemos implementado una parte del juego que permite jugar dos persona en local con el mismo teclado, cada uno controlando su nave previamente seleccionada, en una partida de 1 minuto. Nada mas empezar el juego nos lleva al menu principal donte tenemos cuatro opciones, jugar, configuracion, contacto y controles. Para futuras fases se añadira una nueva opcion para jugar online.

![image](https://user-images.githubusercontent.com/43203256/101391147-36426b00-38c4-11eb-9883-b036c1f9e913.png)

* Al hacer click en configuracion se muestra una pestaña que permite configurar si quieres musica o no y el volumen de la misma, desde este menu se puede volver a la pantalla del menu principal, dandole a la cruz de la esquina superior derecha

![image](https://user-images.githubusercontent.com/37275365/101653699-e5578180-3a3f-11eb-9edd-92eba9c53900.PNG)

* Si desde el menu principal clickas en contacto, te lleva a un menu donde se muestan las redes sociales del equipo y cada una te lleva a la paguina oficial de la red social

![image](https://user-images.githubusercontent.com/43203256/101392033-7e15c200-38c5-11eb-905a-54dfd48b9e4a.png)

* El boton de controles, muestra un menu con una imagen donde se explican los aspectos mas importantes, necesarios para poder jugar

![image](https://user-images.githubusercontent.com/43203256/101392141-a998ac80-38c5-11eb-9f9c-4e89028f9e70.png)

* Si seleccionas play, se iniciara un menu, en este se le permite a los jugadores seleccionar la nave con la que van a jugar.

![image](https://user-images.githubusercontent.com/43203256/101392554-304d8980-38c6-11eb-9080-ff7e2db00e9f.png)

* Una vez seleccionadas ambas naves, jugador1 y jugador2, se presiona el espacio, y se iniciara la partida. El escenario del juego es de estilo pixel art y en el HUB se puede ver varia informacion relevante, la puntuacion de los jugadores, sus vidas, asi como el timepo restante de partida (1 minuto por defecto). Como enemigos, hasta el momento hemos añadidos dos, una especide de alienígena al que hay que disparar dos veces para matarlo y un meteorito al que hay que disparar tres veces.

![image](https://user-images.githubusercontent.com/37275365/101653697-e4beeb00-3a3f-11eb-9368-410e415f6e82.PNG)

* La partida acaba bien al terminar el timepo o si alguno de los dos jugadores se queda sin vida. En el caso de acabar por tiempo, el ganador sera el jugador que mas punto tenga en ese momento, si la partida acaba por que algun jugador se queda sin vidas el ganador sera el jugador que aun tenia vidas. Toda esta informacion se muestra en un menu de resultados, desde el cual se puede volver al menu de inicio.

![image](https://user-images.githubusercontent.com/43203256/101393164-f03ad680-38c6-11eb-9c26-5ba7fa1f7ee2.png)

* La musica que aparece en esta version del juego es: Bit Rush: Arcade 2015 | Login Screen - League of Legends (https://www.youtube.com/watch?v=BO3XLE_eRPk)

* Tanto los sprites que hemos utilizado para las naves, como el fuego que aparece cuando se mueven y los disparos son sacados de este enlace (https://free-game-assets.itch.io/free-enemy-spaceship-2d-sprites-pixel-art).

![image](https://user-images.githubusercontent.com/37275365/101498457-69403980-396c-11eb-82f8-50560d8b8e52.png)
![image](https://user-images.githubusercontent.com/37275365/101498465-6ba29380-396c-11eb-871e-cfec7ce056cc.png)
![image](https://user-images.githubusercontent.com/37275365/101498473-6e9d8400-396c-11eb-9683-520baa0b868e.png)
![image](https://user-images.githubusercontent.com/37275365/101498513-79f0af80-396c-11eb-9a02-51f60ced1ed7.png)
![image](https://user-images.githubusercontent.com/37275365/101498575-8bd25280-396c-11eb-836d-a7cf888df59c.png)
![image](https://user-images.githubusercontent.com/37275365/101498574-8bd25280-396c-11eb-8331-122b8ac5ba83.png)
![image](https://user-images.githubusercontent.com/37275365/101498572-8b39bc00-396c-11eb-8f5a-05033ca60240.png)

Tenemos pensado implementar más naves y que en cada una varíe la velocidad de movimiento y de disparo, así como el daño que hacen y la vida que tienen, pero aún no está implementado.

* Algunos de los enemigos los hemos sacado de este enlace : (https://opengameart.org/content/2d-enemy-characters-pack-20x20) y el meteorito de este otro: (https://opengameart.org/content/brown-asteroid)

![image](https://user-images.githubusercontent.com/37275365/101498418-5ded0e00-396c-11eb-8eb7-aa910dbfcaba.png)
![image](https://user-images.githubusercontent.com/37275365/101498428-60e7fe80-396c-11eb-9211-d58ae7643945.png)
![image](https://user-images.githubusercontent.com/37275365/101498438-634a5880-396c-11eb-8bc2-00f3e2bf1067.png)

* Todos los efectos de sonido los hemos realizado con el programa rFXGen ZERO que es de uso libre. Adjunto el enlace al programa: (https://raylibtech.itch.io/rfxgen)
* Hasta el momento hemos implementado un efecto de sonido básico para las colisiones, uno propio para la muerte de cada tipo de enemigo y otro para los disparos.

* Diagrama de navegacion del juego:

![image](https://user-images.githubusercontent.com/43203256/101393821-f4b3bf00-38c7-11eb-9f98-c59e6940ab0f.png)

# FASE 3

## Navegación:

* En el menú principal hemos añadido una opción para jugar online.

![image](https://user-images.githubusercontent.com/37275365/104440286-71564f00-5592-11eb-9644-583dd3d0b973.JPG)

* Las redes sociales siguen igual.

![image](https://user-images.githubusercontent.com/37275365/104440289-71eee580-5592-11eb-8ed1-493942198365.JPG)

* La guía de los controles sigue igual.

![image](https://user-images.githubusercontent.com/37275365/104440291-72877c00-5592-11eb-8c1a-ee872be648a1.JPG)

* La pantalla de configuración sigue igual.

![image](https://user-images.githubusercontent.com/37275365/104440293-73201280-5592-11eb-9676-d4eeeee84637.JPG)

* La pantalla de selector de nave sigue igual.

![image](https://user-images.githubusercontent.com/37275365/104440294-73201280-5592-11eb-83fd-9b0aace4cfda.JPG)

* El modo de multijugador local sigue igual.

![image](https://user-images.githubusercontent.com/37275365/104440295-73b8a900-5592-11eb-95c0-f649cd0fef4a.JPG)

* Hemos añadido una pantalla online para elegir nave, nombre e interactuar mediante un chat.

![image](https://user-images.githubusercontent.com/37275365/104461699-f734c300-55af-11eb-9045-8cc096e74b11.JPG)

* La pantalla de puntuaciones sigue igual.

![image](https://user-images.githubusercontent.com/37275365/104440299-73b8a900-5592-11eb-9a37-dbbf6d11ba2c.JPG)

* Hemos añadido una pantalla para avisar cuando el servidor está caído

![image](https://user-images.githubusercontent.com/37275365/104466341-6b259a00-55b5-11eb-9f94-e2f911a04526.JPG)

* Diagrama de navegacion del juego:

![image](https://user-images.githubusercontent.com/37275365/104441142-9a2b1400-5593-11eb-8f76-51b1f9dde04e.jpeg)

## Diagrama de clases y API REST:

*Las flechas blancas son flechas discontinuas.

![image](https://user-images.githubusercontent.com/37275365/104466034-05d1a900-55b5-11eb-959d-95b8657df287.jpg)

## Instrucciones para ejecutar la aplicación:

* Paso 1: Descargar el proyecto.
* Paso 2: Ir a la carpeta de GalaxyAces\target.
* Paso 3: Pulsar en la dirección y escribir cmd.
* Paso 4: Escribir en la terminal: java -jar galaxyaces-0.0.1-SNAPSHOT.jar.
* Paso 5: Escribir http://localhost:8080/ en el navegador.










